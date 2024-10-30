import redis
from typing import Any, Optional
import json
import os
from functools import wraps
import logging
from datetime import timedelta

logger = logging.getLogger(__name__)

class RedisCache:
    def __init__(self):
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
        self.redis_password = os.getenv("REDIS_PASSWORD", "")
        self.client = redis.from_url(
            self.redis_url,
            password=self.redis_password,
            decode_responses=True
        )
        
    async def set(self, key: str, value: Any, expire: int = 300) -> bool:
        """Set a key with expiration time (default 5 minutes)"""
        try:
            serialized_value = json.dumps(value)
            return self.client.setex(key, expire, serialized_value)
        except Exception as e:
            logger.error(f"Error setting cache key {key}: {str(e)}")
            return False
            
    async def get(self, key: str) -> Optional[Any]:
        """Get a value from cache"""
        try:
            value = self.client.get(key)
            return json.loads(value) if value else None
        except Exception as e:
            logger.error(f"Error getting cache key {key}: {str(e)}")
            return None
            
    async def delete(self, key: str) -> bool:
        """Delete a key from cache"""
        try:
            return bool(self.client.delete(key))
        except Exception as e:
            logger.error(f"Error deleting cache key {key}: {str(e)}")
            return False
            
    def cached(self, prefix: str, expire: int = 300):
        """Decorator for caching function results"""
        def decorator(func):
            @wraps(func)
            async def wrapper(*args, **kwargs):
                # Create cache key from function arguments
                key_parts = [prefix]
                key_parts.extend(str(arg) for arg in args)
                key_parts.extend(f"{k}:{v}" for k, v in kwargs.items())
                cache_key = ":".join(key_parts)
                
                # Try to get from cache
                cached_value = await self.get(cache_key)
                if cached_value is not None:
                    logger.info(f"Cache hit for key: {cache_key}")
                    return cached_value
                    
                # If not in cache, execute function
                result = await func(*args, **kwargs)
                if result is not None:
                    await self.set(cache_key, result, expire)
                    logger.info(f"Cached result for key: {cache_key}")
                    
                return result
            return wrapper
        return decorator

# Create global cache instance
cache = RedisCache()
