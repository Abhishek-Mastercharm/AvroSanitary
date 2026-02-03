import React, { useEffect, useRef } from 'react';

interface LuxuryBackgroundProps {
    isMobile: boolean;
}

const LuxuryBackground: React.FC<LuxuryBackgroundProps> = ({ isMobile }) => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (bgRef.current) {
                bgRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
                bgRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (bgRef.current && e.touches.length > 0) {
                const touch = e.touches[0];
                bgRef.current.style.setProperty('--mouse-x', `${touch.clientX}px`);
                bgRef.current.style.setProperty('--mouse-y', `${touch.clientY}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div
            ref={bgRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%'
            } as React.CSSProperties}
        >
            {/* Layer 1: Subtle Stone Grain Texture */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")`,
                    backgroundRepeat: 'repeat'
                }}
            />

            {/* Layer 2: Base Gray Grid (Stone Block Unit) */}
            <div
                className="absolute inset-0 opacity-[0.008]"
                style={{
                    backgroundImage: `linear-gradient(to right, #1a1a1c 1px, transparent 1px), linear-gradient(to bottom, #1a1a1c 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Layer 3: Interactive Designer Grid (Sharp Gray Strokes) - All devices */}
            <div
                className="absolute inset-0 transition-opacity duration-500 will-change-[mask-image]"
                style={{
                    backgroundImage: `linear-gradient(to right, #4a4a4c 1.2px, transparent 1.2px), linear-gradient(to bottom, #4a4a4c 1.2px, transparent 1.2px)`,
                    backgroundSize: isMobile ? '80px 80px' : '100px 100px',
                    WebkitMaskImage: `radial-gradient(${isMobile ? '350px' : '450px'} circle at var(--mouse-x) var(--mouse-y), black 30%, transparent 100%)`,
                    maskImage: `radial-gradient(${isMobile ? '350px' : '450px'} circle at var(--mouse-x) var(--mouse-y), black 30%, transparent 100%)`,
                    opacity: isMobile ? 0.12 : 0.18
                }}
            />

            {/* Layer 4: Minimal Pointer Spotlight - All devices */}
            <div
                className="absolute inset-0 will-change-[background]"
                style={{
                    background: `radial-gradient(${isMobile ? '400px' : '600px'} circle at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.012), transparent 70%)`,
                }}
            />
        </div>
    );
};

export default React.memo(LuxuryBackground);
