import React, { useEffect, useRef } from 'react';

interface LuxuryBackgroundProps {
    isMobile: boolean;
}

const LuxuryBackground: React.FC<LuxuryBackgroundProps> = ({ isMobile }) => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (bgRef.current) {
                bgRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
                bgRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile]);

    if (isMobile) return null;

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

            {/* Layer 3: Interactive Designer Grid (Sharp Gray Strokes) */}
            <div
                className="absolute inset-0 transition-opacity duration-500 will-change-[mask-image]"
                style={{
                    backgroundImage: `linear-gradient(to right, #4a4a4c 1.2px, transparent 1.2px), linear-gradient(to bottom, #4a4a4c 1.2px, transparent 1.2px)`,
                    backgroundSize: '100px 100px',
                    WebkitMaskImage: `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), black 30%, transparent 100%)`,
                    maskImage: `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), black 30%, transparent 100%)`,
                    opacity: 0.18
                }}
            />

            {/* Layer 4: Minimal Pointer Spotlight */}
            <div
                className="absolute inset-0 will-change-[background]"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.012), transparent 70%)`,
                }}
            />
        </div>
    );
};

export default React.memo(LuxuryBackground);
