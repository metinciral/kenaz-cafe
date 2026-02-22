import React from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

export const HeroSection = () => {
  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1648808694138-6706c5efc80a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzcxNzcyNjUwfDA&ixlib=rb-4.1.0&q=85"
          alt="Kenaz Cafe Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="mb-6 inline-block">
          <div className="text-sm font-medium tracking-[0.3em] uppercase mb-4 text-white/90">
            Nilüfer, Bursa
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
          Kenaz Cafe
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 font-light text-white/95 max-w-2xl mx-auto leading-relaxed">
          Aydınlanmanın ve Yaratıcılığın Buluşma Noktası
        </p>
        
        <p className="text-base md:text-lg mb-12 text-white/85 max-w-xl mx-auto leading-relaxed">
          Home office çalışanları için tasarlanmış, huzurlu ve ilham verici bir alan
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={scrollToReservation}
            size="lg"
            className="bg-[#007367] hover:bg-[#005a52] text-white px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Rezervasyon Yap
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg transition-all duration-300"
          >
            Keşfet
          </Button>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};
