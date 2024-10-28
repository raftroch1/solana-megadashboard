import asyncio
import json
import websockets
from typing import Dict, Optional

class PythService:
    def __init__(self):
        # Solana mainnet Pyth websocket endpoint
        self.ws_url = "wss://hermes-beta.pyth.network/ws"
        # Solana SOL/USD price feed ID
        self.sol_usd_feed = "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"
        
    async def get_solana_price(self) -> Optional[Dict]:
        """Get current Solana price from Pyth Network"""
        try:
            async with websockets.connect(self.ws_url) as websocket:
                # Subscribe to SOL/USD price feed
                subscribe_message = {
                    "type": "subscribe",
                    "ids": [self.sol_usd_feed]
                }
                await websocket.send(json.dumps(subscribe_message))
                
                # Get initial price update
                response = await websocket.recv()
                price_data = json.loads(response)
                
                if "price" in price_data:
                    return {
                        "solana": {
                            "usd": price_data["price"]["price"],
                            "confidence": price_data["price"]["conf"]
                        }
                    }
                return None
                
        except Exception as e:
            print(f"Error fetching Pyth price: {str(e)}")
            return None
