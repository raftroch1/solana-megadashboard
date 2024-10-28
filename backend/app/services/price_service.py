from pycoingecko import CoinGeckoAPI
from typing import Dict, Optional
from .pyth_service import PythService
import logging

logger = logging.getLogger(__name__)

class PriceService:
    def __init__(self):
        self.cg = CoinGeckoAPI()
        self.pyth = PythService()
    
    def get_solana_price_coingecko(self) -> Optional[Dict]:
        """Get current Solana price from CoinGecko"""
        try:
            return self.cg.get_price(ids='solana', vs_currencies='usd', include_24hr_change=True)
        except Exception as e:
            logger.error(f"Error fetching CoinGecko price: {str(e)}")
            return None
            
    async def get_solana_price_pyth(self) -> Optional[Dict]:
        """Get current Solana price from Pyth"""
        try:
            price_data = await self.pyth.get_solana_price()
            logger.info(f"Pyth price data: {price_data}")
            return price_data
        except Exception as e:
            logger.error(f"Error in Pyth price service: {str(e)}")
            return None
        
    async def get_solana_price(self) -> Dict:
        """Get Solana price from both sources"""
        coingecko_price = self.get_solana_price_coingecko()
        pyth_price = await self.get_solana_price_pyth()
        
        result = {
            "coingecko": coingecko_price,
            "pyth": pyth_price,
            "status": {
                "coingecko": "success" if coingecko_price else "failed",
                "pyth": "success" if pyth_price else "failed"
            }
        }
        
        logger.info(f"Combined price data: {result}")
        return result
