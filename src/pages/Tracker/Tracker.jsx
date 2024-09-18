import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import s from "./Tracker.module.css";

const Tracker = () => {
  return (
    <div className={s.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};
export default Tracker;
