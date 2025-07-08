import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="fade-in-row py-20 bg-white relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-charcoalBlack mb-2">
          {t('about.title')}
        </h2>
        <div className="mx-auto mb-8 w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
        <p className="text-xl text-charcoalBlack mb-8">
          {t('about.desc1')}
        </p>
        <p className="text-xl text-charcoalBlack mb-8">
          {t('about.desc2')}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
