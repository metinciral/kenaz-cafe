from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime

from models.reservation import Reservation, ReservationCreate


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Kenaz Cafe API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Kenaz Cafe API is running", "status": "healthy"}


# Reservation endpoints
@api_router.post("/reservations", response_model=Reservation, status_code=201)
async def create_reservation(reservation_data: ReservationCreate):
    """
    Create a new reservation
    """
    try:
        # Create reservation object
        reservation = Reservation(**reservation_data.dict())
        
        # Prepare document for MongoDB
        doc = reservation.dict()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into MongoDB
        result = await db.reservations.insert_one(doc)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Rezervasyon kaydedilemedi")
        
        logging.info(f"New reservation created: {reservation.id} for {reservation.name}")
        return reservation
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logging.error(f"Error creating reservation: {str(e)}")
        raise HTTPException(status_code=500, detail="Bir hata oluştu")


@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations(
    status: str = None,
    limit: int = 100
):
    """
    Get all reservations (for admin use)
    Optional filter by status: pending, confirmed, cancelled
    """
    try:
        query = {}
        if status:
            query["status"] = status
        
        reservations = await db.reservations.find(query, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
        
        # Convert ISO string timestamps back to datetime objects
        for res in reservations:
            if isinstance(res.get('created_at'), str):
                res['created_at'] = datetime.fromisoformat(res['created_at'])
        
        return reservations
    
    except Exception as e:
        logging.error(f"Error fetching reservations: {str(e)}")
        raise HTTPException(status_code=500, detail="Rezervasyonlar yüklenemedi")


@api_router.get("/reservations/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: str):
    """
    Get a specific reservation by ID
    """
    reservation = await db.reservations.find_one({"id": reservation_id}, {"_id": 0})
    
    if not reservation:
        raise HTTPException(status_code=404, detail="Rezervasyon bulunamadı")
    
    # Convert ISO string timestamp back to datetime object
    if isinstance(reservation.get('created_at'), str):
        reservation['created_at'] = datetime.fromisoformat(reservation['created_at'])
    
    return Reservation(**reservation)


@api_router.patch("/reservations/{reservation_id}/status")
async def update_reservation_status(reservation_id: str, status: str):
    """
    Update reservation status (confirmed, cancelled)
    """
    if status not in ["pending", "confirmed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Geçersiz durum")
    
    result = await db.reservations.update_one(
        {"id": reservation_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Rezervasyon bulunamadı")
    
    return {"message": "Durum güncellendi", "status": status}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()