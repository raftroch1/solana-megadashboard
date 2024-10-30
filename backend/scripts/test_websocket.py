import asyncio
import websockets
import json

async def test_websocket_connection():
    """Test WebSocket connection to the blockchain endpoint"""
    uri = "ws://localhost:8000/api/v1/ws/transactions"
    
    try:
        async with websockets.connect(uri) as websocket:
            print("Connected to WebSocket endpoint")
            
            # Keep connection alive and print received messages
            while True:
                try:
                    message = await websocket.recv()
                    data = json.loads(message)
                    print(f"Received transaction: {json.dumps(data, indent=2)}")
                except websockets.exceptions.ConnectionClosed:
                    print("Connection closed")
                    break
                
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    print("Starting WebSocket test client...")
    print("Press Ctrl+C to stop")
    asyncio.run(test_websocket_connection())
