import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: { useSuspense: true },
    fallbackLng: 'en',
    preload: ['en'],
    ns: ['common'],
    defaultNS: 'common',
    cleanCode: true,
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly',
    debug: false,
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
      queryStringParams: { v: import.meta.env.VERSION },
      requestOptions: {
        cache: 'no-store',
        credentials: 'same-origin',
      },
    },
  });

export default i18n;
