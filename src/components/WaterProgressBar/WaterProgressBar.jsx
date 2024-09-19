import css from "./WaterProgressBar.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const WaterProgressBar = ({ value, setValue }) => {
  return (
    <div className={css.waterProgressBar}>
      <h3>Today</h3>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={setValue}
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
        style={{ pointerEvents: "none" }}
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
