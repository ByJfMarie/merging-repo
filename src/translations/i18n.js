import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import LanguageDetector from "i18next-browser-languagedetector";

//Common
import common_en from "./en/common.json";
//import common_fr from "./fr/common.json";

//Settings
import settings_en from "./en/settings.json";
//import settings_fr from "./fr/settings.json";

i18n
    //.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                common: common_en,
                settings: settings_en
            },
            fr: {
                /*common: common_fr,
                settings: settings_fr*/
            }
        }
    });

i18n.changeLanguage("en");