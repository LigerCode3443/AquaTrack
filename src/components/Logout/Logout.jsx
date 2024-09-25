import s from "./Logout.module.css";
import { logoutThunk } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useTranslation } from "react-i18next";

const Logout = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className={s.modal_wrp}>
      <ModalWindow className={s.modal} isOpen={isOpen} onClose={onClose}>
        <div className={s.box}>
          <h4 className={s.title}>{t("description.signOut.titleText")}</h4>

          <p className={s.text}>{t("description.signOut.warningText")}</p>
          <div className={s.btn_wrp}>
            <button
              onClick={() => dispatch(logoutThunk())}
              className={s.logout}
            >
              {t("description.signOut.logOutBtn")}
            </button>
            <button onClick={onClose} className={s.cancel}>
              {t("description.signOut.cancelBtn")}
            </button>
          </div>
        </div>
      </ModalWindow>
    </div>
  );
};
export default Logout;
