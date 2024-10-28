from fastapi import FastAPI
from app.api.v1.endpoints import price

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Include the price router
app.include_router(price.router, prefix="/api/v1", tags=["price"])
