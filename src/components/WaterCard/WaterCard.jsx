import s from "./WaterCard.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";

const WaterCard = ({ quantity, time, onEdit, onDelete }) => {
  const arrTime = time.split(":");
  return (
    <div className={s.waterCard}>
      <SvgIcon className={s.waterIcon} id="water" />

      <div className={s.waterInfo}>
        <p className={s.quantity}>{(quantity / 1000).toFixed(2)} L</p>
        <p className={s.time}>
          {arrTime[0]}:{arrTime[1]}{" "}
          {arrTime[2].indexOf("AM") !== -1 ? "AM" : "PM"}
        </p>
      </div>

      <div className={s.waterActions}>
        <button onClick={onEdit}>
          <SvgIcon className={s.editIcon} id="edit" />
        </button>
        <button onClick={onDelete}>
          <SvgIcon className={s.deleteIcon} id="trash" />
        </button>
      </div>
    </div>
  );
};

export default WaterCard;
