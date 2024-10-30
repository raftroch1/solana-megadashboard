import pytest
import asyncio
import redis
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="session")
def redis_client():
    """Create a Redis client for testing."""
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    redis_password = os.getenv("REDIS_PASSWORD", "")
    
    client = redis.from_url(
        redis_url,
        password=redis_password,
        decode_responses=True
    )
    
    # Clear test database before tests
    client.flushdb()
    
    yield client
    
    # Clear test database after tests
    client.flushdb()
