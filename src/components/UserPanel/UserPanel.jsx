import UserBar from "../UserBar/UserBar";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import s from "./UserPanel.module.css";

export const UserPanel = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  return (
    isLoggedIn && (
      <div className={s.wrapper}>
        <h1 className={s.title}>
          Hello, <span>{user.username}</span>
        </h1>
        <UserBar />
      </div>
    )
  );
};
