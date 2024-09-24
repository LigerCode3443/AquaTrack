import WaterCard from "../WaterCard/WaterCard";
import s from "./WaterList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectOneDayRecords } from "../../redux/water/selectors";
import { useEffect } from "react";
import { getByOneDayRecordsThunk } from "../../redux/water/operations";

const WaterList = ({
  onEditWater,
  onDeleteWater,
  waterData = [
    {
      userWaterGoal: 1500,
      date: "2024-09-17T18:09:08.000Z",
      quantity: 250,
      _id: "66e9c7ed994cd2e9ea7c177e",
    },

    {
      userWaterGoal: 1500,
      date: "2024-09-17T18:09:08.000Z",
      quantity: 250,
      _id: "66ea7d4bfad188b6b5c10cb1",
    },
    {
      userWaterGoal: 1500,
      date: "2024-09-18T07:12:20.000Z",
      quantity: 250,
      _id: "66ea7d5efad188b6b5c10cbb",
    },
    {
      userWaterGoal: 1500,
      date: "2024-09-18T07:12:20.000Z",
      quantity: 250,
      _id: "66ea7d5efad188b6b5c10cdb",
    },
  ],
}) => {
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
      {/* {data.records.map((entry) => ( */}
      {waterData.map((entry) => (
        <WaterCard
          key={entry._id}
          quantity={entry.quantity}
          time={new Date(entry.date)}
          onEdit={() => onEditWater(entry)}
          onDelete={() => onDeleteWater(entry)}
        />
      ))}
    </div>
  );
};

export default WaterList;
