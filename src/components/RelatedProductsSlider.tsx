
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  src: string;
  alt: string;
  name: string;
}

interface RelatedProductsSliderProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  currentCategory: string;
}

const RelatedProductsSlider: React.FC<RelatedProductsSliderProps> = ({ 
  products, 
  onProductClick, 
  currentCategory 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScrollLeft = scrollContainerRef.current.scrollLeft;
      const targetScrollLeft = direction === 'left' 
        ? currentScrollLeft - scrollAmount 
        : currentScrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Related Products</h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.slice(0, 6).map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-24 cursor-pointer group"
            onClick={() => onProductClick(product)}
          >
            <div className="aspect-square overflow-hidden rounded-lg mb-2">
              <img
                src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&h=150&fit=crop&crop=center`}
                alt={product.alt}
                className="w-full h-full object-cover transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
              />
            </div>
            <p className="text-xs text-gray-600 text-center truncate">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsSlider;
