import React from 'react';
import { Download, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';

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
    name: 'product.wc',
    baseName: 'wc',
    alt: 'product.wcAlt',
  },
  {
    name: 'product.lavabo',
    baseName: 'lavabo',
    alt: 'product.lavaboAlt',
  },
  {
    name: 'product.luxWcMonobloc',
    baseName: 'luxWcMonobloc',
    alt: 'product.luxWcMonoblocAlt',
  },
  {
    name: 'product.novo',
    baseName: 'novo',
    alt: 'product.novoAlt',
  },
  {
    name: 'product.luxLavabo',
    baseName: 'luxLavabo',
    alt: 'product.luxLavaboAlt',
  },
  {
    name: 'product.luxLaveMain',
    baseName: 'luxLaveMain',
    alt: 'product.luxLaveMainAlt',
  },
  {
    name: 'product.wcSuspendu',
    baseName: 'wcSuspendu',
    alt: 'product.wcSuspenduAlt',
  },
  {
    name: 'product.accessoires',
    baseName: 'accessoires',
    alt: 'product.accessoiresAlt',
  },
];

const ProductPosterSection: React.FC = () => {
  const { t } = useTranslation();
  const [enlarged, setEnlarged] = React.useState<null | { src: string; alt: string }>(null);
  return (
    <>
      {/* Overlay for enlarged image rendered in portal for fullscreen effect */}
      {enlarged && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center transition-all">
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={enlarged.src}
              alt={enlarged.alt}
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white object-contain"
            />
            <button
              onClick={() => setEnlarged(null)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 z-10"
              aria-label="Close enlarged image"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>,
        document.body
      )}
      <section id="products" className="bg-white w-[80%] mx-auto p-0 m-0">
        <div className="flex flex-col p-0 m-0 w-full">
          <div className="w-full grid grid-cols-1 gap-0">
            {productPosters.map((product) => (
              <img
                key={product.baseName}
                src={`/images/${product.baseName}-xl.webp`}
                alt={t(product.alt)}
                className="w-full h-auto block p-0 m-0 rounded-none shadow-none max-h-none cursor-pointer"
                loading="lazy"
                draggable="false"
                onClick={() => setEnlarged({ src: `/images/${product.baseName}-xl.webp`, alt: t(product.alt) })}
              />
            ))}
          </div>
        </div>
        {/* Visually hidden SEO keywords for search engines */}
        <div style={{ position: 'absolute', left: '-9999px', color: 'white' }} aria-hidden="true">
          sanitaryware, wash basin, toilet, wc, monoblock, lavabo, accessories, premium bathroom, Avro, Ludhiana, Punjab, India, ceramic, modern, designer, urinal, sink, bath, bathware, luxury, quality, Indian sanitaryware, Avro Original
        </div>
      </section>
    </>
  );
};

export default ProductPosterSection;
