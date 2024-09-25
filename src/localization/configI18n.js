import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  signUpText,
  signInText,
  informSectionText,
  welcomeSectionText,
  modalForgotPasswordText,
  dailyNormaText,
  userBarText,
  monthNames,
  daysOfWeek,
  calendarTitles,
  SettingsProfileText,
  signOutText,
  addWaterText,
  editWaterText,
  settingsText,
  deleteWaterText,
  validationAuthText,
  restorePasswordText,
  toastAlerts,
  validationWaterForm,
} from "./localization";

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
            SettingsProfile: SettingsProfileText.en,
            signOut: signOutText.en,
            addWater: addWaterText.en,
            editWater: editWaterText.en,
            deleteWater: deleteWaterText.en,
            settings: settingsText.en,
            validationAuth: validationAuthText.en,
            modalForgotPassword: modalForgotPasswordText.en,
            restorePassword: restorePasswordText.en,
            toastAlerts: toastAlerts.en,
            validationWater: validationWaterForm.en,
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
            SettingsProfile: SettingsProfileText.ukr,
            signOut: signOutText.ukr,
            addWater: addWaterText.ukr,
            editWater: editWaterText.ukr,
            deleteWater: deleteWaterText.ukr,
            settings: settingsText.ukr,
            validationAuth: validationAuthText.ukr,
            modalForgotPassword: modalForgotPasswordText.ukr,
            restorePassword: restorePasswordText.ukr,
            toastAlerts: toastAlerts.ukr,
            validationWater: validationWaterForm.ukr,
          },
        },
      },
    },
  })
  .then(() => {
    console.log("Current language:", i18n.language);
  })
  .catch((err) => {
    console.error("i18next initialization error:", err);
  });

export default i18n;
