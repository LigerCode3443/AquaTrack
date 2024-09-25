import { useDispatch } from "react-redux";
import s from "./DeleteWater.module.css";
import { deleteWaterThunk } from "../../redux/water/operations";

export default function DeleteWater({ waterCardId, onClose }) {
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteWaterThunk(waterCardId))
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Failed to delete water entry:", error);
      });
  };

  return (
    <div className={s.modalContent}>
      <div className={s.closeIcon} onClick={onClose}>
        <span
          className={s.icon}
          style={{ backgroundImage: `url('/src/images/sprite.svg#close')` }}
        ></span>
      </div>
      <div className={s.textCont}>
        <h2 className={s.title}>Delete entry</h2>
        <p className={s.text}>Are you sure you want to delete the entry?</p>
      </div>
      <div className={s.buttonContainer}>
        <button onClick={handleConfirmDelete} className={s.confirmButton}>
          Delete
        </button>
        <button onClick={onClose} className={s.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
