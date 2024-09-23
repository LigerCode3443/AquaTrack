import Logout from "../Logout/Logout";
import s from "./UserBarPopover.module.css";
import { SettingsProfile } from "../SettingsProfile/SettingsProfile";
import SvgIcon from "../SvgIcon/SvgIcon";

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
          <SvgIcon id="settings" />
          Settings
        </button>
      </div>
      <div className={s.btn}>
        <button onClick={onLogOutClick} className={s.exit} type="button">
          <SvgIcon id="log-out" />
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
