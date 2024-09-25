import Logout from "../Logout/Logout";
import s from "./UserBarPopover.module.css";
import SettingsProfile from "../SettingsProfile/SettingsProfile";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export const UserBarPopover = ({
  isLogOutModalOpen,
  isSettingsModalOpen,
  onSettingsClick,
  onLogOutClick,
  onPopoverClose,
}) => {
  const { t } = useTranslation();
  return (
    <div className={s.wrapper}>
      <div className={s.btn}>
        <button className={s.setting} onClick={onSettingsClick}>
          <SvgIcon id="settings" className={s.svg} />
          {t("description.userBar.settingText")}
        </button>
      </div>
      <div className={s.btn}>
        <button onClick={onLogOutClick} className={s.exit} type="button">
          <SvgIcon id="log-out" className={s.svg} />
          {t("description.userBar.logOutText")}
        </button>
        {/* {isSettingsModalOpen && (
          <SettingsProfile
            onPopoverClose={onPopoverClose}
            isOpen={isSettingsModalOpen}
            onClose={() => onSettingsClick(false)}
          />
        )}
        {isLogOutModalOpen && (
          <Logout
            onPopoverClose={onPopoverClose}
            isOpen={isLogOutModalOpen}
            onClose={() => onLogOutClick(false)}
          />
        )} */}
      </div>
    </div>
  );
};
