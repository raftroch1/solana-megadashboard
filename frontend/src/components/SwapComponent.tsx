import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Loader2, Settings2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js"

interface Token {
  address: string
  symbol: string
  decimals: number
}

interface SwapQuote {
  inAmount: number
  outAmount: number
  priceImpactPct: number
  marketInfos: any[]
  otherAmountThreshold: number
  swapMode: string
}

interface TokenBalance {
  [key: string]: number
}

export default function SwapComponent() {
  const { publicKey, signTransaction, connected } = useWallet()
  const [inputAmount, setInputAmount] = useState<string>("")
  const [outputAmount, setOutputAmount] = useState<string>("")
  const [inputToken, setInputToken] = useState<string>("SOL")
  const [outputToken, setOutputToken] = useState<string>("USDC")
  const [loading, setLoading] = useState(false)
  const [quoting, setQuoting] = useState(false)
  const [quote, setQuote] = useState<SwapQuote | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [slippage, setSlippage] = useState<number>(0.5)
  const [balances, setBalances] = useState<TokenBalance>({})
  const [showSettings, setShowSettings] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Token addresses (you'll need to add more tokens as needed)
  const TOKENS: { [key: string]: Token } = {
    SOL: {
      address: "So11111111111111111111111111111111111111112",
      symbol: "SOL",
      decimals: 9
    },
    USDC: {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      symbol: "USDC",
      decimals: 6
    },
    RAY: {
      address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
      symbol: "RAY",
      decimals: 6
    }
  }

  // Initialize connection
  useEffect(() => {
    const init = async () => {
      try {
        const connection = new Connection("https://api.devnet.solana.com")
        await connection.getRecentBlockhash()
        setInitialLoading(false)
      } catch (error) {
        console.error("Failed to connect to Solana network:", error)
        setError("Failed to connect to Solana network. Please check your internet connection.")
        setInitialLoading(false)
      }
    }
    init()
  }, [])

  // Fetch token balances
  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) {
        setBalances({})
        return
      }

      try {
        const connection = new Connection("https://api.devnet.solana.com")
        const solBalance = await connection.getBalance(publicKey)
        
        setBalances({
          SOL: solBalance / LAMPORTS_PER_SOL,
          USDC: 0,
          RAY: 0
        })
      } catch (error) {
        console.error("Error fetching balances:", error)
        setError("Failed to fetch balances. Please try refreshing.")
      }
    }

    if (connected) {
      fetchBalances()
      const interval = setInterval(fetchBalances, 10000)
      return () => clearInterval(interval)
    }
  }, [publicKey, connected])

  // Get quote when input amount changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (inputAmount && parseFloat(inputAmount) > 0 && inputToken && outputToken) {
        getQuote()
      } else {
        setQuote(null)
        setOutputAmount("")
      }
    }, 500)

    return () => clearTimeout(debounceTimeout)
  }, [inputAmount, inputToken, outputToken, slippage])

  const getQuote = async () => {
    if (!inputAmount || !inputToken || !outputToken) return
    setError(null)
    setQuoting(true)

    try {
      const amount = Math.floor(parseFloat(inputAmount) * (10 ** TOKENS[inputToken].decimals))
      
      // Check if amount is greater than balance
      if (balances[inputToken] && parseFloat(inputAmount) > balances[inputToken]) {
        throw new Error('Insufficient balance')
      }

      const searchParams = new URLSearchParams({
        inputMint: TOKENS[inputToken].address,
        outputMint: TOKENS[outputToken].address,
        amount: amount.toString(),
        slippageBps: (slippage * 100).toString()
      })

      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }

      const quoteResponse = await response.json()
      setQuote(quoteResponse)
      setOutputAmount(
        (quoteResponse.outAmount / (10 ** TOKENS[outputToken].decimals)).toFixed(6)
      )
    } catch (error) {
      console.error("Error getting quote:", error)
      if (error instanceof Error && error.message === 'Insufficient balance') {
        setError("Insufficient balance for swap")
      } else {
        setError("Failed to get quote. Please try again.")
      }
      setOutputAmount("")
      setQuote(null)
    } finally {
      setQuoting(false)
    }
  }

  const handleSwap = async () => {
    if (!publicKey || !quote || !connected) return
    setError(null)

    try {
      setLoading(true)
      setStatusMessage("Preparing swap transaction...")

      const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: publicKey.toString(),
          wrapUnwrapSOL: true
        })
      })

      if (!swapResponse.ok) {
        throw new Error('Failed to prepare swap')
      }

      const swapResult = await swapResponse.json()
      const { swapTransaction } = swapResult

      const transaction = Transaction.from(
        Buffer.from(swapTransaction, "base64")
      )
      
      if (signTransaction) {
        setStatusMessage("Please sign the transaction...")
        const signedTransaction = await signTransaction(transaction)
        
        const connection = new Connection("https://api.devnet.solana.com")
        setStatusMessage("Submitting transaction...")
        const txid = await connection.sendRawTransaction(
          signedTransaction.serialize()
        )
        
        const explorerUrl = `https://explorer.solana.com/tx/${txid}?cluster=devnet`
        setStatusMessage(
          `Transaction submitted! View on explorer: ${explorerUrl}`
        )
        
        // Reset form after delay
        setTimeout(() => {
          setInputAmount("")
          setOutputAmount("")
          setQuote(null)
          setStatusMessage("")
        }, 5000)
      }
    } catch (error) {
      console.error("Error executing swap:", error)
      setError("Failed to execute swap. Please try again.")
      setStatusMessage("")
    } finally {
      setLoading(false)
    }
  }

  const switchTokens = () => {
    const tempToken = inputToken
    setInputToken(outputToken)
    setOutputToken(tempToken)
    setInputAmount("")
    setOutputAmount("")
    setQuote(null)
    setError(null)
  }

  const priceImpact = quote?.priceImpactPct.toFixed(2) ?? "0.00"
  const isPriceImpactHigh = parseFloat(priceImpact) > 1.0
  const minimumReceived = quote 
    ? (quote.otherAmountThreshold / (10 ** TOKENS[outputToken].decimals)).toFixed(6)
    : "0.00"

  if (initialLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-purple-500">Swap</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
          disabled={loading}
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showSettings && (
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Slippage Tolerance</span>
                <div className="flex items-center space-x-2">
                  {[0.1, 0.5, 1.0].map((value) => (
                    <Button
                      key={value}
                      variant={slippage === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSlippage(value)}
                      className="text-xs"
                      disabled={loading}
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>From</span>
              <span>Balance: {balances[inputToken]?.toFixed(4) ?? "0.00"} {inputToken}</span>
            </div>
            <div className="flex space-x-2">
              <Input
                className="flex-grow bg-gray-700 border-gray-600"
                placeholder="0.0"
                value={inputAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value
                  if (!value || /^\d*\.?\d*$/.test(value)) {
                    setInputAmount(value)
                  }
                }}
                type="text"
                disabled={loading || !connected}
              />
              <Select value={inputToken} onValueChange={setInputToken} disabled={loading}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder={inputToken} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="RAY">RAY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={switchTokens}
              disabled={loading || !connected}
            >
              <ArrowDownUp className="h-6 w-6" />
            </Button>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>To</span>
              <span>Balance: {balances[outputToken]?.toFixed(4) ?? "0.00"} {outputToken}</span>
            </div>
            <div className="flex space-x-2">
              <div className="flex-grow relative">
                <Input
                  className="w-full bg-gray-700 border-gray-600"
                  placeholder="0.0"
                  value={outputAmount}
                  readOnly
                />
                {quoting && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              <Select value={outputToken} onValueChange={setOutputToken} disabled={loading}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder={outputToken} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="RAY">RAY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {quote && (
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Price Impact:</span>
                <span className={isPriceImpactHigh ? "text-red-400" : ""}>
                  {priceImpact}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Received:</span>
                <span>{minimumReceived} {outputToken}</span>
              </div>
              <div className="flex justify-between">
                <span>Route:</span>
                <span>{quote.marketInfos.length} hop(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Slippage Tolerance:</span>
                <span>{slippage}%</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {statusMessage && (
            <div className="text-purple-400 text-sm text-center">
              {statusMessage}
            </div>
          )}

          <Button
            className="w-full bg-purple-500 text-white hover:bg-purple-600 relative"
            onClick={handleSwap}
            disabled={!connected || loading || !quote || isPriceImpactHigh || parseFloat(inputAmount) <= 0}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {!connected 
              ? "Connect Wallet" 
              : loading 
                ? "Swapping..." 
                : isPriceImpactHigh
                  ? "Price Impact Too High"
                  : !inputAmount || parseFloat(inputAmount) <= 0
                    ? "Enter Amount"
                    : "Swap"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
