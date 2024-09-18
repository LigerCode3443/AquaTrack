import Calendar from "../Calendar/Calendar";
import DailyInfo from "../DailyInfo/DailyInfo";
import UserBar from "../UserBar/UserBar";
import s from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <div className={s.wrapper}>
      <UserBar />
      <DailyInfo />
      <Calendar />
    </div>
  );
};
export default WaterDetailedInfo;
