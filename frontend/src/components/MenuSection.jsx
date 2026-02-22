import React from 'react';
import { Button } from './ui/button';
import { ExternalLink, Coffee, Sandwich, Croissant, Cake } from 'lucide-react';
import { cafeInfo } from '../utils/mockData';

const menuIconMap = {
  0: Coffee,
  1: Sandwich,
  2: Croissant,
  3: Cake
};

export const MenuSection = () => {
  return (
    <section id="menu" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
              Menümüz
            </h2>
            <div className="w-16 h-1 bg-[#007367] mb-8"></div>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Lezzetli kahve çeşitlerimizin yanı sıra özenle hazırladığımız sandviçler, taptaze kruvasanlar ve nefis tatlılarla dolu menümüzle, her anınıza eşlik etmeye hazırız.
            </p>

            <div className="space-y-4 mb-10">
              {cafeInfo.menuItems.map((item, index) => {
                const Icon = menuIconMap[index];
                return (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <div className="w-12 h-12 bg-[#007367]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#007367]" />
                    </div>
                    <p className="text-gray-800 font-medium">{item}</p>
                  </div>
                );
              })}
            </div>

            <Button 
              className="bg-[#007367] hover:bg-[#005a52] text-white px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
              onClick={() => window.open(cafeInfo.contact.menuUrl, '_blank')}
            >
              Tam Menüyü Görüntüle
              <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

          {/* Right Column - Image */}
          <div>
            <img 
              src="https://images.unsplash.com/photo-1675125530909-15213f01a9e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwYXN0cmllcyUyMGNyb2lzc2FudHxlbnwwfHx8fDE3NzE3NzI2NTV8MA&ixlib=rb-4.1.0&q=85"
              alt="Coffee and Pastries"
              className="w-full h-[550px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
