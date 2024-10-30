from typing import Dict, List, Optional
import logging
from app.core.cache import cache
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class DataAggregator:
    def __init__(self):
        self.aggregation_periods = {
            "1m": 60,
            "5m": 300,
            "15m": 900,
            "1h": 3600,
            "4h": 14400,
            "1d": 86400
        }
        
    @cache.cached("aggregation", expire=300)
    async def aggregate_transactions(self, 
                                  transactions: List[Dict], 
                                  period: str = "1h") -> Optional[Dict]:
        """Aggregate transaction data for a specific time period"""
        try:
            if period not in self.aggregation_periods:
                raise ValueError(f"Invalid period: {period}")
                
            period_seconds = self.aggregation_periods[period]
            now = datetime.utcnow()
            period_start = now - timedelta(seconds=period_seconds)
            
            # Filter transactions for the specified period
            period_transactions = [
                tx for tx in transactions 
                if datetime.fromtimestamp(tx["timestamp"]) > period_start
            ]
            
            aggregated_data = {
                "period": period,
                "start_time": period_start.isoformat(),
                "end_time": now.isoformat(),
                "total_transactions": len(period_transactions),
                "total_volume": sum(tx["amount"] for tx in period_transactions),
                "unique_accounts": len(set(
                    account 
                    for tx in period_transactions 
                    for account in tx["accounts"]
                )),
                "transaction_types": self._aggregate_transaction_types(period_transactions)
            }
            
            return aggregated_data
            
        except Exception as e:
            logger.error(f"Error aggregating transactions: {str(e)}")
            return None
            
    def _aggregate_transaction_types(self, transactions: List[Dict]) -> Dict:
        """Aggregate transaction types"""
        type_counts = {}
        for tx in transactions:
            tx_type = tx.get("type", "unknown")
            type_counts[tx_type] = type_counts.get(tx_type, 0) + 1
        return type_counts
