import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

const products = [
  { nameKey: 'newlaunch.oceanVenusWC', src: '/images/1 (0).webp' },
  { nameKey: 'newlaunch.novoLuxWC', src: '/images/1 (1).webp' },
  { nameKey: 'newlaunch.luxLavabo', src: '/images/1 (2).webp' },
  { nameKey: 'newlaunch.classicaSet', src: '/images/1 (3).webp' },
  { nameKey: 'newlaunch.chaiseAnglaise', src: '/images/1 (4).webp' },
  { nameKey: 'newlaunch.wuduLavabo', src: '/images/1 (5).webp' },
  { nameKey: 'newlaunch.carreaux', src: '/images/1 (6).webp' },
  { nameKey: 'newlaunch.cpvcTuyaux', src: '/images/1 (7).webp' },
];

const NewLaunchSection = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [enlarged, setEnlarged] = useState<null | { src: string; alt: string }>(null);

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
    <>
      {/* Overlay for enlarged image rendered in portal for fullscreen effect */}
      {enlarged && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center transition-all">
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={enlarged.src}
              alt={enlarged.alt}
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white object-contain"
            />
            <button
              onClick={() => setEnlarged(null)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 z-10"
              aria-label="Close enlarged image"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>,
        document.body
      )}
      <section
        id="new-launch"
        data-section="new-launch"
        ref={sectionRef}
        className={`fade-in-row py-8 px-0 sm:px-4 bg-slate-50 relative overflow-hidden transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="relative w-full overflow-x-hidden scrollbar-hide"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className="flex items-end gap-6"
              style={{
                width: `${products.length * 2 * 160 + products.length * 2 * 24}px`, // 160px image + 24px gap
                animation: `marquee 24s linear infinite`,
                animationDirection: hovered ? 'reverse' : 'normal',
              }}
            >
              {[...products, ...products].map((product, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center w-40 min-w-40" // 160px fixed width
                >
                  <div
                    className="w-40 h-40 bg-white rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer"
                    onClick={() => setEnlarged({ src: product.src, alt: t(product.nameKey) })}
                  >
                    <img
                      src={product.src}
                      alt={t(product.nameKey)}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-2 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {t(product.nameKey)}
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
    </>
  );
};

export default NewLaunchSection; 