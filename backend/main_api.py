from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(prefix="/api", tags=["main"])

@router.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}

@router.get("/info")
async def get_app_info():
    return {
        "name": "Professional App API",
        "version": "1.0.0",
        "features": ["REST API", "Database Integration", "Authentication"]
    }