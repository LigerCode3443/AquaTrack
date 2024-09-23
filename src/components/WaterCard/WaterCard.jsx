import s from "./WaterCard.module.css";

const WaterCard = ({ quantity, time, onEdit, onDelete }) => {
  return (
    <div className={s.waterCard}>
      <svg className={s.waterIcon}>
        <use href="/src/images/sprite.svg#water" />
      </svg>
      <div className={s.waterInfo}>
        <p className={s.quantity}>{quantity} мл</p>
        <p className={s.time}>{time}</p>
      </div>

      <div className={s.waterActions}>
        <svg className={s.editIcon} onClick={onEdit}>
          <use href="/src/images/sprite.svg#edit" />
        </svg>
        <svg className={s.deleteIcon} onClick={onDelete}>
          <use href="/src/images/sprite.svg#trash" />
        </svg>
      </div>
    </div>
  );
};

export default WaterCard;
