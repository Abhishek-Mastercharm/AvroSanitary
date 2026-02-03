import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'sanitaryware' | 'tiles';
  className?: string;
}

const languages = [
  { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png', countryCode: 'fr' },
  { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png', countryCode: 'es' },
  { code: 'pt', name: 'Português', flag: 'https://flagcdn.com/w40/pt.png', countryCode: 'pt' },
  { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/w40/ru.png', countryCode: 'ru' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png', countryCode: 'gb' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'sanitaryware',
  className = '' 
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Universal design that works on all backgrounds (white, black, or any color)
  return (
    <div className={className || 'relative'} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-lg"
        style={{
          backgroundColor: 'rgba(26, 26, 28, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
        aria-label="Select Language"
      >
        <Languages className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-bold hidden sm:flex items-center gap-2">
          <img 
            src={currentLanguage.flag} 
            alt={currentLanguage.name}
            className="w-5 h-4 object-cover rounded-sm"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {currentLanguage.name}
        </span>
        <span className="text-white text-sm font-bold sm:hidden">
          <img 
            src={currentLanguage.flag} 
            alt={currentLanguage.name}
            className="w-5 h-4 object-cover rounded-sm"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-2xl border-2 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-lg"
          style={{ 
            backgroundColor: 'rgba(26, 26, 28, 0.92)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full flex items-center justify-between px-4 py-3 transition-all duration-200"
              style={{
                backgroundColor: currentLanguage.code === lang.code ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (currentLanguage.code !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentLanguage.code !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={lang.flag} 
                  alt={lang.name}
                  className="w-6 h-5 object-cover rounded-sm"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-sm font-medium text-white">
                  {lang.name}
                </span>
              </div>
              {currentLanguage.code === lang.code && (
                <Check className="w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
