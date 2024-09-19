import { useState } from "react";
import Logout from "../Logout/Logout";
import s from "./UserBarPopover.module.css";

export const UserBarPopover = ({ onSettingsClick }) => {
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
        <img src="../../images/sprite.svg#settings" alt="" />
        <button onClick={onSettingsClick}>Settings</button>
      </div>
      <div>
        <button onClick={handleModalOpen} className={s.exit} type="button">
          <img src="../../images/sprite.svg#log-out" alt="" />
        </button>
        <Logout
          modalIsOpen={modalIsOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
        />
      </div>
    </div>
  );
};
