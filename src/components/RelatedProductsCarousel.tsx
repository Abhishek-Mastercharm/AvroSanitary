
import React from 'react';
import { ZoomIn } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Product {
  id: number;
  src: string;
  alt: string;
  name: string;
}

interface RelatedProductsCarouselProps {
  products: Product[];
  currentProduct: Product | null;
  onProductSelect: (product: Product) => void;
  onImageClick: (src: string) => void;
  currentCategory: string;
}

const RelatedProductsCarousel: React.FC<RelatedProductsCarouselProps> = ({ 
  products, 
  currentProduct,
  onProductSelect, 
  onImageClick,
  currentCategory 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col">
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Discover Products</h3>
            <p className="text-sm text-gray-600 mt-1">Explore our {currentCategory.toLowerCase()} collection</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 px-6 pb-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
                <div className="group h-full">
                  <div
                    className={`aspect-square overflow-hidden rounded-lg mb-3 cursor-pointer relative transition-all duration-300 ${
                      currentProduct?.id === product.id 
                        ? 'ring-2  shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => onProductSelect(product)}
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center`}
                      alt={product.alt}
                      className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                    />
                    
                    {/* Hover overlay with zoom icon */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onImageClick(product.src);
                          }}
                          className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200"
                        >
                          <ZoomIn className="w-4 h-4 text-gray-800" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-900 text-center truncate">
                    {product.name}
                  </h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;
