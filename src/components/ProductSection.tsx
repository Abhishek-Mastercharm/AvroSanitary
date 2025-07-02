import React, { useState } from 'react';
import RelatedProductsCarousel from './RelatedProductsCarousel';

interface Product {
  id: number;
  src: string;
  alt: string;
  name: string;
}

const categories = [
  {
    id: 'wc',
    name: 'WC',
    mainProduct: {
      id: 1,
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center',
      alt: 'Premium WC',
      name: 'Premium WC'
    },
    products: [
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'WC Model 2',
        name: 'WC Model 2'
      },
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'WC Model 3',
        name: 'WC Model 3'
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'WC Model 4',
        name: 'WC Model 4'
      },
      {
        id: 5,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'WC Model 5',
        name: 'WC Model 5'
      }
    ]
  },
  {
    id: 'wc-monoblock',
    name: 'WC Monoblock',
    mainProduct: {
      id: 6,
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center',
      alt: 'Premium WC Monoblock',
      name: 'Premium WC Monoblock'
    },
    products: [
      {
        id: 7,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Monoblock Model 2',
        name: 'Monoblock Model 2'
      },
      {
        id: 8,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Monoblock Model 3',
        name: 'Monoblock Model 3'
      },
      {
        id: 9,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Monoblock Model 4',
        name: 'Monoblock Model 4'
      },
      {
        id: 10,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Monoblock Model 5',
        name: 'Monoblock Model 5'
      }
    ]
  },
  {
    id: 'wash-basin',
    name: 'Wash Basin',
    mainProduct: {
      id: 11,
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center',
      alt: 'Premium Wash Basin',
      name: 'Premium Wash Basin'
    },
    products: [
      {
        id: 12,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Wash Basin Model 2',
        name: 'Wash Basin Model 2'
      },
      {
        id: 13,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Wash Basin Model 3',
        name: 'Wash Basin Model 3'
      },
      {
        id: 14,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Wash Basin Model 4',
        name: 'Wash Basin Model 4'
      },
      {
        id: 15,
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center',
        alt: 'Wash Basin Model 5',
        name: 'Wash Basin Model 5'
      }
    ]
  },
  {
    id: 'design-wash-basin',
    name: 'Design Wash Basin',
    mainProduct: {
      id: 16,
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center',
      alt: 'Premium Design Wash Basin',
      name: 'Premium Design Wash Basin'
    },
    products: [
      { id: 17, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center', alt: 'Design Wash Basin 2', name: 'Design Wash Basin 2' },
      { id: 18, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center', alt: 'Design Wash Basin 3', name: 'Design Wash Basin 3' },
    ]
  },
  {
    id: 'pan-urinal-sink',
    name: 'PAN, Urinal & Sink',
    mainProduct: {
      id: 19,
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center',
      alt: 'Premium PAN, Urinal & Sink',
      name: 'Premium PAN, Urinal & Sink'
    },
    products: [
      { id: 20, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center', alt: 'Urinal Model 2', name: 'Urinal Model 2' },
      { id: 21, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center', alt: 'Sink Model 3', name: 'Sink Model 3' },
    ]
  },
  {
    id: 'other',
    name: 'Other',
    mainProduct: {
      id: 22,
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop&crop=center',
      alt: 'Other Sanitaryware',
      name: 'Other Sanitaryware'
    },
    products: [
      { id: 23, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center', alt: 'Other Product 2', name: 'Other Product 2' },
      { id: 24, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop&crop=center', alt: 'Other Product 3', name: 'Other Product 3' },
    ]
  }
];

const ProductSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentProducts, setCurrentProducts] = useState<{ [key: string]: Product | null }>({});

  const handleProductSelect = (categoryId: string, product: Product) => {
    setCurrentProducts(prev => ({
      ...prev,
      [categoryId]: product
    }));
  };

  return (
    <section id="products" className="py-16 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-charcoalBlack mb-2">
            Our <span className="text-goldenBronze">Products</span>
          </h2>
          <div className="mx-auto mb-4 w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
          <p className="text-xl text-charcoalBlack max-w-2xl mx-auto">
            Discover our comprehensive range of premium sanitaryware products
          </p>
        </div>
        <div className="divide-y divide-gray-300">
          {categories.map((category, idx) => (
            <div key={category.id} className="py-8 fade-in-row">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Product Card */}
                <div className="lg:w-1/3">
                  <div className="bg-pureWhite rounded-lg shadow-lg overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={category.mainProduct.src}
                        alt={category.mainProduct.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-charcoalBlack">{category.name}</h3>
                      <p className="text-charcoalBlack mt-2">Premium Quality Product with exceptional features and durability.</p>
                    </div>
                  </div>
                </div>

                {/* Related Products Carousel */}
                <div className="lg:w-2/3">
                  <RelatedProductsCarousel 
                    products={category.products}
                    currentProduct={currentProducts[category.id] || category.mainProduct}
                    onProductSelect={(product) => handleProductSelect(category.id, product)}
                    onImageClick={setSelectedImage}
                    currentCategory={category.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged view */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed top-6 right-6 text-white text-4xl font-bold bg-black/40 rounded-full px-3 py-1 hover:text-goldenBronze hover:bg-black/70 transition-colors z-50"
            aria-label="Close image preview"
          >
            ×
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Enlarged product view"
              className="w-full h-full max-w-[98vw] max-h-[98vh] object-contain rounded-lg mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
