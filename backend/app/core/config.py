from pydantic import BaseModel
from typing import List
from functools import lru_cache

class Settings(BaseModel):
    # Project Info
    PROJECT_NAME: str = "Solana Analytics API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"  # Change in production
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Database
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    REDIS_PASSWORD: str = ""
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # Local frontend
        "https://app.solanalytics.com"  # Production frontend
    ]
    
    # Solana
    SOLANA_RPC_URL: str = "https://api.mainnet-beta.solana.com"
    SOLANA_WS_URL: str = "wss://api.mainnet-beta.solana.com"
    
    # Stripe
    STRIPE_API_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    STRIPE_PRICE_ID_PRO: str = ""
    STRIPE_PRICE_ID_ENTERPRISE: str = ""
    
    # OpenAI (for CrewAI)
    OPENAI_API_KEY: str = ""
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Subscription Tiers Configuration
    SUBSCRIPTION_LIMITS: dict = {
        "free": {
            "wallets": 3,
            "api_calls_per_day": 1000,
            "historical_data_days": 30,
            "features": ["basic_analytics", "wallet_tracking"]
        },
        "pro": {
            "wallets": 10,
            "api_calls_per_day": 10000,
            "historical_data_days": 90,
            "features": [
                "basic_analytics",
                "wallet_tracking",
                "ai_insights",
                "api_access",
                "alerts"
            ]
        },
        "enterprise": {
            "wallets": float('inf'),
            "api_calls_per_day": float('inf'),
            "historical_data_days": 365,
            "features": [
                "basic_analytics",
                "wallet_tracking",
                "ai_insights",
                "api_access",
                "alerts",
                "custom_agents",
                "team_access",
                "priority_support"
            ]
        }
    }
    
    # Email Configuration
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    
    # Monitoring
    SENTRY_DSN: str = ""
    
    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance
    
    Returns:
        Settings instance
    """
    return Settings()
