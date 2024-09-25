import DailyInfo from "../DailyInfo/DailyInfo";
import UserBar from "../UserBar/UserBar";
import Calendar from "../Calendar/Calendar";
import s from "./WaterDetailedInfo.module.css";
import { useState } from "react";

const WaterDetailedInfo = ({ date, waterData }) => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  return (
    <div className={s.wrapper}>
      <UserBar />
      <DailyInfo date={date} waterData={waterData} selectedDate={selectedDay} />
      <Calendar onDateChange={handleDateChange} />
    </div>
  );
};

export default WaterDetailedInfo;
