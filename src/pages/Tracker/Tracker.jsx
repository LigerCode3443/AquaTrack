import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import s from "./Tracker.module.css";

const Tracker = ({ waterData, selectedDate }) => {
  return (
    <div className={s.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo date={selectedDate} waterData={waterData} />
    </div>
  );
};
export default Tracker;
