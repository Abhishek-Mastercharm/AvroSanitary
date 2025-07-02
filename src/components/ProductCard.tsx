
import React from 'react';
import { ZoomIn } from 'lucide-react';

interface Product {
  id: number;
  src: string;
  alt: string;
  name: string;
}

interface ProductCardProps {
  product: Product;
  onImageClick: (src: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div 
        className="aspect-square overflow-hidden cursor-pointer group relative"
        onClick={() => onImageClick(product.src)}
      >
        <img
          src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center`}
          alt={product.alt}
          className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center`;
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ZoomIn className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600">Premium Quality Product</p>
      </div>
    </div>
  );
};

export default ProductCard;
