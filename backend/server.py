from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime

from models.reservation import Reservation, ReservationCreate
from email_service import send_email_notification

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
if not mongo_url:
    raise ValueError("MONGO_URL environment variable is required")

client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'kenaz_cafe')]

# Create the main app without a prefix
app = FastAPI(title="Kenaz Cafe API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Kenaz Cafe API is running", "status": "healthy"}


# Reservation endpoints
@api_router.post("/reservations", response_model=Reservation, status_code=201)
async def create_reservation(reservation_data: ReservationCreate, background_tasks: BackgroundTasks):
    try:
        reservation = Reservation(**reservation_data.dict())
        doc = reservation.dict()
        doc['created_at'] = doc['created_at'].isoformat()
        result = await db.reservations.insert_one(doc)
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Rezervasyon kaydedilemedi")
        background_tasks.add_task(send_email_notification, reservation)
        logging.info(f"New reservation created: {reservation.id} for {reservation.name}")
        return reservation
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logging.error(f"Error creating reservation: {str(e)}")
        raise HTTPException(status_code=500, detail="Bir hata oluştu")


@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations(status: str = None, limit: int = 100):
    try:
        query = {}
        if status:
            query["status"] = status
        reservations = await db.reservations.find(query, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
        for res in reservations:
            if isinstance(res.get('created_at'), str):
                res['created_at'] = datetime.fromisoformat(res['created_at'])
        return reservations
    except Exception as e:
        logging.error(f"Error fetching reservations: {str(e)}")
        raise HTTPException(status_code=500, detail="Rezervasyonlar yüklenemedi")


@api_router.get("/reservations/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: str):
    reservation = await db.reservations.find_one({"id": reservation_id}, {"_id": 0})
    if not reservation:
        raise HTTPException(status_code=404, detail="Rezervasyon bulunamadı")
    if isinstance(reservation.get('created_at'), str):
        reservation['created_at'] = datetime.fromisoformat(reservation['created_at'])
    return Reservation(**reservation)


@api_router.patch("/reservations/{reservation_id}/status")
async def update_reservation_status(reservation_id: str, status: str):
    if status not in ["pending", "confirmed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Geçersiz durum")
    result = await db.reservations.update_one(
        {"id": reservation_id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Rezervasyon bulunamadı")
    return {"message": "Durum güncellendi", "status": status}


@api_router.get("/test-email")
async def test_email_config():
    import smtplib
    from email_service import get_email_credentials, SMTP_SERVER, SMTP_PORT
    email, password = get_email_credentials()
    if not email or not password:
        return {"status": "error", "message": f"Eksik yetki ayarları. EMAIL: {'Var' if email else 'Yok'}, PASSWORD: {'Var' if password else 'Yok'}"}
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(email, password)
        server.quit()
        return {"status": "success", "message": f"SMTP bağlantısı {email} için BAŞARILI!"}
    except Exception as e:
        return {"status": "error", "message": f"Bağlantı hatası: {str(e)}"}


# Site Content endpoints
@api_router.get("/content")
async def get_content():
    content = await db.site_content.find({}, {"_id": 0}).to_list(100)
    if not content:
        return []
    return content


@api_router.get("/content/{key}")
async def get_content_by_key(key: str):
    item = await db.site_content.find_one({"key": key}, {"_id": 0})
    if not item:
        raise HTTPException(status_code=404, detail="İçerik bulunamadı")
    return item


@api_router.put("/content/{key}")
async def update_content(key: str, request: Request):
    data = await request.json()
    data["key"] = key
    data["updated_at"] = datetime.utcnow().isoformat()
    await db.site_content.update_one(
        {"key": key},
        {"$set": data},
        upsert=True
    )
    return {"message": "İçerik güncellendi", "key": key}


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Include the router in the main app
app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
