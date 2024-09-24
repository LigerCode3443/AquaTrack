import { useState, useEffect, useRef } from "react";

import s from "./UserBar.module.css";
import avatar from "../../images/avatar/avatars.png";
import { UserBarPopover } from "../UserBarPopover/UserBarPopover";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import SvgIcon from "../SvgIcon/SvgIcon";

const UserBar = () => {
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
        Hello,<span>{actualName}</span>
      </h2>
      <div className={s.wrapperBox}>
        <button className={s.bar} ref={userBarRef} onClick={togglePopover}>
          <h3 className={s.s_name}>{actualName}</h3>
          <img
            src={user.userAvatar ? user.userAvatar : avatar}
            alt="avatar"
            className={s.img}
          />
          {/* 
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="white" />
          </svg> */}
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
