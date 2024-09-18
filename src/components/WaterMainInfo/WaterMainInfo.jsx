import { useState } from "react";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import Button from "../Button/Button";
import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const [progress, setProgress] = useState(0);
  const [dailyNorma, setDailyNorma] = useState(1.5);

  return (
    <div className={css.waterTracker}>
      <h2>AquaTrack</h2>
      <WaterDailyNorma dailyNorma={dailyNorma} />
      <WaterProgressBar progress={progress} />
      <Button variant="secondary" className={css.btnAddForm} icon="plus">
        Add water
      </Button>
    </div>
  );
};
export default WaterMainInfo;
