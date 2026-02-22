# Kenaz Cafe - Web Sitesi PRD

## Proje Özeti
**Domain:** www.kenazcafe.com.tr  
**Lokasyon:** Nilüfer, Bursa  
**Konsept:** İskandinav mitolojisi temalı, home office çalışanları için tasarlanmış huzurlu cafe

## Kullanıcı Personaları
- Home office çalışanları
- Freelancer'lar ve yaratıcı profesyoneller
- Sakin çalışma ortamı arayanlar
- Kaliteli kahve ve yemek sevenler

## Core Requirements
### Tasarım
- Clean, minimalist İskandinav tasarımı
- Kurumsal renk: Pantone 328 C (#007367)
- Tek sayfalık (single page) yapı
- Responsive tasarım (mobile & desktop)
- Inter font ailesi

### Özellikler
- Online rezervasyon formu (mock data ile)
- Google Maps entegrasyonu
- Instagram bağlantısı
- Menü bağlantısı
- Smooth scrolling navigation

### Bölümler
1. Hero Section - Ana görsel ve CTA
2. About Section - Kenaz konsepti ve home office vurgusu
3. Features Section - 4 ana özellik (WiFi, Priz, Doğal Aydınlatma, Sessiz Ortam)
4. Menu Section - Menü öğeleri ve tam menü linki
5. Reservation Section - Rezervasyon formu
6. Contact Section - İletişim bilgileri ve harita
7. Footer - Sosyal medya ve quick links

## Tamamlanan İşler

### 22 Şubat 2026 - İlk Sürüm
✅ Frontend - Tek sayfalık landing page
✅ Tüm bölümler oluşturuldu (Hero, About, Features, Menu, Reservation, Contact, Footer)
✅ Responsive tasarım (mobile & desktop)
✅ Smooth navigation ve animasyonlar
✅ Shadcn UI components kullanımı
✅ Google Maps iframe entegrasyonu

### 22 Şubat 2026 - Backend & Full-Stack Integration
✅ **Backend API Endpoints:**
   - POST /api/reservations - Yeni rezervasyon oluşturma
   - GET /api/reservations - Rezervasyonları listeleme (admin)
   - GET /api/reservations/{id} - Spesifik rezervasyon
   - PATCH /api/reservations/{id}/status - Durum güncelleme
✅ **MongoDB Integration:**
   - Reservation model ve validation
   - Email ve telefon format kontrolü
   - Data persistence (6 test rezervasyonu başarıyla kaydedildi)
✅ **Frontend-Backend Bağlantısı:**
   - Rezervasyon formu backend'e bağlandı
   - Toast notifications çalışıyor
   - Form validation ve error handling
✅ **Testing:**
   - Backend: %100 başarı (13/13 test passed)
   - Frontend: %100 başarı
   - End-to-end form submission test edildi

## Mock Data Status
❌ Artık mock data yok - Tüm veriler gerçek API'den geliyor

## Next Steps (Öncelik Sırası)

### 🚀 Deployment (HAZIR)
- [x] Backend API tamamlandı ve test edildi
- [x] Frontend-backend entegrasyonu çalışıyor
- [ ] **MongoDB Atlas** - Ücretsiz hesap oluştur (512MB)
- [ ] **Railway.app** - Backend'i deploy et (5$/ay ücretsiz tier)
- [ ] **Cloudflare Pages** - Frontend'i deploy et
- [ ] **Domain Bağlama** - www.kenazcafe.com.tr

### P1 (Orta Öncelik)
- [ ] Email notification sistemi (rezervasyon onayı için)
- [ ] Admin paneli - Rezervasyonları görüntüleme ve onaylama
- [ ] WhatsApp bildirim entegrasyonu
- [ ] Image optimization ve performance

### P2 (Düşük Öncelik)
- [ ] Blog veya duyuru bölümü
- [ ] Online sipariş sistemi
- [ ] Çoklu dil desteği (Türkçe/İngilizce)
- [ ] Analytics entegrasyonu

## Teknik Detaylar
**Frontend:** React, Tailwind CSS, Shadcn UI  
**Backend:** FastAPI (henüz kurulmadı)  
**Database:** MongoDB (henüz kurulmadı)  
**Deployment:** Emergent Preview Environment

## Notlar
- Tasarım İskandinav minimalizm prensiplerine uygun
- Kurumsal renk (#007367) tutarlı şekilde kullanıldı
- Tüm görseller Unsplash/Pexels'den seçildi
- Rezervasyon formu şu an mock data ile çalışıyor
