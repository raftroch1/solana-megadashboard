from fastapi import APIRouter, HTTPException
from app.services.price_service import PriceService

router = APIRouter()
price_service = PriceService()

@router.get("/price/solana")
async def get_solana_price():
    """Get current Solana price and 24h change from multiple sources"""
    price_data = await price_service.get_solana_price()
    if not price_data["coingecko"] and not price_data["pyth"]:
        raise HTTPException(status_code=500, detail="Failed to fetch Solana price from all sources")
    return price_data
