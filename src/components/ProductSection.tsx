import React from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Add the slow-pulse animation style at the top level
if (typeof window !== 'undefined' && !document.getElementById('slow-pulse-style')) {
  const style = document.createElement('style');
  style.id = 'slow-pulse-style';
  style.innerHTML = `
    @keyframes slow-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .slow-pulse {
      animation: slow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `;
  document.head.appendChild(style);
}

const productPosters = [
  {
    name: 'product.novo',
    baseName: 'novo',
    alt: 'product.novoAlt',
  },
  {
    name: 'product.novoMonoblock',
    baseName: 'novo-monoblock',
    alt: 'product.novoMonoblockAlt',
  },
  {
    name: 'product.washBasin',
    baseName: 'washbasin',
    alt: 'product.washBasinAlt',
  },
  {
    name: 'product.designWB',
    baseName: 'design-wb',
    alt: 'product.designWBAlt',
  },
  {
    name: 'product.panUrinalSink',
    baseName: 'pan-urinal-sink',
    alt: 'product.panUrinalSinkAlt',
  },
  {
    name: 'product.other',
    baseName: 'other',
    alt: 'product.otherAlt',
  },
];

const ProductPosterSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="products" className="bg-white w-full p-0 m-0">
      <div className="text-center mt-6 sm:mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoalBlack mb-2 sm:mb-3 md:mb-4">
          {t('product.title')}
        </h2>
        <div className="mx-auto mb-1 sm:mb-2 md:mb-3 w-20 sm:w-28 md:w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoalBlack max-w-2xl mx-auto mb-4">
          {t('product.desc')}
        </p>
      </div>
      <div className="flex flex-col p-0 m-0 w-full">
        {productPosters.map((product) => (
          <div key={product.baseName} className="w-full aspect-[16/9] p-0 m-0 block relative">
            <picture>
              <source srcSet={`/images/${product.baseName}-xl.webp`} media="(min-width: 1536px)" />
              <source srcSet={`/images/${product.baseName}-lg.webp`} media="(min-width: 1280px)" />
              <source srcSet={`/images/${product.baseName}-md.webp`} media="(min-width: 1024px)" />
              <source srcSet={`/images/${product.baseName}-sm.webp`} media="(min-width: 640px)" />
              <source srcSet={`/images/${product.baseName}-xs.webp`} media="(max-width: 639px)" />
              <img
                src={`/images/${product.baseName}-xl.webp`}
                alt={t(product.alt)}
                className="w-full h-auto object-cover block p-0 m-0"
                loading="lazy"
                draggable="false"
              />
            </picture>
            {/* Download icon button at top-right */}
            <a
              href={`/pdfs/${product.baseName}.pdf`}
              download
              className="absolute top-2 right-2 md:top-3 md:right-3 z-20 bg-white/90 rounded-full p-1 md:p-2 shadow-lg border border-goldenBronze slow-pulse hover:animate-none hover:bg-goldenBronze transition-colors duration-200"
              title={t('product.download', { name: t(product.name) })}
            >
              <Download className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-goldenBronze hover:text-white transition-colors duration-200" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPosterSection;
