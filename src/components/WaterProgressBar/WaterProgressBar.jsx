import css from "./WaterProgressBar.module.css";

const WaterProgressBar = ({ progress }) => {
  return (
    <div className={css.WaterProgressBar}>
      <label>Today</label>
      <input type="range" min="0" max="100" value={progress} readOnly />
      <p>{progress}%</p>
    </div>
  );
};

export default WaterProgressBar;
