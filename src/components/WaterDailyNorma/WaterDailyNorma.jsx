import { useTranslation } from "react-i18next";
import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = ({ dailyNorma }) => {
  const { t } = useTranslation();
  return (
    <div className={css.waterDailyNorma}>
      <h4>
        {dailyNorma ? dailyNorma : 0} {t("description.norma.liter")}
      </h4>
      <p>{t("description.norma.normaText")}</p>
    </div>
  );
};

export default WaterDailyNorma;
