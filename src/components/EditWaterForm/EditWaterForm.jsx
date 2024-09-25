import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import SvgIcon from "../SvgIcon/SvgIcon";
import {
  updateWaterThunk,
  getOneRecordThunk,
} from "../../redux/water/operations";
import { selectOneRecord } from "../../redux/water/selectors";
import { selectUserWaterGoal } from "../../redux/auth/selectors";
import s from "./EditWaterForm.module.css";
import i18next from "../../localization/configI18n.js";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  waterAmount: Yup.number()
    .min(50, i18next.t("description.validationWater.waterMin"))
    .max(5000, i18next.t("description.validationWater.waterMax"))
    .required(i18next.t("description.validationWater.waterQuantity")),
  time: Yup.string().required(
    i18next.t("description.validationWater.waterTime")
  ),
});

const EditWaterForm = ({ waterId }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState("");
  const dispatch = useDispatch();

  const waterRecord = useSelector(selectOneRecord);
  const userWaterGoal = useSelector(selectUserWaterGoal);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      waterAmount: 0,
      time: "",
    },
  });

  useEffect(() => {
    dispatch(getOneRecordThunk(waterId));
  }, [dispatch, waterId]);

  useEffect(() => {
    if (waterRecord) {
      setCounter(waterRecord.quantity);
      setTime(new Date(waterRecord.date).toISOString().substring(11, 16));
      setValue("waterAmount", waterRecord.quantity);
      setValue(
        "time",
        new Date(waterRecord.date).toISOString().substring(11, 16)
      );
    }
  }, [waterRecord, setValue]);

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

  const onSubmit = async (data) => {
    try {
      const date = new Date(waterRecord.date);
      const [hours, minutes] = data.time.split(":");
      date.setHours(hours);
      date.setMinutes(minutes);

      await dispatch(
        updateWaterThunk({
          id: waterId,
          data: {
            userWaterGoal: userWaterGoal,
            date: date.toISOString(),
            quantity: data.waterAmount,
          },
        })
      ).unwrap();

      toast.success(t("description.toastAlerts.waterRecordSuccess"));
    } catch (error) {
      if (error.status === 400) {
        toast.error(t("description.toastAlerts.waterIncorrectData"));
      } else if (error.status === 404) {
        toast.error(t("description.toastAlerts.waterResourceError"));
      } else {
        toast.error(t("description.toastAlerts.waterRecordError"));
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
        <h2 className={s.header}>{t("description.editWater.titleText")}</h2>
        <div className={s.wrapper}>
          <h3 className={s.form_header}>
            {t("description.editWater.correctText")}
          </h3>
          <div className={s.counter_container}>
            <label htmlFor="counter" className={s.counter_label}>
              {t("description.editWater.amountWaterText")}
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
                <span className={s.unit}>{t("description.editWater.ml")}</span>
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
              {t("description.editWater.recordingTimeText")}
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
            {t("description.editWater.usedWaterText")}
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
          {t("description.editWater.saveBtn")}
        </button>
      </form>
    </div>
  );
};
export default EditWaterForm;
