from fastapi import FastAPI
from app.api.v1.endpoints import price, agents

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Include routers
app.include_router(price.router, prefix="/api/v1", tags=["price"])
app.include_router(agents.router, prefix="/api/v1", tags=["agents"])
