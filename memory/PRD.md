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

## Tamamlanan İşler (22 Şubat 2026)
✅ Frontend - Tek sayfalık landing page (mock data)
✅ Tüm bölümler oluşturuldu
✅ Responsive tasarım
✅ Smooth navigation ve animasyonlar
✅ Shadcn UI components kullanımı
✅ Google Maps iframe entegrasyonu
✅ Rezervasyon formu (toast notifications ile)
✅ Mobile ve desktop test edildi

## Mock Data
- `/app/frontend/src/utils/mockData.js` - Tüm içerik ve iletişim bilgileri
- Rezervasyon formu mock submission fonksiyonu

## Next Steps (Öncelik Sırası)
### P0 (Yüksek Öncelik)
- [ ] Backend API geliştirme (rezervasyon kaydetme)
- [ ] MongoDB entegrasyonu
- [ ] Menü PDF'i veya link ekleme
- [ ] Gerçek telefon numarası ve e-posta ekleme
- [ ] Instagram handle güncelleme

### P1 (Orta Öncelik)
- [ ] Email notification sistemi (rezervasyon onayı)
- [ ] Admin paneli (rezervasyonları görüntüleme)
- [ ] Image optimization

### P2 (Düşük Öncelik)
- [ ] Blog veya duyuru bölümü
- [ ] Online sipariş sistemi
- [ ] Çoklu dil desteği (Türkçe/İngilizce)

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
