import React from 'react';
import { cafeInfo } from '../utils/mockData';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1765648763912-03115da05d07?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwd29ya3NwYWNlJTIwbGFwdG9wfGVufDB8fHx8MTc3MTc3MjY0NHww&ixlib=rb-4.1.0&q=85"
                alt="Workspace at Kenaz"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#007367] text-white p-8 rounded-lg shadow-xl">
                <p className="text-sm font-medium mb-1">Home Office</p>
                <p className="text-3xl font-light">Dostu</p>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
              Kenaz'ın Anlamı
            </h2>
            <div className="w-16 h-1 bg-[#007367] mb-8"></div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Kenaz, <span className="font-medium text-[#007367]">İskandinav mitolojisinde aydınlanmanın, bilgiye açılan kapıların ve yaratıcı enerjinin simgesidir.</span> Biz de Kenaz Cafe olarak, bu mistik enerjiyi her fincana taşıyor ve konforlu bir ortamda kahve keyfi yaşatıyoruz.
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Şehir hayatının yoğun temposunda, sakin bir mola vermek ya da yaratıcı fikirlerinize odaklanmak için aradığınız huzurlu atmosferi burada bulabilirsiniz.
            </p>

            <div className="space-y-3">
              {cafeInfo.workspaceHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#007367] rounded-full"></div>
                  <p className="text-gray-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
