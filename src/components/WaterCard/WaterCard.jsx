import s from "./WaterCard.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";

const WaterCard = ({ quantity, time, onEdit, onDelete }) => {
  return (
    <div className={s.waterCard}>
      <SvgIcon className={s.waterIcon} id="water" />

      <div className={s.waterInfo}>
        <p className={s.quantity}>{quantity} мл</p>
        <p className={s.time}>{time}</p>
      </div>

      <div className={s.waterActions}>
        <SvgIcon className={s.editIcon} onClick={onEdit} id="edit" />
        <SvgIcon className={s.deleteIcon} onClick={onDelete} id="trash" />
      </div>
    </div>
  );
};

export default WaterCard;
