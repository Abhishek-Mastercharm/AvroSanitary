import React, { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { useTranslation } from 'react-i18next';

const products = [
  { name: 'newlaunch.modernSink', src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=300&fit=crop&crop=center' },
  { name: 'newlaunch.elegantWC', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=center' },
  { name: 'newlaunch.designerBasin', src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=300&fit=crop&crop=center' },
  { name: 'newlaunch.luxuryTap', src: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=300&h=300&fit=crop&crop=center' },
  { name: 'newlaunch.compactUrinal', src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=300&fit=crop&crop=center' },
  { name: 'newlaunch.classicMonoblock', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=center' },
  { name: 'newlaunch.premiumShower', src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=300&fit=crop&crop=center' },
];

const NewLaunchSection = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // Animation speed and direction
  const animationDuration = hovered ? 20 : 8; // seconds
  const direction = hovered ? 'reverse' : 'normal';

  return (
    <section
      id="new-launch"
      data-section="new-launch"
      ref={sectionRef}
      className={`fade-in-row py-8 px-4 bg-slate-50 relative overflow-hidden transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoalBlack mb-2 sm:mb-4 md:mb-6">
            {t('newlaunch.title')}
          </h2>
          <div className="mx-auto mb-2 sm:mb-4 md:mb-6 w-20 sm:w-28 md:w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoalBlack max-w-2xl mx-auto">
            {t('newlaunch.desc')}
          </p>
        </div>
        <div
          className="relative w-full overflow-x-hidden scrollbar-hide"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className={`flex items-end gap-6 transition-transform duration-500`}
            style={{
              animation: `marquee ${animationDuration}s linear infinite`,
              animationDirection: direction,
            }}
          >
            {products.concat(products).map((product, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[216px]">
                <AspectRatio ratio={1} className="w-40 h-40 bg-white rounded-lg overflow-hidden flex items-center justify-center group">
                  <img
                    src={product.src}
                    alt={t(product.name)}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                <span className="-mt-8 text-base sm:text-lg md:text-xl font-medium text-charcoalBlack item-center w-full truncate">
                  {t(product.name)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default NewLaunchSection; 