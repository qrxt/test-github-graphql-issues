import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./config.json";
import detector from "i18next-browser-languagedetector";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: translations,
  });

export default i18n;
