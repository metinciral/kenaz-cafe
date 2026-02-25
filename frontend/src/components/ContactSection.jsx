import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, Clock } from 'lucide-react';
import { cafeInfo } from '../utils/mockData';
import { Button } from './ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const ContactSection = () => {
  const [contact, setContact] = useState({
    address: cafeInfo.contact.address,
    phone: cafeInfo.contact.phone,
    email: cafeInfo.contact.email,
  });
  const [hours, setHours] = useState({
    weekdays: cafeInfo.hours.weekdays,
    weekend: cafeInfo.hours.weekend,
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/content/contact`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setContact(prev => ({ ...prev, ...data })); })
      .catch(() => {});

    fetch(`${BACKEND_URL}/api/content/hours`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setHours(prev => ({ ...prev, ...data })); })
      .catch(() => {});
  }, []);

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
            Bize Ulaşın
          </h2>
          <p className="text-lg text-gray-600">
            Sorularınız için her zaman buradayız
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#007367]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#007367]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 text-gray-900">Adres</h3>
                <p className="text-gray-600">{contact.address}</p>
                <Button
                  variant="link"
                  className="text-[#007367] hover:text-[#005a52] p-0 h-auto mt-2"
                  onClick={() => window.open(cafeInfo.contact.googleMaps, '_blank')}
                >
                  Google Maps'te Görüntüle →
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#007367]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#007367]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 text-gray-900">Telefon</h3>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#007367]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[#007367]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 text-gray-900">E-posta</h3>
                <p className="text-gray-600">{contact.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#007367]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Instagram className="w-6 h-6 text-[#007367]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 text-gray-900">Instagram</h3>
                <Button
                  variant="link"
                  className="text-[#007367] hover:text-[#005a52] p-0 h-auto"
                  onClick={() => window.open(cafeInfo.contact.instagram, '_blank')}
                >
                  @kenazcafe
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#007367]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#007367]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 text-gray-900">Çalışma Saatleri</h3>
                <p className="text-gray-600">Hafta İçi: {hours.weekdays}</p>
                <p className="text-gray-600">Hafta Sonu: {hours.weekend}</p>
                {hours.note && <p className="text-gray-500 text-sm mt-1">{hours.note}</p>}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[500px] rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.076299364858!2d28.9660435!3d40.2240551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca17df2bcbfea1%3A0x7dd221015740121f!2sKenaz%20Cafe%20-%20Nil%C3%BCfer!5e0!3m2!1str!2str!4v1645000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kenaz Cafe Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
