import smtplib
import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from models.reservation import Reservation

logger = logging.getLogger(__name__)

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

def get_email_credentials():
    return os.environ.get("SMTP_EMAIL"), os.environ.get("SMTP_PASSWORD")

def send_email_notification(reservation: Reservation):
    smtp_email, smtp_password = get_email_credentials()
    
    if not smtp_email or not smtp_password:
        logger.warning("SMTP_EMAIL or SMTP_PASSWORD is not set. Skipping email notifications.")
        return
        
    try:
        # Create SMTP session
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(smtp_email, smtp_password)

        # 1. Send confirmation to customer
        customer_msg = MIMEMultipart()
        customer_msg['From'] = f"Kenaz Cafe <{smtp_email}>"
        customer_msg['To'] = reservation.email
        customer_msg['Subject'] = "Rezervasyon Talebiniz Alındı - Kenaz Cafe"
        
        customer_body = f"""Merhaba {reservation.name},
        
Kenaz Cafe için rezervasyon talebiniz başarıyla alınmıştır.
Müsaitlik durumuna göre en kısa sürede sizinle iletişime geçeceğiz veya onaylayacağız.
        
Rezervasyon Detaylarınız:
Tarih: {reservation.date}
Saat: {reservation.time}
Kişi Sayısı: {reservation.guests}
Not: {reservation.message or 'Yok'}
        
Bizi tercih ettiğiniz için teşekkür ederiz,
Kenaz Cafe
"""
        customer_msg.attach(MIMEText(customer_body, 'plain', 'utf-8'))
        server.send_message(customer_msg)
        
        # 2. Send notification to admin
        admin_email_target = os.environ.get("ADMIN_EMAIL", smtp_email)
        admin_msg = MIMEMultipart()
        admin_msg['From'] = f"Kenaz Cafe System <{smtp_email}>"
        admin_msg['To'] = admin_email_target
        admin_msg['Subject'] = f"Yeni Rezervasyon Talebi: {reservation.name}"

        admin_body = f"""Yeni bir rezervasyon talebi geldi!
        
Müşteri: {reservation.name}
E-Posta: {reservation.email}
Telefon: {reservation.phone}
        
Tarih: {reservation.date}
Saat: {reservation.time}
Kişi Sayısı: {reservation.guests}
Not: {reservation.message or 'Yok'}

Durumu güncellemek için Admin Paneli'ne giriş yapabilirsiniz.
"""
        admin_msg.attach(MIMEText(admin_body, 'plain', 'utf-8'))
        server.send_message(admin_msg)
        
        server.quit()
        logger.info(f"Email notifications sent successfully for reservation {reservation.id}")
        
    except Exception as e:
        logger.error(f"Failed to send email notifications: {e}")
