import MediaQuery from "react-responsive";
import s from "./WaterCard.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import { format, parseISO } from "date-fns";

const WaterCard = ({ quantity, time, onEdit, onDelete }) => {
  let formattedTime;

  try {
    const parsedDate = parseISO(time);
    if (!isNaN(parsedDate.getTime())) {
      formattedTime = format(parsedDate, "h:mm a");
    }
  } catch (error) {
    console.error("Invalid date format:", time, error);
    formattedTime = "Invalid date";
  }

  return (
    <div className={s.waterCard}>
      <MediaQuery maxWidth={767}>
        <SvgIcon id="water" width={38} height={38} />
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <SvgIcon id="water" width={44} height={45} />
      </MediaQuery>

      <div className={s.waterInfo}>
        <p className={s.quantity}>{(quantity / 1000).toFixed(2)} L</p>
        <p className={s.time}>{formattedTime}</p>
      </div>

      <div className={s.waterActions}>
        <button onClick={onEdit}>
          <MediaQuery maxWidth={767}>
            <SvgIcon id="edit" width={14} height={14} />
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <SvgIcon id="edit" width={16} height={16} />
          </MediaQuery>
        </button>
        <button onClick={onDelete}>
          <MediaQuery maxWidth={767}>
            <SvgIcon id="trash" width={14} height={14} />
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <SvgIcon id="trash" width={16} height={16} />
          </MediaQuery>
        </button>
      </div>
    </div>
  );
};

export default WaterCard;
