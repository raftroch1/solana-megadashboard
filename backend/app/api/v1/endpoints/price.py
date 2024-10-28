from fastapi import APIRouter, HTTPException
from app.services.price_service import PriceService

router = APIRouter()
price_service = PriceService()

@router.get("/price/solana")
def get_solana_price():
    """Get current Solana price and 24h change"""
    price_data = price_service.get_solana_price()
    if not price_data:
        raise HTTPException(status_code=500, detail="Failed to fetch Solana price")
    return price_data
