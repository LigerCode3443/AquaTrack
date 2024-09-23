import DailyInfo from "../DailyInfo/DailyInfo";
import UserBar from "../UserBar/UserBar";
import Calendar from "../Calendar/Calendar";
import s from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = ({ date, waterData }) => {
  return (
    <div className={s.wrapper}>
      <UserBar />
      <DailyInfo date={date} waterData={waterData} />
      <Calendar />
    </div>
  );
};

export default WaterDetailedInfo;
