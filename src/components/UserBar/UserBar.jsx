import { useState, useEffect, useRef } from "react";

import s from "./UserBar.module.css";
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

  return (
    <div className={s.wrapper}>
      <h2 className={s.name}>
        Hello,<span>{user.username}</span>
      </h2>
      <button className={s.bar} ref={userBarRef} onClick={togglePopover}>
        <h3 className={s.s_name}>{user.username}</h3>
        <img src={user.avatar} alt="avatar" className={s.img} />

        <SvgIcon id="arrow-down" width={12} height={8} />
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
  );
};
export default UserBar;
