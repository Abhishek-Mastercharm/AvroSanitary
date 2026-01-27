import React from 'react';

// Card background image - Unsplash tile/marble image
// Change to local path if needed: '/images/tile-card-bg.jpg'
const CARD_BG_IMAGE = '/TilesImages/tileHeroImg.png';

const PremiumTilesCTA: React.FC = () => {
  const [clicked, setClicked] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClicked(true);
    // brief pressed/animate, then navigate same-tab
    setTimeout(() => {
      window.location.href = '/tiles';
    }, 620);
    setTimeout(() => setClicked(false), 1200);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
    >
        
      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        {/* Rounded luxury box with outline and balanced margins */}
        <div
          className="relative rounded-3xl border-2 px-6 sm:px-8 py-8 sm:py-10 md:py-12 overflow-hidden"
          style={{
            // Mustard yellow border matching button
            borderColor: '#d4af37',
            borderWidth: '3px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Background image layer */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${CARD_BG_IMAGE}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Dark overlay like tiles hero section */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(34, 34, 36, 0.75)',
            }}
          />
          {/* Content - positioned above overlay */}
          <div className="relative z-10 text-center">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{
                // Mustard yellow matching button
                color: '#d4af37',
                letterSpacing: '0.01em',
                fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Tiles | Marbels | Stones
            </h2>
          </div>

          {/* CTA button */}
          <div className="relative z-10 mt-10 sm:mt-12 flex items-center justify-center">
            <div className={`relative group ${clicked ? 'cta-clicked' : ''}`}>
              <button
                onClick={handleClick}
                className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold tracking-wide transition-all duration-300"
                style={{
                  color: '#1a1611',
                  // Radial gradient mustard yellow - same style as before
                  backgroundImage: clicked 
                    ? 'radial-gradient(circle at center, #c9a227 0%, #d4af37 70%, #e6c34d 100%)'
                    : 'radial-gradient(circle at center, #d4af37 0%, #e6c34d 70%, #f0d861 100%)',
                  border: '2px solid #c9a227',
                  boxShadow: clicked
                    ? 'inset 0 2px 8px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.3), 0 0 0 4px rgba(212,175,55,0.2)'
                    : 'inset 0 2px 8px rgba(255,255,255,0.3), 0 14px 32px rgba(0,0,0,0.25)',
                  transform: clicked ? 'translateY(4px) scale(0.98)' : 'translateY(0)',
                  textShadow: '0 1px 0 rgba(255,255,255,0.3)',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(4px) scale(0.98)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2), 0 0 0 4px rgba(212,175,55,0.2)';
                }}
                onMouseUp={(e) => {
                  if (!clicked) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,0.3), 0 14px 32px rgba(0,0,0,0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!clicked) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,0.3), 0 14px 32px rgba(0,0,0,0.25)';
                  }
                }}
              >
                Range of Tiles
                {/* Arrow icon */}
                <svg 
                  className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Button hover styles */}
      <style>{`
        .group:hover button:not(.cta-clicked) {
          box-shadow: inset 0 2px 12px rgba(0,0,0,0.4), 0 18px 42px rgba(0,0,0,0.35), 0 0 0 4px rgba(212,175,55,0.3) !important;
          transform: translateY(-3px) !important;
          background-image: radial-gradient(circle at center, #1a1611 0%, #2a261c 65%, #3d372e 100%) !important;
          color: #d4af37 !important;
        }
        .cta-clicked button {
          color: #1a1611 !important;
        }
      `}</style>
    </section>
  );
};

export default PremiumTilesCTA;