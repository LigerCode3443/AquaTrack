import Logout from "../Logout/Logout";
import s from "./UserBarPopover.module.css";
import SettingsProfile from "../SettingsProfile/SettingsProfile";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useEffect, useRef } from "react";

export const UserBarPopover = ({
  isLogOutModalOpen,
  isSettingsModalOpen,
  onSettingsClick,
  onLogOutClick,
  onPopoverClose,
}) => {
  // const userBarRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (userBarRef.current && !userBarRef.current.contains(event.target)) {
  //       onLogOutClick(false);
  //       onSettingsClick(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onLogOutClick, onSettingsClick]);

  return (
    <div className={s.wrapper}>
      <div className={s.btn}>
        <button className={s.setting} onClick={onSettingsClick}>
          <SvgIcon id="settings" className={s.svg} />
          Settings
        </button>
      </div>
      <div className={s.btn}>
        <button onClick={onLogOutClick} className={s.exit} type="button">
          <SvgIcon id="log-out" className={s.svg} />
          Log-out
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
