import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  hi: { translation: hi },
  pt: { translation: pt },
  ru: { translation: ru },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // French as default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
