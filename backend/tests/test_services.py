import pytest
import asyncio
import websockets
import json
from app.services.price_service import PriceService
from app.services.blockchain_indexer import BlockchainIndexer
from app.core.cache import cache

@pytest.mark.asyncio
async def test_price_service():
    """Test price fetching from both sources"""
    price_service = PriceService()
    
    # Test CoinGecko
    coingecko_price = await price_service.get_solana_price_coingecko()
    assert coingecko_price is not None
    assert "solana" in coingecko_price
    assert "usd" in coingecko_price["solana"]
    
    # Test Pyth
    pyth_price = await price_service.get_solana_price_pyth()
    if pyth_price:  # Pyth might be unavailable
        assert "solana" in pyth_price
        assert "usd" in pyth_price["solana"]
    
    # Test combined price endpoint
    combined_price = await price_service.get_solana_price()
    assert "coingecko" in combined_price
    assert "pyth" in combined_price
    assert "status" in combined_price

@pytest.mark.asyncio
async def test_redis_cache():
    """Test Redis caching functionality"""
    test_key = "test:key"
    test_value = {"test": "data"}
    
    # Test setting cache
    success = await cache.set(test_key, test_value)
    assert success is True
    
    # Test getting cache
    cached_value = await cache.get(test_key)
    assert cached_value == test_value
    
    # Test cache deletion
    deleted = await cache.delete(test_key)
    assert deleted is True
    
    # Verify deletion
    cached_value = await cache.get(test_key)
    assert cached_value is None

@pytest.mark.asyncio
async def test_blockchain_indexer():
    """Test blockchain indexer WebSocket connection"""
    indexer = BlockchainIndexer()
    received_data = []
    
    async def test_callback(data):
        received_data.append(data)
    
    # Add test subscriber
    indexer.add_subscriber(test_callback)
    
    # Start indexing in background
    indexing_task = asyncio.create_task(indexer.start_indexing())
    
    # Wait for some data (timeout after 30 seconds)
    try:
        await asyncio.wait_for(
            asyncio.shield(
                # Wait until we receive at least one transaction
                asyncio.create_task(
                    asyncio.wait_for(
                        asyncio.create_task(
                            asyncio.sleep(1)  # Check every second
                        ),
                        timeout=1
                    )
                )
            ),
            timeout=30
        )
    except asyncio.TimeoutError:
        pass
    finally:
        # Stop indexing
        await indexer.stop_indexing()
        indexer.remove_subscriber(test_callback)
    
    # Verify we received some data
    assert len(received_data) > 0, "No blockchain data received"
