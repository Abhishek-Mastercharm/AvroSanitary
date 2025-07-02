import React from 'react';
import { ZoomIn } from 'lucide-react';

interface Product {
  id: number;
  src: string;
  alt: string;
  name: string;
}

interface MainProductDisplayProps {
  product: Product;
  onImageClick: (src: string) => void;
}

const MainProductDisplay: React.FC<MainProductDisplayProps> = ({ product, onImageClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center max-w-xs mx-auto">
      <div 
        className="overflow-hidden cursor-pointer group relative w-full max-w-xs max-h-[300px] aspect-square mx-auto"
        onClick={() => onImageClick(product.src)}
      >
        <img
          src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop&crop=center`}
          alt={product.alt}
          className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop&crop=center`;
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ZoomIn className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">Premium Quality Product with exceptional features and durability.</p>
      </div>
    </div>
  );
};

export default MainProductDisplay;
