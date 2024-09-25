import Modal from "react-modal";
import {motion} from "framer-motion";
import css from "./ModalWindow.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 50px 0 rgba(0, 0, 0, 0.1)",
    border: "none",
    borderRadius: "15px",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(47, 47, 47, 0.6)",
    zIndex: "3",
  },
};

Modal.setAppElement("#root");

export default function ModalWindow({isOpen, onClose, children}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1}}
      >
        <button className={css.close} onClick={onClose}>
          <SvgIcon id="close" width={28} height={28} stroke="#2F2F2F" />
        </button>
        <div className={css.wrapper}>{children}</div>
      </motion.div>
    </Modal>
  );
}
