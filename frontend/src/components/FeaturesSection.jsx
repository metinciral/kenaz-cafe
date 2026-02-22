import React from 'react';
import { Wifi, Plug, Sun, VolumeX } from 'lucide-react';
import { cafeInfo } from '../utils/mockData';

const iconMap = {
  wifi: Wifi,
  plug: Plug,
  sun: Sun,
  'volume-x': VolumeX
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
            Çalışma Ortamınız
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İçeriyi her alana priz koyarak ve yüksek bir internet ağı ile destekleyerek çalışanlara yönelik hazırladık
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cafeInfo.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-[#007367]/10 rounded-full group-hover:bg-[#007367] transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#007367] group-hover:text-white transition-all duration-300" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Workspace Image */}
        <div className="mt-16">
          <img 
            src="https://images.pexels.com/photos/31723973/pexels-photo-31723973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Cozy workspace"
            className="w-full h-[400px] object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};
