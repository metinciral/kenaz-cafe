# Kenaz Cafe - Deployment Guide

Bu dokümanda deployment işlemini adım adım bulabilirsiniz.

## 1️⃣ MongoDB Atlas Kurulumu

### Adımlar:
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) adresine gidin
2. Mevcut hesabınızla giriş yapın
3. **"Create New Cluster"** veya mevcut bir cluster kullanın
4. **Database Access** bölümünden kullanıcı oluşturun:
   - Username: `kenaz_admin` (veya istediğiniz)
   - Password: Güçlü bir şifre (kaydedin!)
   - Database User Privileges: **Read and Write**

5. **Network Access** bölümünden IP ekleyin:
   - **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Railway'den erişim için gerekli

6. **Connection String** alın:
   - Cluster → **"Connect"** → **"Connect your application"**
   - Connection string: 
     ```
     mongodb+srv://kenaz_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - `<password>` kısmını kendi şifrenizle değiştirin
   - Database adı: `kenaz_cafe` olarak ayarlayın

**✅ MongoDB Hazır!** Connection string'i bir yere kaydedin.

---

## 2️⃣ Railway - Backend Deployment

### Adımlar:
1. [Railway.app](https://railway.app) hesabınıza giriş yapın
2. **"New Project"** → **"Deploy from GitHub repo"**
3. GitHub repository'sini seçin (metinciral/kenaz-cafe)
4. **Settings** bölümünden:
   - **Root Directory:** `/backend` olarak ayarlayın
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`

5. **Variables** sekmesinden environment variables ekleyin:
   ```
   MONGO_URL=mongodb+srv://kenaz_admin:SIZIN_SIFRE@cluster0.xxxxx.mongodb.net/kenaz_cafe?retryWrites=true&w=majority
   DB_NAME=kenaz_cafe
   CORS_ORIGINS=https://kenazcafe.com.tr,https://www.kenazcafe.com.tr
   ```

6. **Deploy** butonuna tıklayın
7. Deployment tamamlanınca **Domain** kısmından URL'i kopyalayın
   - Örnek: `https://kenaz-cafe-backend.up.railway.app`

**✅ Backend Hazır!** Railway URL'ini kaydedin.

---

## 3️⃣ Cloudflare Pages - Frontend Deployment

### Adımlar:
1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. **"Create application"** → **"Pages"** → **"Connect to Git"**
3. GitHub repository'sini seçin (metinciral/kenaz-cafe)
4. **Build Settings:**
   - **Build command:** `cd frontend && yarn install && yarn build`
   - **Build output directory:** `frontend/build`
   - **Root directory:** `/` (boş bırakın)

5. **Environment Variables:**
   ```
   REACT_APP_BACKEND_URL=https://kenaz-cafe-backend.up.railway.app
   ```
   (Railway'den aldığınız URL'i yapıştırın)

6. **"Save and Deploy"** tıklayın
7. İlk deployment 3-5 dakika sürebilir
8. Deployment tamamlanınca Cloudflare size bir URL verecek:
   - Örnek: `https://kenaz-cafe.pages.dev`

**✅ Frontend Hazır!**

---

## 4️⃣ Custom Domain Bağlama (www.kenazcafe.com.tr)

### Cloudflare'da Domain Ayarları:
1. Cloudflare Pages projenize gidin
2. **"Custom domains"** sekmesi
3. **"Set up a custom domain"** → `www.kenazcafe.com.tr` ekleyin
4. Cloudflare otomatik olarak DNS kaydını oluşturacak
5. 2-5 dakika içinde aktif olur

### DNS Kontrolü:
- `www.kenazcafe.com.tr` → Cloudflare Pages
- `kenazcafe.com.tr` → www'ye redirect (isteğe bağlı)

**✅ Domain Bağlandı!**

---

## 5️⃣ Test Etme

### Backend Test:
```bash
curl https://kenaz-cafe-backend.up.railway.app/api/
```
**Beklenen:** `{"message": "Kenaz Cafe API is running", "status": "healthy"}`

### Frontend Test:
1. https://www.kenazcafe.com.tr adresine gidin
2. Rezervasyon formunu doldurun
3. Form gönderilince toast bildirimi görünmeli
4. Form temizlenmeli

### Database Test:
1. MongoDB Atlas → **Collections**
2. `kenaz_cafe` database → `reservations` collection
3. Yeni rezervasyon görünmeli

---

## 🎉 Tamamlandı!

Siteniz artık yayında:
- 🌐 **Web:** https://www.kenazcafe.com.tr
- 🔧 **Backend:** Railway
- 💾 **Database:** MongoDB Atlas
- ☁️ **Frontend:** Cloudflare Pages

---

## 🔄 Güncellemeler

### Otomatik Deployment:
- GitHub'a kod push edildiğinde
- Railway ve Cloudflare otomatik deploy eder
- 2-3 dakika içinde güncellemeler yayına alınır

### Manuel Güncelleme:
1. Değişiklikleri yapın
2. GitHub'a push edin:
   ```bash
   git add .
   git commit -m "Site güncellendi"
   git push
   ```
3. Otomatik deploy başlar

---

## 🆘 Sorun Giderme

### Backend çalışmıyor:
- Railway logs kontrol edin
- MongoDB connection string doğru mu?
- Environment variables ekli mi?

### Frontend backend'e bağlanamıyor:
- REACT_APP_BACKEND_URL doğru mu?
- CORS ayarları doğru mu?
- Railway backend çalışıyor mu?

### Rezervasyonlar kaydedilmiyor:
- MongoDB Atlas'ta IP whitelist var mı?
- Database user permissions doğru mu?
- Backend logs kontrol edin

---

## 📞 Destek

Sorun yaşarsanız:
1. Railway ve Cloudflare logs kontrol edin
2. GitHub issues açın
3. Emergent AI'a danışın
