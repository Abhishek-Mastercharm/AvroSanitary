import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MainProductDisplay from './MainProductDisplay';
import RelatedProductsCarousel from './RelatedProductsCarousel';

interface Product {
  id: number;
  src: string;
  alt: string;
  name: string;
}

interface ProductGalleryProps {
  category: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ category }) => {
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Mock product data - in real app, this would come from an API
  const getProductImages = (category: string): Product[] => {
    const basePath = '/images';
    
    switch (category) {
      case 'SanitaryWare':
        return Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          src: `${basePath}/sanitaryware/product-${i + 1}.jpg`,
          alt: `Sanitary Ware Product ${i + 1}`,
          name: `Premium Sanitaryware ${i + 1}`
        }));
      case 'Tiles':
        return Array.from({ length: 6 }, (_, i) => ({
          id: i + 1,
          src: `${basePath}/tiles/tile-${i + 1}.jpg`,
          alt: `Tile Product ${i + 1}`,
          name: `Designer Tile ${i + 1}`
        }));
      case 'Adhesive':
        return Array.from({ length: 4 }, (_, i) => ({
          id: i + 1,
          src: `${basePath}/adhesive/adhesive-${i + 1}.jpg`,
          alt: `Adhesive Product ${i + 1}`,
          name: `Premium Adhesive ${i + 1}`
        }));
      case 'Machinery':
        return Array.from({ length: 3 }, (_, i) => ({
          id: i + 1,
          src: `${basePath}/machinery/machine-${i + 1}.jpg`,
          alt: `Machinery Product ${i + 1}`,
          name: `Industrial Machine ${i + 1}`
        }));
      default:
        return [];
    }
  };

  const products = getProductImages(category);

  useEffect(() => {
    if (products.length > 0) {
      setCurrentProduct(products[0]);
    }
  }, [products]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-gallery-item',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, [category]);

  const handleProductSelect = (product: Product) => {
    setCurrentProduct(product);
  };

  return (
    <div ref={galleryRef} className="relative">
      <div className="grid lg:grid-cols-2 items-stretch">
        {/* Main Product Display - Left Side */}
        <div className="product-gallery-item">
          {currentProduct && (
            <MainProductDisplay 
              product={currentProduct}
              onImageClick={setSelectedImage}
            />
          )}
        </div>

        {/* Related Products Carousel - Right Side */}
        <div className="product-gallery-item">
          <RelatedProductsCarousel 
            products={products}
            currentProduct={currentProduct}
            onProductSelect={handleProductSelect}
            onImageClick={setSelectedImage}
            currentCategory={category}
          />
        </div>
      </div>

      {/* Modal for enlarged view */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged product view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
