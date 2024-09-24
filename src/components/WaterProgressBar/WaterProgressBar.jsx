import css from "./WaterProgressBar.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useTranslation } from "react-i18next";

const WaterProgressBar = ({ progress }) => {
  const { t } = useTranslation();
  return (
    <div className={css.waterProgressBar}>
      <h3>{t("description.norma.todayText")}</h3>
      <Slider
        min={0}
        max={100}
        value={progress}
        trackStyle={{ backgroundColor: "#9BE1A0", height: 6 }}
        handleStyle={{
          borderColor: "#9BE1A0",
          height: 12,
          width: 12,
          marginLeft: 3,
          marginTop: -3,
          backgroundColor: "#fff",
          borderWidth: 1,
        }}
        railStyle={{ backgroundColor: "#FFFFFF", height: 6 }}
        style={{ pointerEvents: "none", padding: "0 0 6px 0", height: 6 }}
      />
      <div className={css.waterProcent}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
