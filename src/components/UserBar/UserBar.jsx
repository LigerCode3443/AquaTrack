import { useRef } from "react";
import Logout from "../Logout/Logout";
import SettingsProfile from "../SettingsProfile/SettingsProfile";
import { UserBarPopover } from "../UserBarPopover/UserBarPopover";
import s from "./UserBar.module.css";
import { useState } from "react";
import { useEffect } from "react";

const UserBar = () => {
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
    <div>
      <button className={s.bar} ref={userBarRef} onClick={togglePopover}>
        <h2 className={s.name}></h2>
        <img src="" alt="avatar" className={s.img} />
        <img
          src="../../images/sprite.svg#hide"
          alt="acardion"
          className={s.accardion}
        />
      </button>
      {isPopoverOpen && (
        <UserBarPopover
          onSettingsClick={() => setIsSettingsModalOpen(true)}
          onLogOutClick={() => setIsLogOutModalOpen(true)}
          onClose={() => setIsPopoverOpen(false)}
        />
      )}
      {isSettingsModalOpen && (
        <SettingsProfile onClose={() => setIsSettingsModalOpen(false)} />
      )}
      {isLogOutModalOpen && (
        <Logout onClose={() => setIsLogOutModalOpen(false)} />
      )}
    </div>
  );
};
export default UserBar;
