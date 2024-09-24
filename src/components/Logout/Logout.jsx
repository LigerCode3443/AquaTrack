import s from "./Logout.module.css";
import { logoutThunk } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow";

const Logout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose}>
      <div className={s.box}>
        <h4 className={s.title}>Log out</h4>

        <p className={s.text}>Do you really want to leave?</p>
        <div className={s.btn_wrp}>
          <button onClick={() => dispatch(logoutThunk())} className={s.logout}>
            Logout
          </button>
          <button onClick={onClose} className={s.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </ModalWindow>
  );
};
export default Logout;
