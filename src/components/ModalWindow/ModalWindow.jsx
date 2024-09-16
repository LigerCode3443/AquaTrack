import ReactModal from "react-modal";
import css from "./Modal.module.css";
import * as Icons from "../../../static-assets/icons";

export default function ModalWindow({
  isOpen,
  onClose,
  children,
  iconName = "Close",
}) {
  const renderIcon = () => {
    if (Icons[iconName]) {
      const CustomIcon = Icons[iconName];
      return <CustomIcon width={28} height={28} />;
    }

    return <span>No Icon</span>;
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className={css.modalWindow}
      ariaHideApp={false}
      overlayClassName={css.overlay}
    >
      <div className={css.closeIcon} onClick={() => onClose()}>
        {renderIcon()}
      </div>
      {children}
    </ReactModal>
  );
}
