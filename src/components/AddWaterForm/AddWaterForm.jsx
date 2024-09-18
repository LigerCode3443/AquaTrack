import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./AddWaterForm.module.css";

//!У разі наявності не валідних значень, причина помилки повинна бути відображена користувачеві, а дані - не відправлятися на backend. У разі, якщо всі значення валідні, - на backend слід відправити відповідний запит для додавання/редагування запису про порцію спожитої води.Якщо backend повернув помилку - необхідно її опрацювати і відобразити користувачеві у вигляді спливаючого вікна-notification. Якщо запит на backend пройшов успішно - модальне вікно WaterModal слід закрити, а дані у WaterProgressBar, WaterList та Calendar - актуалізувати за допомогою redux

const validationSchema = Yup.object().shape({
  waterAmount: Yup.number()
    .min(50, "Мінімальна кількість води — 50 мл")
    .max(5000, "Максимальна кількість води — 5000 мл")
    .required("Кількість води обов'язкова"),
  time: Yup.string().required("Час запису обов'язковий"),
});

const AddWaterForm = () => {
  const [counter, setCounter] = useState(50);
  const [time, setTime] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      waterAmount: 50,
      time: "",
    },
  });

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);
    setValue("time", formattedTime);
  }, [setValue]);

  const decreaseCounter = () => {
    if (counter > 50) {
      const newValue = counter - 50;
      setCounter(newValue);
      setValue("waterAmount", newValue);
    }
  };

  const increaseCounter = () => {
    if (counter < 5000) {
      const newValue = counter + 50;
      setCounter(newValue);
      setValue("waterAmount", newValue);
    }
  };

  const onSubmit = (data) => {
    console.log("Збережені дані:", data);
    alert("Дані збережені!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
      <h2 className={s.header}>Add water</h2>
      <div className={s.wrapper}>
        <h3 className={s.form_header}>Choose a value</h3>
        <div className={s.counter_container}>
          <label htmlFor="counter" className={s.counter_label}>
            Amount of water:
          </label>
          <div className={s.counter}>
            <button
              type="button"
              onClick={decreaseCounter}
              className={s.decrease_btn}
            >
              <SvgIcon id="minus" width="25" height="25" />
            </button>
            <div className={s.counter_input_wrapper}>
              <input
                type="number"
                value={counter}
                readOnly
                className={s.water_counter}
              />
              <span className={s.unit}>ml</span>
            </div>

            <button
              type="button"
              onClick={increaseCounter}
              className={s.increase_btn}
            >
              <SvgIcon id="plus" width="25" height="25" />
            </button>
          </div>
        </div>
        <div className={s.time_container}>
          <label htmlFor="time" className={s.time_label}>
            Recording time:
          </label>
          <input
            type="time"
            id="time"
            {...register("time")}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={s.time_input}
          />
          {errors.time && (
            <span className={s.error}>{errors.time.message}</span>
          )}
        </div>
      </div>
      <div className={s.water_amount}>
        <label htmlFor="waterAmount" className={s.water_label}>
          Enter the value of the water used:
        </label>
        <input
          type="number"
          id="waterAmount"
          {...register("waterAmount")}
          value={counter}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setCounter(value);
            setValue("waterAmount", value);
          }}
          max="5000"
          className={s.water_input}
        />
        {errors.waterAmount && (
          <span className={s.error}>{errors.waterAmount.message}</span>
        )}
      </div>
      <button type="submit" className={s.save_btn}>
        Save
      </button>
    </form>
  );
};

export default AddWaterForm;
