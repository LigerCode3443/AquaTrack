import ReactModal from "react-modal";
import css from "./Modal.module.css";

export default function ModalWindow({ isOpen, onClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className={css.modalWindow}
      ariaHideApp={false}
      overlayClassName={css.overlay}
    >
      <div className={css.closeIcon} onClick={() => onClose()}>
        <span
          className={css.icon}
          style={{ backgroundImage: `url('/src/images/sprite.svg#close')` }}
        ></span>
      </div>
      {children}
    </ReactModal>
  );
}
