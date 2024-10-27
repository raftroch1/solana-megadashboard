from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from app.core.config import get_settings
import jwt
from typing import Optional, Dict

settings = get_settings()
security = HTTPBearer()

def get_supabase() -> Client:
    """Initialize Supabase client"""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> Dict:
    """
    Validate JWT token and return current user
    
    Args:
        credentials: HTTP Authorization credentials
        
    Returns:
        Dict containing user information
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    try:
        token = credentials.credentials
        # Verify JWT token
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )
        
        # Get user from Supabase
        supabase = get_supabase()
        user = supabase.table('users').select('*').eq('id', payload['sub']).single().execute()
        
        if not user.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
            
        return user.data
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

async def get_subscription_tier(
    current_user: Dict = Depends(get_current_user)
) -> str:
    """
    Get user's subscription tier
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        String representing subscription tier ('free', 'pro', or 'enterprise')
    """
    try:
        # Get subscription from Supabase
        supabase = get_supabase()
        subscription = supabase.table('subscriptions')\
            .select('*')\
            .eq('user_id', current_user['id'])\
            .eq('status', 'active')\
            .single()\
            .execute()
            
        if not subscription.data:
            return 'free'  # Default to free tier
            
        return subscription.data['tier']
    except Exception as e:
        # Log error but don't fail - default to free tier
        print(f"Error getting subscription tier: {str(e)}")
        return 'free'

def check_api_key(api_key: str = Depends(security)) -> bool:
    """
    Validate API key for external API access
    
    Args:
        api_key: API key from request
        
    Returns:
        Boolean indicating if API key is valid
        
    Raises:
        HTTPException: If API key is invalid
    """
    try:
        # Get API key from Supabase
        supabase = get_supabase()
        result = supabase.table('api_keys')\
            .select('*')\
            .eq('key', api_key.credentials)\
            .single()\
            .execute()
            
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid API key"
            )
            
        # Check if API key is active
        if not result.data['is_active']:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="API key is inactive"
            )
            
        return True
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
