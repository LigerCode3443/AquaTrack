import WaterCard from "../WaterCard/WaterCard";
import s from "./WaterList.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { selectOneDayRecords } from "../../redux/water/selectors";
// import { useEffect } from "react";
// import { getByOneDayRecordsThunk } from "../../redux/water/operations";

const WaterList = ({ onEditWater, onDeleteWater, waterData }) => {
  // const data = useSelector(selectOneDayRecords);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const date = new Date();
  //   dispatch(
  //     getByOneDayRecordsThunk({
  //       year: date.getFullYear(),
  //       month: date.getMonth(),
  //       day: date.getDate(),
  //     })
  //   );
  // }, [dispatch]);
  return (
    <div className={s.waterList}>
      {waterData.map((data) => (
        // {data.records.map((data) => (
        <WaterCard
          key={data._id}
          quantity={data.quantity}
          time={data.date}
          onEdit={() => onEditWater(data)}
          onDelete={() => onDeleteWater(data)}
        />
      ))}
    </div>
  );
};

export default WaterList;
