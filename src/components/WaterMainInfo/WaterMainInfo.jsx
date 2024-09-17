import { useState } from "react";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
// import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const [progress, setProgress] = useState(50);
  const [dailyNorma] = useState(1.5);

  return (
    <div className={css.waterTracker}>
      <h2>AquaTrack</h2>
      <WaterDailyNorma dailyNorma={dailyNorma} />
      <WaterProgressBar progress={progress} />
      {/* <AddWaterBtn onAddWater={handleAddWater} /> */}
    </div>
  );
};
export default WaterMainInfo;
