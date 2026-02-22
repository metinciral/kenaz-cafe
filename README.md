# Kenaz Cafe Website

Modern, minimalist web sitesi - Home office çalışanları için tasarlanmış huzurlu cafe.

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, Shadcn UI
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Deployment:** 
  - Frontend: Cloudflare Pages
  - Backend: Railway
  - Database: MongoDB Atlas

## 📁 Proje Yapısı

```
/app
├── frontend/          # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── utils/        # Utility functions & API calls
│   │   └── App.js
│   ├── public/
│   └── package.json
│
└── backend/           # FastAPI application
    ├── models/        # Pydantic models
    ├── server.py      # Main API server
    └── requirements.txt
```

## 🔧 Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=your_railway_backend_url
```

### Backend (.env)
```
MONGO_URL=your_mongodb_atlas_connection_string
DB_NAME=kenaz_cafe
CORS_ORIGINS=https://kenazcafe.com.tr,https://www.kenazcafe.com.tr
```

## 📦 Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend
```bash
cd frontend
yarn install
yarn start
```

## 🌐 Deployment

Detaylı deployment talimatları için [DEPLOYMENT.md](./DEPLOYMENT.md) dosyasına bakın.

## 🔄 Making Changes

### Simple Changes (Text, Images, Colors)
1. Edit files in your local environment
2. Push to GitHub
3. Automatic deployment in 2-3 minutes

### Complex Changes (New Features, API)
- Contact development team or use Emergent AI

## 📝 Key Files to Edit

- **Frontend:**
  - `/frontend/src/utils/mockData.js` - Contact info, menu items, text content
  - `/frontend/src/components/` - UI components
  - `/frontend/src/index.css` - Global styles, colors

- **Backend:**
  - `/backend/server.py` - API endpoints
  - `/backend/models/reservation.py` - Data models

## 🎨 Brand Colors

- Primary: `#007367` (Pantone 328 C)

## 📞 Contact Information

- **Phone:** 0 530 248 8032
- **Email:** info@kenazcafe.com.tr
- **Location:** Nilüfer, Bursa

## 📊 API Endpoints

- `GET /api/` - Health check
- `POST /api/reservations` - Create reservation
- `GET /api/reservations` - List reservations
- `GET /api/reservations/{id}` - Get specific reservation
- `PATCH /api/reservations/{id}/status` - Update reservation status

## 📄 License

Proprietary - Kenaz Cafe © 2026
