import UserBar from "../UserBar/UserBar";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import s from "./UserPanel.module.css";

export const UserPanel = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    isLoggedIn && (
      <div className={s.wrapper}>
        <UserBar />
      </div>
    )
  );
};
