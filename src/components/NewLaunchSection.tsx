import React, { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';

const products = [
  { name: 'Modern Sink', src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=300&fit=crop&crop=center' },
  { name: 'Elegant WC', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=center' },
  { name: 'Designer Basin', src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=300&fit=crop&crop=center' },
  { name: 'Luxury Tap', src: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=300&h=300&fit=crop&crop=center' },
  { name: 'Compact Urinal', src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=300&fit=crop&crop=center' },
  { name: 'Classic Monoblock', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=center' },
  { name: 'Premium Shower', src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=300&fit=crop&crop=center' },
];

const NewLaunchSection = () => {
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
      className={`fade-in-row py-16 px-4 bg-white relative overflow-hidden transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-charcoalBlack mb-2">
            Newly <span className="text-goldenBronze">Launching Products</span>
          </h2>
          <div className="mx-auto mb-4 w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
          <p className="text-xl text-charcoalBlack max-w-2xl mx-auto">
            Discover our latest arrivals in premium products
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
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                <span className="-mt-8 text-base font-medium text-charcoalBlack item-center w-full truncate">
                  {product.name}
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