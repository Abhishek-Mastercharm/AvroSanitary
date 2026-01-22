import React from 'react';

type LuxuryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  variant?: 'light' | 'dark';
};

// A high-end, soft-UI/neumorphic marble-styled button with warm amber hover glow
const LuxuryButton: React.FC<LuxuryButtonProps> = ({ href, children, className = '', ariaLabel, variant = 'light' }) => {
  const isDark = variant === 'dark';
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={[
        'group relative inline-flex items-center justify-center select-none',
        'px-6 py-3 rounded-2xl text-sm sm:text-base font-medium tracking-wide',
        'transition-all duration-300 ease-out',
        isDark ? 'text-[#1f1b14]' : 'text-[#2a261c]',
        // Soft-UI elevation refined (no harsh outer glow)
        'shadow-[inset_2px_2px_5px_rgba(255,255,255,0.65),inset_-3px_-3px_8px_rgba(0,0,0,0.06),0_10px_24px_rgba(0,0,0,0.14)]',
        // Hover: subtle amber emphasis
        'hover:shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),inset_-3px_-3px_10px_rgba(0,0,0,0.08),0_16px_32px_rgba(0,0,0,0.18)]',
        'hover:-translate-y-[1px]',
        className,
      ].join(' ')}
      style={{
        // Marble-like background with subtle gold veining (tuned for light/dark contexts)
        backgroundImage:
          (isDark
            ? 'linear-gradient(135deg, #eeeff2 0%, #e6e7ea 100%), '
            : 'linear-gradient(135deg, #f5f6f8 0%, #eceef1 100%), ') +
          'radial-gradient(120%_120%_at_20%_-10%, rgba(255,255,255,0.85) 0%, rgba(244,244,246,0.75) 40%, rgba(235,236,238,0.6) 80%, rgba(230,231,233,0.5) 100%), ' +
          'repeating-linear-gradient(35deg, rgba(212,175,55,0.10) 0 2px, transparent 3px 24px)',
        backgroundBlendMode: 'overlay, normal, normal',
        // Gradient border via background-clip technique
        border: '1.5px solid transparent',
        backgroundClip: 'padding-box, border-box, border-box',
        // Two-layer background-clip requires same number of layers, keep padding-box first
        boxShadow: '0 0 0 0.5px rgba(212,175,55,0.25) inset',
      }}
    >
      {/* Gold gradient border (overlay) */}
      <span
        className={[
          'absolute inset-0 rounded-2xl pointer-events-none',
        ].join(' ')}
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(212,175,55,0.65), rgba(212,175,55,0.25))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 1.5,
          borderRadius: 16,
        }}
        aria-hidden
      />
      {/* Inner sheen for polished look */}
      <span
        className={[
          'absolute inset-0 rounded-2xl pointer-events-none',
          'bg-[radial-gradient(120%_120%_at_20%_0%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.18)_35%,transparent_60%)]',
          'opacity-90 mix-blend-screen',
        ].join(' ')}
      />
      {/* Subtle ambient amber on hover (no harsh white glow) */}
      <span
        className={[
          'absolute -inset-[3px] rounded-3xl opacity-0 transition-opacity duration-300',
          'bg-amber-400/10 group-hover:opacity-100',
        ].join(' ')}
        style={{ filter: 'blur(6px)' }}
        aria-hidden
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </a>
  );
};

export default LuxuryButton;
