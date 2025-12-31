import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

export type I18nConfig = {
  loadPath?: string;
  defaultLanguage?: string;
  fallbackLanguage?: string;
  storageKey?: string;
};

export const initI18n = async (config: I18nConfig = {}) => {
  const {
    loadPath = '/locales/{{lng}}.json',
    defaultLanguage = 'vi',
    fallbackLanguage = 'vi',
    storageKey = 'language',
  } = config;

  await i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: localStorage.getItem(storageKey) || defaultLanguage,
      fallbackLng: fallbackLanguage,
      backend: {
        loadPath,
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
};

export { i18n };

