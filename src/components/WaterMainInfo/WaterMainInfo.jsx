import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import Button from "../Button/Button";
import css from "./WaterMainInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecordsThunk } from "../../redux/water/operations";
import { selectRecords } from "../../redux/water/selectors";

const WaterMainInfo = () => {
  const dispatch = useDispatch();
  const records = useSelector(selectRecords);

  const currentDate = new Date().toISOString().split("T")[0];

  const todayRecord = records.find((record) =>
    record.date.startsWith(currentDate)
  );

  const dailyNorma = todayRecord ? todayRecord.userWaterGoal : 0;

  const totalConsumed = records.reduce((sum, record) => {
    if (record.date.startsWith(currentDate)) {
      return sum + record.quantity;
    }
    return sum;
  }, 0);

  const progress = dailyNorma > 0 ? (totalConsumed / dailyNorma) * 100 : 0;

  useEffect(() => {
    const currentDate = new Date();
    dispatch(
      getRecordsThunk({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
      })
    );
  }, [dispatch]);

  return (
    <div className={css.waterTracker}>
      <h2>AquaTrack</h2>
      <WaterDailyNorma dailyNorma={dailyNorma / 1000} />
      <WaterProgressBar progress={progress} />
      <Button variant="secondary" className={css.btnAddForm} icon="plus">
        Add water
      </Button>
    </div>
  );
};
export default WaterMainInfo;
