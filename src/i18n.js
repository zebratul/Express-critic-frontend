import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    lng: localStorage.getItem('selectedLanguage') || 'en', // Add this line
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },

    react: {
      useSuspense: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    load: 'languageOnly',
  });

export default i18n;
