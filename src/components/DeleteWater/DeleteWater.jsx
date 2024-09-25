import { useDispatch } from "react-redux";
import s from "./DeleteWater.module.css";
import { deleteWaterThunk } from "../../redux/water/operations";
import { useTranslation } from "react-i18next";

export default function DeleteWater({ waterId, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteWaterThunk(waterId))
      .unwrap()
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
        <h2 className={s.title}>{t("description.deleteWater.title")}</h2>
        <p className={s.text}>{t("description.deleteWater.warning")}</p>
      </div>
      <div className={s.buttonContainer}>
        <button onClick={handleConfirmDelete} className={s.confirmButton}>
          {t("description.deleteWater.deleteBtn")}
        </button>
        <button onClick={onClose} className={s.cancelButton}>
          {t("description.deleteWater.cancelBtn")}
        </button>
      </div>
    </div>
  );
}
