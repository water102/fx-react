import { default as i18n } from 'i18next';
export type I18nConfig = {
    loadPath?: string;
    defaultLanguage?: string;
    fallbackLanguage?: string;
    storageKey?: string;
};
export declare const initI18n: (config?: I18nConfig) => Promise<void>;
export { i18n };
