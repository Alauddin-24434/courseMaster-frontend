'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../public/locales/en/translation.json';
import bnTranslation from '../public/locales/bn/translation.json';

i18n
//   .use(LanguageDetector) // detect from localStorage/cookie
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      bn: { translation: bnTranslation },
    },
    fallbackLng: 'bn',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // preserve selected language on reload
    },
  });

export default i18n;
