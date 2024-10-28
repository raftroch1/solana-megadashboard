from pycoingecko import CoinGeckoAPI
from typing import Dict, Optional

class PriceService:
    def __init__(self):
        self.cg = CoinGeckoAPI()
    
    def get_solana_price(self) -> Optional[Dict]:
        """Get current Solana price from CoinGecko"""
        try:
            return self.cg.get_price(ids='solana', vs_currencies='usd', include_24hr_change=True)
        except Exception as e:
            print(f"Error fetching price: {str(e)}")
            return None
