from fastapi import APIRouter, HTTPException
from app.agents.agent_manager import AgentManager
from typing import Optional

router = APIRouter()
agent_manager = AgentManager()

@router.get("/analysis/volume")
async def get_volume_analysis():
    """Get comprehensive volume analysis"""
    try:
        analysis = await agent_manager.run_volume_analysis()
        if not analysis:
            raise HTTPException(status_code=500, detail="Failed to perform volume analysis")
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analysis/whales")
async def get_whale_analysis(wallet_address: Optional[str] = None):
    """Get whale movement analysis"""
    try:
        analysis = await agent_manager.run_whale_tracking(wallet_address)
        if not analysis:
            raise HTTPException(status_code=500, detail="Failed to perform whale analysis")
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
