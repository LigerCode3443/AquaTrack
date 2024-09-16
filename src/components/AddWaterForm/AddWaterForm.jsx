import { useEffect, useState } from "react";
import s from "./AddWaterForm.module.css";

import Modal from "react-modal";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(47, 47, 47, 0.60)",
  },
};

const AddWaterForm = ({ modalIsOpen, closeModal }) => {
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState("");
  const [waterAmount, setWaterAmount] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);
  }, []);

  const decreaseCounter = () => {
    if (counter > 0) setCounter(counter - 50);
  };

  const increaseCounter = () => {
    setCounter(counter + 50);
  };

  const handleSave = () => {
    const data = {
      counter,
      time,
      waterAmount,
    };
    console.log("Збережені дані:", data);
    alert("Дані збережені!");
  };

  return (
    <div>
      <Modal
        isOpen="true" //ЗМІНИТИ
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={s.container}>
          <h2 className="header">Add water</h2>
          <div className="form">
            <h3 className="form_header">Choose a value</h3>
            <label htmlFor="counter" className="counter_label">
              Amount of water:
            </label>
            <div className="counter">
              <button onClick={decreaseCounter} className="decrease_btn">
                -
              </button>
              <input type="number" value={counter} readOnly /> мл
              <button onClick={increaseCounter} className="increase_btn">
                +
              </button>
            </div>
            <div className="time_input">
              <label htmlFor="time" className="time_label">
                Recording time:
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="time_input"
              />
            </div>
            <div className="water_amount">
              <label htmlFor="waterAmount" className="water_label">
                Enter the value of the water used:
              </label>
              <input
                type="number"
                id="waterAmount"
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
                placeholder="Введіть кількість"
                className="water_input"
              />
            </div>
            <button onClick={handleSave} className="save_btn">
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddWaterForm;
