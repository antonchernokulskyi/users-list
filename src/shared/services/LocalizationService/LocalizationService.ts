import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from 'translations/en.json';

const resources = {
  en: { translation: en },
};

const init = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

const onChangeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

const getLanguage = () => i18n.language;

export const LocalizationService = {
  init,
  onChangeLanguage,
  getLanguage,
};
