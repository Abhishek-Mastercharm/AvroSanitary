import React, { useState } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="py-5 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #fff 0%, #29aae3 30%, #29aae3 60%, #362977 100%)"
      }}
    >
      {/* Glassmorphism Effect Layer */}
      <div className="absolute inset-0 z-0 bg-white/10  pointer-events-none">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
          <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="contactNoiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="5" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#contactNoiseFilter)" />
          </svg>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative bg-white/80 backdrop-blur-lg border border-white/40 p-6 rounded-lg shadow-xl w-full max-w-xl animate-fade-in overflow-hidden flex items-center">
          {/* Bubble Animation Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <span className="absolute left-8 bottom-0 w-12 h-12 bg-red-400/40 rounded-full blur animate-bubble-float" />
            <span className="absolute left-1/3 bottom-0 w-10 h-10 bg-orange-400/40 rounded-full blur-md animate-bubble-float-slow" />
            <span className="absolute left-2/3 bottom-0 w-16 h-16 bg-yellow-300/40 rounded-full blur-lg animate-bubble-float-fast" />
            <span className="absolute left-3/4 bottom-0 w-8 h-8 bg-green-400/40 rounded-full blur-sm animate-bubble-float" />
            <span className="absolute left-1/4 bottom-0 w-12 h-12 bg-blue-400/40 rounded-full blur animate-bubble-float-slow" />
            <span className="absolute left-1/2 bottom-0 w-14 h-14 bg-indigo-400/40 rounded-full blur animate-bubble-float" />
            <span className="absolute left-[85%] bottom-0 w-10 h-10 bg-violet-400/40 rounded-full blur animate-bubble-float-fast" />
          </div>
          {/* Glass Texture Overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
            <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>
          {/* Contact Info */}
          <div className="flex flex-row gap-4 md:gap-8 justify-center items-center w-full md:divide-x md:divide-goldenBronze/20">
            {/* Email */}
            <div className="flex flex-row items-center gap-2 flex-1 min-w-[120px] group px-2">
              <div className="w-8 h-8 bg-goldenBronze/10 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-goldenBronze" />
              </div>
              <div>
                <p className="font-semibold text-black text-sm">{t('contact.email')}</p>
                <p className="text-black text-xs">marsexim@gmail.com</p>
              </div>
            </div>
            {/* Phone */}
            <div className="flex flex-row items-center gap-2 flex-1 min-w-[180px] group px-2">
              <div className="w-8 h-8 bg-goldenBronze/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-goldenBronze" />
              </div>
              <div>
                <p className="font-semibold text-black text-sm">{t('contact.phone')}</p>
                <p className="text-black text-xs whitespace-normal">91 9501311070 | +91 8847418317 | +91 9779568485</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex justify-center mt-4">
        <p className="text-sm text-white text-center w-full">
          © {new Date().getFullYear()} Avro Original | All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
