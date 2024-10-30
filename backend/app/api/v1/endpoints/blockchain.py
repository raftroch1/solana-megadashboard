from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from app.services.blockchain_indexer import BlockchainIndexer
from app.services.data_aggregator import DataAggregator
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter()
indexer = BlockchainIndexer()
aggregator = DataAggregator()

@router.websocket("/ws/transactions")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time transaction updates"""
    await websocket.accept()
    
    async def transaction_callback(data):
        try:
            await websocket.send_json(data)
        except Exception as e:
            logger.error(f"Error sending data through WebSocket: {str(e)}")
    
    try:
        indexer.add_subscriber(transaction_callback)
        
        # Keep the connection alive
        while True:
            try:
                # Wait for any client messages (ping/pong)
                data = await websocket.receive_text()
            except WebSocketDisconnect:
                break
                
    finally:
        indexer.remove_subscriber(transaction_callback)
        
@router.get("/transactions/aggregate/{period}")
async def get_aggregated_transactions(period: str):
    """Get aggregated transaction data for a specific period"""
    try:
        # TODO: Get actual transactions from storage
        transactions = []  # Placeholder for actual transaction data
        
        aggregated_data = await aggregator.aggregate_transactions(
            transactions=transactions,
            period=period
        )
        
        if not aggregated_data:
            raise HTTPException(
                status_code=500,
                detail="Failed to aggregate transaction data"
            )
            
        return aggregated_data
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
