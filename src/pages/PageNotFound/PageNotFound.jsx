import { Link } from "react-router-dom";
import css from "./PageNotFound.module.css";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className={css.header}> {t("description.notFoundText.oopsTitle")}</h1>
      <section className={css.errorContainer}>
        <span className={css.four}>
          <span className={css.screenReaderText}>4</span>
        </span>
        <span className={css.zero}>
          <span className={css.screenReaderText}>0</span>
        </span>
        <span className={css.four}>
          <span className={css.screenReaderText}>4</span>
        </span>
      </section>
      <div className={css.linkContainer}>
        <Link className={css.moreLink} to="/">
          {t("description.notFoundText.returnToHomeText")}
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
