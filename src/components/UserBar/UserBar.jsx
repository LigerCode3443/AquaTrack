import { useState } from "react";

import s from "./UserBar.module.css";
import avatar from "../../images/avatar/avatars.png";
import { UserBarPopover } from "../UserBarPopover/UserBarPopover";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import SvgIcon from "../SvgIcon/SvgIcon";
import Logout from "../Logout/Logout";
import SettingsProfile from "../SettingsProfile/SettingsProfile";
import { useTranslation } from "react-i18next";
import ModalWindow from "../ModalWindow/ModalWindow";

const UserBar = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleLogoutOpen = () => {
    setIsLogOutModalOpen(true);

    setIsPopoverOpen(false);
  };
  const handleSettingsOpen = () => {
    setIsSettingsModalOpen(true);

    setIsPopoverOpen(false);
  };
  const userName = user.userEmail?.slice(0, user.userEmail?.indexOf("@"));
  const actualName = user.userName ? user.userName : userName;

  console.log(isSettingsModalOpen);
  return (
    <div className={s.wrapper}>
      <h2 className={s.name}>
        {t("description.userBar.helloText")}
        <span>{actualName}</span>
      </h2>
      <div className={s.wrapperBox}>
        <button className={s.bar} onClick={togglePopover}>
          <h3 className={s.s_name}>{actualName}</h3>
          <img
            src={user.userAvatar ? user.userAvatar : avatar}
            alt="avatar"
            className={s.img}
          />

          <SvgIcon
            id="arrow-down"
            width={12}
            height={8}
            className={`${s.accardion} ${isPopoverOpen ? s.accardionOpen : ""}`}
          />
        </button>
        {isPopoverOpen && (
          <UserBarPopover
            isLogOutModalOpen={isLogOutModalOpen}
            isSettingsModalOpen={isSettingsModalOpen}
            onSettingsClick={handleSettingsOpen}
            onLogOutClick={handleLogoutOpen}
            onPopoverClose={() => setIsPopoverOpen(false)}
          />
        )}
        <ModalWindow
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
        >
          <SettingsProfile
            onPopoverClose={() => setIsPopoverOpen(false)}
            isOpen={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
          />
        </ModalWindow>

        {isLogOutModalOpen && (
          <Logout
            onPopoverClose={() => setIsPopoverOpen(false)}
            isOpen={isLogOutModalOpen}
            onClose={() => setIsLogOutModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
export default UserBar;
