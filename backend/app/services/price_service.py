from pycoingecko import CoinGeckoAPI
from typing import Dict, Optional
from .pyth_service import PythService

class PriceService:
    def __init__(self):
        self.cg = CoinGeckoAPI()
        self.pyth = PythService()
    
    def get_solana_price_coingecko(self) -> Optional[Dict]:
        """Get current Solana price from CoinGecko"""
        try:
            return self.cg.get_price(ids='solana', vs_currencies='usd', include_24hr_change=True)
        except Exception as e:
            print(f"Error fetching CoinGecko price: {str(e)}")
            return None
            
    async def get_solana_price_pyth(self) -> Optional[Dict]:
        """Get current Solana price from Pyth"""
        return await self.pyth.get_solana_price()
        
    async def get_solana_price(self) -> Dict:
        """Get Solana price from both sources"""
        coingecko_price = self.get_solana_price_coingecko()
        pyth_price = await self.get_solana_price_pyth()
        
        return {
            "coingecko": coingecko_price,
            "pyth": pyth_price
        }
