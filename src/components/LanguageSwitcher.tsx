import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const current = i18n.language;
  const currentLang = LANGUAGES.find(l => l.code === current) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !(menuRef.current as any).contains(event.target) &&
        buttonRef.current &&
        !(buttonRef.current as any).contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <button
        ref={buttonRef}
        onClick={() => setOpen(o => !o)}
        className="bg-[#29aae3] hover:bg-cyan-800 text-white rounded-full shadow-lg px-5 py-3 flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('langswitch.aria')}
        title={t('langswitch.title')}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-7 h-7">
          <rect width="48" height="48" rx="12" fill="#29aae3" />
          <text x="13" y="32" fontSize="20" fontFamily="Arial, sans-serif" fill="white">文</text>
          <text x="28" y="32" fontSize="20" fontFamily="Arial, sans-serif" fill="white">A</text>
        </svg>
        <span className="ml-2 font-semibold">{currentLang.label}</span>
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          ref={menuRef}
          className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-cyan-200 py-1 z-50 animate-fade-in"
          role="listbox"
        >
          {LANGUAGES.map(lang => (
            <li
              key={lang.code}
              role="option"
              aria-selected={current === lang.code}
              className={`px-4 py-2 cursor-pointer hover:bg-cyan-100 text-cyan-900 flex items-center ${current === lang.code ? 'font-bold bg-cyan-50' : ''}`}
              onClick={() => handleSelect(lang.code)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') handleSelect(lang.code);
              }}
            >
              {lang.label}
              {current === lang.code && (
                <svg className="ml-2 w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher; 