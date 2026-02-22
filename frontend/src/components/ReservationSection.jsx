import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Calendar, Clock, Users } from 'lucide-react';
import { submitReservation } from '../utils/mockData';
import { toast } from 'sonner';

export const ReservationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitReservation(formData);
      if (result.success) {
        toast.success('Rezervasyonunuz başarıyla alındı!', {
          description: 'En kısa sürede size dönüş yapacağız.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '',
          message: ''
        });
      } else {
        toast.error('Bir hata oluştu', {
          description: result.message || 'Lütfen daha sonra tekrar deneyin.'
        });
      }
    } catch (error) {
      toast.error('Bir hata oluştu', {
        description: 'Lütfen daha sonra tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
            Rezervasyon
          </h2>
          <p className="text-lg text-gray-600">
            Yerinizi ayırtın, huzurlu çalışma ortamınızı garantileyin
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınız ve soyadınız"
                  className="border-gray-300 focus:border-[#007367] focus:ring-[#007367]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@email.com"
                  className="border-gray-300 focus:border-[#007367] focus:ring-[#007367]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+90 XXX XXX XX XX"
                className="border-gray-300 focus:border-[#007367] focus:ring-[#007367]"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tarih *
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#007367] focus:ring-[#007367]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Saat *
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#007367] focus:ring-[#007367]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Kişi Sayısı *
                </Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="20"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="1"
                  className="border-gray-300 focus:border-[#007367] focus:ring-[#007367]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Özel İstek (Opsiyonel)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
                rows={4}
                className="border-gray-300 focus:border-[#007367] focus:ring-[#007367] resize-none"
              />
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#007367] hover:bg-[#005a52] text-white py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Rezervasyon Yap'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
