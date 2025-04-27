import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const LOCIZE_PROJECT_ID = import.meta.env.VITE_TRANSLATION_API

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: true,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `https://api.locize.app/${LOCIZE_PROJECT_ID}/latest/{{lng}}/{{ns}}`,
    },
  })

export default i18n