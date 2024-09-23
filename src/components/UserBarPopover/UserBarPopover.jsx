import { useState } from "react";
import Logout from "../Logout/Logout";
import SettingsProfile from "../SettingsProfile/SettingsProfile";
import s from "./UserBarPopover.module.css";

export const UserBarPopover = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="popover">
      <div>
        <img src="../../images/sprite.svg#settings" alt="Settings" />
        <button onClick={handleModalOpen}>Settings</button>
      </div>
      <div>
        <button onClick={handleModalOpen} className={s.exit} type="button">
          <img src="../../images/sprite.svg#log-out" alt="Logout" />
        </button>
        <Logout modalIsOpen={modalIsOpen} handleModalClose={handleModalClose} />
      </div>

      <SettingsProfile isOpen={modalIsOpen} onClose={handleModalClose} />
    </div>
  );
};
