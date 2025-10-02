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
  ];

  // Duplicate the logos to create an infinite loop effect
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-20 md:py-32 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-16 md:text-5xl font-bold">
          Confían en <span className="n8n-text-gradient">nosotros</span>
        </h2>
        
        <div className="relative w-full logo-slide-effect">
          {/* Slider container */}
          <div className="relative w-full overflow-hidden">
            {/* Slider track */}
            <div className="flex w-max animate-slide">
              {duplicatedLogos.map((logo, index) => (
                <div 
                  key={`${logo.id}-${index}`} 
                  className="flex-shrink-0 px-8 py-4 flex items-center justify-center"
                  style={{ width: '200px' }} // Adjust width as needed
                >
                  <div className="relative w-full h-16">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="object-contain w-full h-full absolute inset-0"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
