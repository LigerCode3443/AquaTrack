import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  signUpText,
  signInText,
  informSectionText,
  welcomeSectionText,
  dailyNormaText,
  userBarText,
  monthNames,
  daysOfWeek,
  calendarTitles,
  signOutText,
  addWaterText,
  editWaterText,
  settingsText,
  deleteWaterText,
  validationAuthText,
} from "./localization.js";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          description: {
            signUp: signUpText.en,
            signIn: signInText.en,
            inform: informSectionText.en,
            hero: welcomeSectionText.en,
            norma: dailyNormaText.en,
            userBar: userBarText.en,
            month: monthNames.en,
            day: daysOfWeek.en,
            titles: calendarTitles.en,
            signOut: signOutText.en,
            addWater: addWaterText.en,
            editWater: editWaterText.en,
            deleteWater: deleteWaterText.en,
            settings: settingsText.en,
            validationAuth: validationAuthText.en,
          },
        },
      },
      ukr: {
        translation: {
          description: {
            signUp: signUpText.ukr,
            signIn: signInText.ukr,
            inform: informSectionText.ukr,
            hero: welcomeSectionText.ukr,
            norma: dailyNormaText.ukr,
            userBar: userBarText.ukr,
            month: monthNames.ukr,
            day: daysOfWeek.ukr,
            titles: calendarTitles.ukr,
            signOut: signOutText.ukr,
            addWater: addWaterText.ukr,
            editWater: editWaterText.ukr,
            deleteWater: deleteWaterText.ukr,
            settings: settingsText.ukr,
            validationAuth: validationAuthText.ukr,
          },
        },
      },
    },
  });

export default i18n;
