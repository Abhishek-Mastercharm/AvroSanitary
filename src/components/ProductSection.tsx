import React from 'react';

const productPosters = [
  {
    name: 'Novo',
    baseName: 'novo',
    alt: 'Premium Novo Sanitaryware',
  },
  {
    name: 'Novo Monoblock',
    baseName: 'novo-monoblock',
    alt: 'Novo Monoblock Sanitaryware',
  },
  {
    name: 'WashBasin',
    baseName: 'washbasin',
    alt: 'Wash Basin Sanitaryware',
  },
  {
    name: 'Design WB',
    baseName: 'design-wb',
    alt: 'Designer Wash Basin Sanitaryware',
  },
  {
    name: 'PAN,Urinal,SInk',
    baseName: 'pan-urinal-sink',
    alt: 'PAN, Urinal, Sink Sanitaryware',
  },
  {
    name: 'Other',
    baseName: 'other',
    alt: 'Other Sanitaryware Products',
  },
];

const ProductPosterSection: React.FC = () => {
  return (
    <section id="products" className="bg-white w-full p-0 m-0">
      <div className="text-center mt-6 sm:mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoalBlack mb-2 sm:mb-3 md:mb-4">
          Our <span className="text-goldenBronze">Products</span>
        </h2>
        <div className="mx-auto mb-1 sm:mb-2 md:mb-3 w-20 sm:w-28 md:w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoalBlack max-w-2xl mx-auto mb-4">
          Discover our comprehensive range of premium sanitaryware products
        </p>
      </div>
      <div className="flex flex-col p-0 m-0 w-full">
        {productPosters.map((product) => (
          <picture key={product.baseName} className="w-full aspect-[16/9] p-0 m-0 block">
            <source srcSet={`/images/${product.baseName}-xl.webp`} media="(min-width: 1920px)" />
            <source srcSet={`/images/${product.baseName}-lg.webp`} media="(min-width: 1366px)" />
            <source srcSet={`/images/${product.baseName}-md.webp`} media="(min-width: 1024px)" />
            <source srcSet={`/images/${product.baseName}-sm.webp`} media="(min-width: 720px)" />
            <source srcSet={`/images/${product.baseName}-xs.webp`} media="(max-width: 480px)" />
            <img
              src={`/images/${product.baseName}-xl.webp`}
              alt={product.alt}
              className="w-full h-auto object-cover block p-0 m-0"
              loading="lazy"
              draggable="false"
            />
          </picture>
        ))}
      </div>
    </section>
  );
};

export default ProductPosterSection;
