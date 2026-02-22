import React from 'react';
import { Instagram, MapPin } from 'lucide-react';
import { cafeInfo } from '../utils/mockData';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light mb-4">Kenaz Cafe</h3>
            <p className="text-gray-400 leading-relaxed">
              Aydınlanmanın ve yaratıcılığın buluşma noktası. Home office çalışanları için tasarlanmış huzurlu mekan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-[#007367] transition-colors duration-200"
                >
                  Hakkımızda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-[#007367] transition-colors duration-200"
                >
                  Menü
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-[#007367] transition-colors duration-200"
                >
                  Rezervasyon
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-[#007367] transition-colors duration-200"
                >
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{cafeInfo.contact.address}</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a 
                  href={cafeInfo.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#007367] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={cafeInfo.contact.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#007367] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Kenaz Cafe. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};
