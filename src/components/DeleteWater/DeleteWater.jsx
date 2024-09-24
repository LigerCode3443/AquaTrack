import ModalWindow from "../ModalWindow/ModalWindow";
import s from "./DeleteWater.module.css";

export default function DeleteWater({ waterCardId, onDelete, onClose }) {
  const handleConfirmDelete = () => {
    onDelete(waterCardId);
    onClose();
  };

  return (
    <ModalWindow isOpen={true} onClose={onClose}>
      <div className={s.modalContent}>
        <div className={s.closeIcon} onClick={onClose}>
          <span
            className={s.icon}
            style={{ backgroundImage: `url('/src/images/sprite.svg#close')` }}
          ></span>
        </div>
        <h2>Delete entry</h2>
        <p>Are you sure you want to delete the entry?</p>
        <div className={s.buttonContainer}>
          <button onClick={handleConfirmDelete} className={s.confirmButton}>
            Delete
          </button>
          <button onClick={onClose} className={s.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </ModalWindow>
  );
}
