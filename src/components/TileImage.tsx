// components/TileImage.tsx
import React, { useState } from 'react';
import { TileImg } from '../data/TileData';

interface TileImageProps {
  img: TileImg;
  className: string;
}

const TileImage: React.FC<TileImageProps> = ({ img, className }) => {
  const [src, setSrc] = useState(img.src);

  return (
    <img
      src={src}
      alt={img.alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (src !== img.fallback) setSrc(img.fallback);
      }}
    />
  );
};

export default TileImage;