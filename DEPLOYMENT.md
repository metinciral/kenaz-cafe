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
   - Render'dan erişim için gerekli

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

## 2️⃣ Backend Deployment (Render)

Not:
- Backend deploy'u ilk etapta Railway ile denendi; şu an aktif ortam Render üzerinden devam ediyor.

### Adımlar:
1. [Render Dashboard](https://dashboard.render.com) hesabınıza giriş yapın
2. **New +** → **Web Service**
3. GitHub repository'sini seçin: `metinciral/kenaz-cafe`
4. **Branch:** `main`
5. **Root Directory:** `backend`
6. **Runtime:** Docker (repo içinde `backend/Dockerfile` kullanılır)
7. **Environment Variables** ekleyin:
   ```
   MONGO_URL=mongodb+srv://kenaz_admin:SIZIN_SIFRE@cluster0.xxxxx.mongodb.net/kenaz_cafe?retryWrites=true&w=majority
   DB_NAME=kenaz_cafe
   CORS_ORIGINS=https://kenazcafe.com.tr,https://www.kenazcafe.com.tr

   # (Opsiyonel) E-posta bildirimleri
   SMTP_EMAIL=your_gmail_address
   SMTP_PASSWORD=your_gmail_app_password
   ADMIN_EMAIL=info@kenazcafe.com.tr
   ```
8. **Create Web Service** / **Deploy**
9. Deployment tamamlanınca servis URL'ini kaydedin
   - Örnek: `https://kenaz-cafe-backend.onrender.com`

Auto-deploy notu:
- Render servisinde `Root Directory=backend` kullanıldığı için sadece `backend/` altındaki değişiklikler backend auto-deploy'u tetikler.

**✅ Backend Hazır!** Render URL'ini kaydedin.

---

## 3️⃣ Cloudflare Pages - Frontend Deployment

### Adımlar:
1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. **"Create application"** → **"Pages"** → **"Connect to Git"**
3. GitHub repository'sini seçin (metinciral/kenaz-cafe)
4. **Build Settings:**
   - **Root directory:** `frontend`
   - **Build command:** `CI=false npm run build`
   - **Build output directory:** `build`

5. **Environment Variables:**
   ```
   REACT_APP_BACKEND_URL=https://kenaz-cafe-backend.onrender.com
   ```
   (Render'dan aldığınız backend URL'ini yapıştırın)

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
curl https://kenaz-cafe-backend.onrender.com/api/
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
- 🔧 **Backend:** Render
- 💾 **Database:** MongoDB Atlas
- ☁️ **Frontend:** Cloudflare Pages

---

## 🔄 Güncellemeler

### Otomatik Deployment:
- GitHub'a kod push edildiğinde
- Render ve Cloudflare otomatik deploy eder
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
- Render logs kontrol edin
- MongoDB connection string doğru mu?
- Environment variables ekli mi?

### Frontend backend'e bağlanamıyor:
- REACT_APP_BACKEND_URL doğru mu?
- CORS ayarları doğru mu?
- Render backend çalışıyor mu?

### Rezervasyonlar kaydedilmiyor:
- MongoDB Atlas'ta IP whitelist var mı?
- Database user permissions doğru mu?
- Backend logs kontrol edin

---

## 📞 Destek

Sorun yaşarsanız:
1. Render ve Cloudflare logs kontrol edin
2. GitHub issues açın
3. Emergent AI'a danışın
