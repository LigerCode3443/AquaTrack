import { Link } from "react-router-dom";
import css from "./PageNotFound.module.css";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
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
          {}
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
