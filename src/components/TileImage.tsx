/**
 * TileImage Component - Optimized for Performance
 * 
 * This component handles tile images with:
 * - Native lazy loading (loading="lazy")
 * - Blur placeholder effect while loading
 * - Explicit dimensions to prevent layout shift
 * - Error handling with fallback images
 * - Smooth fade-in transition when loaded
 */

import React, { useState, useEffect, useRef } from 'react';
import { TileImg } from '@/data/TileData';

interface TileImageProps {
  img: TileImg;
  className: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
}

const TileImage: React.FC<TileImageProps> = ({
  img,
  className,
  width,
  height,
  priority = false
}) => {
  const [src, setSrc] = useState(priority ? img.src : '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSrc(img.src);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [img.src, priority]);

  // Reset state when img prop changes
  useEffect(() => {
    if (priority) setSrc(img.src);
    setIsLoaded(false);
    setHasError(false);
  }, [img.src, priority]);

  const handleLoad = () => setIsLoaded(true);

  const handleError = () => {
    if (!hasError && src !== img.fallback) {
      setSrc(img.fallback);
      setHasError(true);
    }
  };

  return (
    <div
      className="tile-image-container relative overflow-hidden transform-gpu"
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        backgroundColor: '#f8f8f8'
      }}
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#f5f5f7] animate-pulse z-10"
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        src={src || undefined}
        alt={img.alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-500 will-change-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default React.memo(TileImage);
