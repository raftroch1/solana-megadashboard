# Testing the Implementation

## Prerequisites
- Redis server running locally (or configured via REDIS_URL)
- Python environment with dependencies installed
- Backend server running

## Running the Tests

1. Run all tests:
```bash
cd backend
poetry run pytest tests/ -v
```

2. Run specific test categories:
```bash
# Test price services
poetry run pytest tests/test_services.py -k test_price_service -v

# Test Redis caching
poetry run pytest tests/test_services.py -k test_redis_cache -v

# Test blockchain indexing
poetry run pytest tests/test_services.py -k test_blockchain_indexer -v
```

## Testing WebSocket Connection

1. Start the backend server:
```bash
cd backend
poetry run uvicorn app.main:app --reload
```

2. In a new terminal, run the WebSocket test client:
```bash
cd backend
poetry run python scripts/test_websocket.py
```

The test client will connect to the WebSocket endpoint and print received transactions.

## Manual Testing via API

1. Test price endpoint:
```bash
curl http://localhost:8000/api/v1/price/solana
```

2. Test agent analysis:
```bash
curl http://localhost:8000/api/v1/analysis/volume
curl http://localhost:8000/api/v1/analysis/whales
```

3. Test aggregated transactions:
```bash
curl http://localhost:8000/api/v1/transactions/aggregate/1h
