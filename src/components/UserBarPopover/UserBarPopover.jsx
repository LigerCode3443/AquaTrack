import Logout from "../Logout/Logout";
import s from "./UserBarPopover.module.css";
import { SettingsProfile } from "../UserBar/SettingsProfile";

export const UserBarPopover = ({
  isLogOutModalOpen,
  isSettingsModalOpen,
  onSettingsClick,
  onLogOutClick,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.btn}>
        <button className={s.setting} onClick={onSettingsClick}>
          <img src="../../images/sprite.svg#settings" alt="settings" />
          Settings
        </button>
      </div>
      <div className={s.btn}>
        <button onClick={onLogOutClick} className={s.exit} type="button">
          <img src="../../images/sprite.svg#log-out" alt="logout" />
          Log-out
        </button>
        {isSettingsModalOpen && (
          <SettingsProfile
            isOpen={isSettingsModalOpen}
            onClose={() => onSettingsClick(false)}
          />
        )}
        {isLogOutModalOpen && (
          <Logout
            isOpen={isLogOutModalOpen}
            onClose={() => onLogOutClick(false)}
          />
        )}
      </div>
    </div>
  );
};
