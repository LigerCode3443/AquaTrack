import { useTranslation } from "react-i18next";

import css from "../LocalizationSwitcher/LocalizationSwitcher.module.css";

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
    <div className={css.wrapper}>
      {Object.keys(languages).map((lng) => (
        <button
          key={lng}
          onClick={() => handleChange(lng)}
          className={`${css.button} ${css[lng]} ${
            i18n.resolvedLanguage === lng ? css.active : ""
          }`}
        >
          {/* {languages[lng].name} */}
        </button>
      ))}
    </div>
  );
};
export default LocalizationSwitcher;
