import WaterCard from "../WaterCard/WaterCard";
import s from "./WaterList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectOneDayRecords } from "../../redux/water/selectors";
import { useEffect } from "react";
import { getByOneDayRecordsThunk } from "../../redux/water/operations";
import { useTranslation } from "react-i18next";

const WaterList = ({ onEditWater, onDeleteWater }) => {
  const { t } = useTranslation();

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
      {data.records.length > 0 ? (
        data.records.map((data) => (
          <WaterCard
            key={data._id}
            quantity={data.quantity}
            time={data.date}
            onEdit={() => onEditWater(data._id)}
            onDelete={() => onDeleteWater(data._id)}
          />
        ))
      ) : (
        <div className={s.waterPlaceholder}>
          <p>{t("description.waterList.noWaterRecords")}</p>
        </div>
      )}
    </div>
  );
};

export default WaterList;
