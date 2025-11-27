import React from 'react';
import { cn } from "@/lib/utils"

type LogoItem = {
  id: number;
  alt: string;
  // Using any for now since we'll replace with actual images later
  src: string;
};

const TrustedBySection = () => {
  // Placeholder data - replace with actual logo imports
  const logos: LogoItem[] = [
    { id: 1, alt: 'Greenpeace', src: '/fonts/greenpeace-blanco.png' },
    { id: 2, alt: 'Galicia Wine Academy', src: '/fonts/galicia_wine_academy_blanco.png' },
    { id: 3, alt: 'Fundación Ida', src: '/fonts/fundacionida-logo-blanco.png' },
    { id: 4, alt: 'Penedo Borges', src: '/fonts/pb-logo-blanco.png' },
    { id: 5, alt: 'Pelleriti Priore', src: '/fonts/pelleritipriore-logo-blanco.png' },
    { id: 6, alt: 'Fauna Brava', src: '/fonts/fauna-blanco.png' },
    { id: 7, alt: 'Asociación Petís', src: '/fonts/petis-blanco.png' },
    { id: 8, alt: 'Verssalo', src: '/fonts/verssalo_white.png' },
    { id: 9, alt: 'KriyaYogaBabaji', src: '/fonts/kriyayogalogo.png' },
  ];

  // Duplicate the logos to create an infinite loop effect
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-br from-muted/30 to-background overflow-hidden relative">
      {/* Decorative gradient - TONO CÁLIDO */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

      {/* Título centrado con container */}
      <div className="container mx-auto px-4 relative z-10 mb-12 md:mb-16 lg:mb-24">
        <h2 className="text-3xl sm:text-4xl text-center md:text-5xl font-bold text-foreground">
          Trabajamos <span className="n8n-text-gradient">con</span>
        </h2>
      </div>

      {/* Slider a todo ancho sin container */}
      <div className="relative w-full logo-slide-effect">
        {/* Slider container */}
        <div className="relative w-full overflow-hidden">
          {/* Slider track */}
          <div className="flex w-max animate-slide">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="logo-slide-item flex-shrink-0 px-4 md:px-6 lg:px-8 py-4 md:py-6 flex items-center justify-center"
              >
                <div className="relative w-full h-12 md:h-16 lg:h-20">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={`object-contain w-full h-full absolute inset-0 opacity-60 hover:opacity-100 transition-opacity ${logo.id === 9 ? '' : 'grayscale hover:grayscale-0'}`}
                    style={{
                      objectFit: 'contain',
                      filter: logo.id === 9
                        ? 'brightness(0.8)'
                        : 'invert(1) brightness(0.2) sepia(0.1) hue-rotate(180deg)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
