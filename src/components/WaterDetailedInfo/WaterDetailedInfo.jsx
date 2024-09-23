import DailyInfo from "../DailyInfo/DailyInfo";
import UserBar from "../UserBar/UserBar";
import Calendar from "../Calendar/Calendar";

const WaterDetailedInfo = ({ date, waterData }) => {
  return (
    <div>
      <UserBar />
      <DailyInfo date={date} waterData={waterData} />
      <Calendar />
    </div>
  );
};

export default WaterDetailedInfo;
