
from fastapi import FastAPI

app = FastAPI(
    title="Aircraft Reallocation API",
    description="LSTM and PPO based aircraft disruption management",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Aircraft Reallocation Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
