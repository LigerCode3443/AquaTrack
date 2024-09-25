import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import s from "./Tracker.module.css";

const Tracker = ({ selectedDate }) => {
  return (
    <div className={s.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo date={selectedDate} />
    </div>
  );
};
export default Tracker;
