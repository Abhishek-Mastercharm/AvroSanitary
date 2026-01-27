/**
 * OptimizedImage Component
 * 
 * A performance-optimized image component that implements:
 * - Lazy loading with native browser support (loading="lazy")
 * - Blur placeholder effect while image loads
 * - Skeleton loader fallback
 * - Explicit width/height to prevent layout shift (CLS)
 * - Priority loading for above-the-fold images (fetchpriority="high")
 * - WebP format support with fallback
 * - Error handling with fallback images
 * 
 * @usage
 * <OptimizedImage
 *   src="/images/hero.webp"
 *   alt="Hero image"
 *   width={800}
 *   height={600}
 *   priority={true} // For above-the-fold images
 * />
 */

import React, { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /** Image source URL - preferably WebP format */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Explicit width to prevent layout shift */
  width?: number | string;
  /** Explicit height to prevent layout shift */
  height?: number | string;
  /** Fallback image if primary fails to load */
  fallbackSrc?: string;
  /** Priority loading for above-the-fold images (disables lazy loading) */
  priority?: boolean;
  /** Custom className for the image */
  className?: string;
  /** Placeholder type: 'blur' shows a blurred version, 'skeleton' shows animated skeleton */
  placeholder?: 'blur' | 'skeleton' | 'none';
  /** Low quality blur image data URL (optional - uses CSS blur if not provided) */
  blurDataURL?: string;
  /** Container className for the wrapper div */
  containerClassName?: string;
  /** Callback when image loads successfully */
  onLoadComplete?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  priority = false,
  className = '',
  placeholder = 'blur',
  blurDataURL,
  containerClassName = '',
  onLoadComplete,
  style,
  ...rest
}) => {
  // Track loading and error states
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setCurrentSrc(src);
  }, [src]);

  // Handle successful image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  // Handle image load error - try fallback
  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Convert src to WebP if not already (assumes WebP versions exist)
  const getWebPSrc = (imageSrc: string): string => {
    // If already WebP, return as-is
    if (imageSrc.endsWith('.webp')) return imageSrc;
    
    // If it's an external URL (like Unsplash), don't modify
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }
    
    // For local images, try WebP version first
    // This assumes you have .webp versions available
    const webpSrc = imageSrc.replace(/\.(jpe?g|png)$/i, '.webp');
    return webpSrc;
  };

  // Determine the actual src to use
  const imageSrc = getWebPSrc(currentSrc);

  // Compute aspect ratio for placeholder sizing
  const aspectRatio = width && height 
    ? `${width} / ${height}` 
    : undefined;

  return (
    <div
      className={`optimized-image-container ${containerClassName}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: width ?? 'auto',
        height: height ?? 'auto',
        aspectRatio: aspectRatio,
      }}
    >
      {/* Skeleton/Blur Placeholder - shown until image loads */}
      {!isLoaded && placeholder !== 'none' && (
        <div
          className={`optimized-image-placeholder ${placeholder === 'skeleton' ? 'skeleton-loader' : 'blur-placeholder'}`}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            ...(placeholder === 'blur' && blurDataURL ? {
              backgroundImage: `url(${blurDataURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
              transform: 'scale(1.1)', // Prevent blur edges from showing
            } : {}),
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        // Lazy loading - disabled for priority (above-the-fold) images
        loading={priority ? 'eager' : 'lazy'}
        // Decode async to prevent blocking main thread
        decoding={priority ? 'sync' : 'async'}
        // Fetch priority for critical images (modern browsers)
        // @ts-ignore - fetchpriority is a valid attribute but not in React types yet
        fetchpriority={priority ? 'high' : 'auto'}
        className={`optimized-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
        style={{
          ...style,
          // Smooth transition for loading effect
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          // Ensure image fills container
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: (style?.objectFit as any) || 'cover',
        }}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </div>
  );
};

export default OptimizedImage;

/**
 * Hook for preloading critical images
 * Use this to preload hero/above-the-fold images without blocking render
 * 
 * @usage
 * usePreloadImages(['/images/hero.webp', '/images/banner.webp']);
 */
export const usePreloadImages = (imageSrcs: string[]) => {
  useEffect(() => {
    imageSrcs.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      // Set fetchpriority for critical images
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
      
      // Cleanup on unmount
      return () => {
        document.head.removeChild(link);
      };
    });
  }, [imageSrcs]);
};
