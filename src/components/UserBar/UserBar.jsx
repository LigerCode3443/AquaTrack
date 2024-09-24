import { useState, useEffect, useRef } from "react";

import s from "./UserBar.module.css";
import avatar from "../../images/avatar/avatars.png";
import { UserBarPopover } from "../UserBarPopover/UserBarPopover";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useTranslation } from "react-i18next";

const UserBar = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const userBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userBarRef.current && !userBarRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userBarRef]);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const userName = user.userEmail?.slice(0, user.userEmail?.indexOf("@"));
  const actualName = user.userName ? user.userName : userName;

  return (
    <div className={s.wrapper}>
      <h2 className={s.name}>
        {t("description.userBar.helloText")}
        <span>{actualName}</span>
      </h2>
      <div className={s.wrapperBox}>
        <button className={s.bar} ref={userBarRef} onClick={togglePopover}>
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
            onSettingsClick={() => setIsSettingsModalOpen(true)}
            onLogOutClick={() => setIsLogOutModalOpen(true)}
            onClose={() => setIsPopoverOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
export default UserBar;
