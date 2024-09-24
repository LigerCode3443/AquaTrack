import { useTranslation } from "react-i18next";

import s from "../LocalizationSwitcher/LocalizationSwitcher.module.css";

export const LocalizationSwitcher = () => {
  const languages = {
    en: { name: "EN" },
    ukr: { name: "UA" },
  };

  const { i18n } = useTranslation();

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {Object.keys(languages).map((lng) => (
        <button
          key={lng}
          onClick={() => handleChange(lng)}
          className={`${s.button} ${
            i18n.resolvedLanguage === lng ? s.active : ""
          }`}
        >
          {languages[lng].name}
        </button>
      ))}
    </div>
  );
};
export default LocalizationSwitcher;
