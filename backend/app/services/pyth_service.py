import asyncio
from pythclient.solana import PythClient
from typing import Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PythService:
    def __init__(self):
        # Using Pyth mainnet endpoint
        self.endpoint = "https://api.mainnet-beta.solana.com"  # Solana RPC endpoint
        # SOL/USD price feed ID
        self.sol_usd_feed = "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD"
        
    async def get_solana_price(self) -> Optional[Dict]:
        """Get current Solana price from Pyth Network"""
        try:
            logger.info(f"Connecting to Solana RPC at {self.endpoint}")
            
            client = PythClient(
                rpc_endpoint=self.endpoint,
                websocket_endpoint=self.endpoint.replace('https', 'wss')
            )
            
            logger.info(f"Fetching price for feed ID: {self.sol_usd_feed}")
            
            await client.refresh_price_feeds([self.sol_usd_feed])
            price_feed = client.get_price_feed(self.sol_usd_feed)
            
            if not price_feed:
                logger.error("Price feed not found")
                return None
            
            price = price_feed.get_price()
            if not price:
                logger.error("Current price not available")
                return None
            
            logger.info(f"Successfully fetched price: {price.price}")
            return {
                "solana": {
                    "usd": float(price.price),
                    "confidence": float(price.conf)
                }
            }
                
        except Exception as e:
            logger.error(f"Error fetching Pyth price: {str(e)}")
            logger.exception(e)
            return None
        finally:
            if 'client' in locals():
                await client.close()
