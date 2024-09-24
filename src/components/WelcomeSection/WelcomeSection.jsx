import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Logo from "../Logo/Logo";
import HomeAuthSidebar from "../HomeAuthSidebar/HomeAuthSidebar";
import LocalizationSwitcher from "../LocalizationSwitcher/LocalizationSwitcher";

import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <HomeAuthSidebar>
      <div className={css.wrapper}>
        <div className={css.header}>
          <Logo />
          <LocalizationSwitcher />
        </div>

        <div className={css.context}>
          <h2 className={css.subtitle}>{t("description.hero.subtitleText")}</h2>
          <h1 className={css.title}>{t("description.hero.titleText")}</h1>
          <span className={css.wrapper_links}>
            <Link to="/signup" className={css.link_try_tracker}>
              {t("description.hero.btnTryText")}
            </Link>
            <Link to="/signin" className={css.link_sign_in_class}>
              {t("description.hero.btnSignInText")}
            </Link>
          </span>
        </div>
      </div>
    </HomeAuthSidebar>
  );
};
export default WelcomeSection;
