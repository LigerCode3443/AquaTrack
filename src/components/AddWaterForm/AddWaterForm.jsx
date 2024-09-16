import { useEffect, useState } from "react";
import s from "./AddWaterForm.module.css";

const AddWaterForm = () => {
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const [isOpen, setIsOpen] = useState(true);

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

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={s.backdrop}>
          <div className={s.container}>
            <h2 className="header">Add water</h2>
            <button className="close_btn" onClick={handleClose}>
              X
            </button>
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
        </div>
      )}
    </>
  );
};

export default AddWaterForm;
