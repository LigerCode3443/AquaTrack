import WaterCard from "../WaterCard/WaterCard";
import s from "./WaterList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectOneDayRecords } from "../../redux/water/selectors";
import { useEffect } from "react";
import { getByOneDayRecordsThunk } from "../../redux/water/operations";
const WaterList = ({ onEditWater, onDeleteWater }) => {
  const data = useSelector(selectOneDayRecords);
  const dispatch = useDispatch();

  useEffect(() => {
    const date = new Date();
    dispatch(
      getByOneDayRecordsThunk({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      })
    );
  }, [dispatch]);
  return (
    <div className={s.waterList}>
      {data.map((entry) => (
        <WaterCard
          key={entry._id}
          quantity={entry.quantity}
          time={new Date(entry.date).toLocaleTimeString()}
          onEdit={() => onEditWater(entry)}
          onDelete={() => onDeleteWater(entry)}
        />
      ))}
    </div>
  );
};

export default WaterList;
