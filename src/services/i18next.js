import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import es from '../locales/es.json';
import ptbr from '../locales/ptbr.json';

// IDIOMAS DISPONIBLES
export const languageResources = {
  en: { translation: en },
  es: { translation: es },
  ptbr: { translation: ptbr},
};

// CONFIGURACION DE LA LIBRERIA i18next
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;
