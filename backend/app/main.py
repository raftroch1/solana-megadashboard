from fastapi import FastAPI
from app.api.v1.endpoints import price, agents, blockchain
from app.services.blockchain_indexer import BlockchainIndexer
import asyncio

app = FastAPI()

# Initialize blockchain indexer
indexer = BlockchainIndexer()

@app.on_event("startup")
async def startup_event():
    """Start blockchain indexing on application startup"""
    asyncio.create_task(indexer.start_indexing())

@app.on_event("shutdown")
async def shutdown_event():
    """Stop blockchain indexing on application shutdown"""
    await indexer.stop_indexing()

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Include routers
app.include_router(price.router, prefix="/api/v1", tags=["price"])
app.include_router(agents.router, prefix="/api/v1", tags=["agents"])
app.include_router(blockchain.router, prefix="/api/v1", tags=["blockchain"])
