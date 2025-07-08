import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === 'en';
  const isFrench = i18n.language === 'fr';

  const toggleLanguage = () => {
    if (isEnglish) i18n.changeLanguage('fr');
    else i18n.changeLanguage('en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 left-6 z-50 bg-[#29aae3] hover:bg-cyan-800 text-white rounded-full shadow-lg p-3 flex items-center justify-center transition-colors duration-300"
      aria-label={t('langswitch.aria')}
      title={t('langswitch.title')}
    >
      {/* Google Translate style icon with theme color */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-7 h-7">
        <rect width="48" height="48" rx="12" fill="#29aae3" />
        <text x="13" y="32" font-size="20" font-family="Arial, sans-serif" fill="white">文</text>
        <text x="28" y="32" font-size="20" font-family="Arial, sans-serif" fill="white">A</text>
      </svg>
      <span className="ml-2 font-semibold hidden md:inline">{isEnglish ? 'EN' : 'FR'}</span>
    </button>
  );
};

export default LanguageSwitcher; 