from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
import uuid


class ReservationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str
    phone: str = Field(..., min_length=10, max_length=20)
    date: str  # Format: YYYY-MM-DD
    time: str  # Format: HH:MM
    guests: int = Field(..., ge=1, le=20)
    message: Optional[str] = Field(None, max_length=500)

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('İsim boş olamaz')
        return v.strip()

    @validator('email')
    def email_must_be_valid(cls, v):
        if '@' not in v or '.' not in v:
            raise ValueError('Geçerli bir e-posta adresi giriniz')
        return v.lower().strip()

    @validator('phone')
    def phone_must_be_valid(cls, v):
        # Remove spaces and common separators including '+'
        cleaned = v.replace(' ', '').replace('-', '').replace('(', '').replace(')', '').replace('+', '')
        if not cleaned.isdigit() or len(cleaned) < 10:
            raise ValueError('Geçerli bir telefon numarası giriniz')
        return cleaned


class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    date: str
    time: str
    guests: int
    message: Optional[str] = None
    status: str = "pending"  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
