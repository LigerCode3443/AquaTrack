import s from "./Logout.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import { logoutThunk } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";

const Logout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose}>
      <div className={s.box}>
        <h4 className={s.title}>Log out</h4>

        <p className={s.text}>Do you really want to leave?</p>
        <button onClick={() => dispatch(logoutThunk())} className={s.logout}>
          logout
        </button>
        <button onClick={onClose} className={s.cancel}>
          cancel
        </button>
      </div>
    </ModalWindow>
  );
};
export default Logout;
