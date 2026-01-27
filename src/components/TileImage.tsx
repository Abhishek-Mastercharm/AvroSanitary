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

import React, { useState, useEffect } from 'react';
import { TileImg } from '@/data/TileData';

interface TileImageProps {
  img: TileImg;
  className: string;
  /** Explicit width for layout stability */
  width?: number | string;
  /** Explicit height for layout stability */
  height?: number | string;
  /** Priority loading for above-the-fold tiles */
  priority?: boolean;
}

const TileImage: React.FC<TileImageProps> = ({ 
  img, 
  className,
  width,
  height,
  priority = false
}) => {
  const [src, setSrc] = useState(img.src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset state when img prop changes
  useEffect(() => {
    setSrc(img.src);
    setIsLoaded(false);
    setHasError(false);
  }, [img.src]);

  // Handle image load complete
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle error - try fallback image
  const handleError = () => {
    if (!hasError && src !== img.fallback) {
      setSrc(img.fallback);
      setHasError(true);
    }
  };

  return (
    <div 
      className="tile-image-container relative overflow-hidden"
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
      }}
    >
      {/* Blur placeholder shown until image loads */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 blur-placeholder z-10"
          aria-hidden="true"
        />
      )}
      
      {/* Main tile image with lazy loading */}
      <img
        src={src}
        alt={img.alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // @ts-ignore - fetchpriority is valid but not in React types
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default TileImage;