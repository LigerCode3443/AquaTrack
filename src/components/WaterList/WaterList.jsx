import WaterCard from "../WaterCard/WaterCard";
import s from "./WaterList.module.css";

const WaterList = ({ waterData, onEditWater, onDeleteWater }) => {
  return (
    <div className={s.waterList}>
      {waterData.map((entry) => (
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
