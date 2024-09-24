import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalWindow from "../ModalWindow/ModalWindow";
import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./SettingsProfile.module.css";
import { updateUserThunk } from "../../redux/auth/operations";
import { updateWaterThunk } from "../../redux/water/operations";

const UserSchema = Yup.object().shape({
  avatar: Yup.mixed().required("Avatar is required"),
  gender: Yup.string().required("Gender is required"),
  name: Yup.string()
    .trim()
    .min(3, "Min 3 chars!")
    .max(50, "Max 50 chars!")
    .required("Name is required!"),
  email: Yup.string().email().required("Email is required!"),
  weight: Yup.number("Must be a number").required("Weight is required!"),
  time: Yup.number("Must be a number").required("Active time is required!"),
  waterGoal: Yup.number("Must be a number"),
});

const SettingsProfile = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dailyWaterNorm } = useSelector((state) => state.water);
  const [userData, setUserData] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const hiddenInputUpload = useRef(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/users/profile");
        setUserData(response.data);
        setValue("gender", response.data.gender);
        setValue("name", response.data.name);
        setValue("email", response.data.email);
        setValue("weight", response.data.weight);
        setValue("time", response.data.dailyActivityTime || 0);
        setValue("waterGoal", response.data.dailyWaterNorm || 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, setValue]);

  const handleChange = (e) => {
    if (e.target.files) {
      setUserAvatar(e.target.files[0]);
      setValue("avatar", e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("avatar", userAvatar);
    formData.append("gender", data.gender);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("weight", data.weight);
    formData.append("time", data.time);

    if (data.waterGoal) {
      formData.append("waterGoal", data.waterGoal);
    }

    try {
      setLoading(true);
      const response = await axios.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(updateUserThunk(response.data));

      if (data.waterGoal) {
        dispatch(
          updateWaterThunk({
            id: 454555,
            data: {
              userWaterGoal: data.waterGoal,
              quantity: 2000,
            },
          })
        );
      }

      toast.success("User settings updated successfully!");
      onClose();
    } catch (error) {
      toast.error(
        "Error updating user settings: " +
          (error.response?.data?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose}>
      <div className={css.wrapper}>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.userPic}>
            <h2>{t("modals.UserSettingsForm.setting")}</h2>
            <div className={css.picWrapper}>
              <div className={css.pic}>
                <img
                  src={
                    userAvatar
                      ? URL.createObjectURL(userAvatar)
                      : userData?.avatar ||
                        "https://default-avatar-url.com/avatar.jpg"
                  }
                  className={css.avatar}
                  alt="avatar"
                />
              </div>
              <div
                className={css.uploadWrapper}
                onClick={() => hiddenInputUpload.current.click()}
              >
                <SvgIcon
                  id="upload"
                  width={24}
                  height={24}
                  className={css.iconUpload}
                />
                <p className={css.textRegular}>
                  {t("modals.UserSettingsForm.uploadPhotoBtn")}
                </p>
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleChange}
                ref={hiddenInputUpload}
              />
              {errors.avatar && (
                <p className={css.error}>{errors.avatar.message}</p>
              )}
            </div>
          </div>

          <div className={css.inputs}>
            <div className={css.wrapperInputsForm}>
              <div className={css.midContainer}>
                <h3>{t("modals.UserSettingsForm.yourGenderLabel")}</h3>
                <div className={css.radioContainer}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className={css.radioButton}>
                          <input
                            className={css.radio}
                            type="radio"
                            id="woman"
                            value="woman"
                            {...field}
                          />
                          <label className={css.radioLabel} htmlFor="woman">
                            {t("modals.UserSettingsForm.femaleGenderLabel")}
                          </label>
                        </div>
                        <div className={css.radioButton}>
                          <input
                            className={css.radio}
                            type="radio"
                            id="man"
                            value="man"
                            {...field}
                          />
                          <label className={css.radioLabel} htmlFor="man">
                            {t("modals.UserSettingsForm.femaleGenderMale")}
                          </label>
                        </div>
                      </>
                    )}
                  />
                  {errors.gender && (
                    <p className={css.error}>{errors.gender.message}</p>
                  )}
                </div>
              </div>

              <div className={css.midContainer}>
                <div className={css.userInfoInputContainer}>
                  <h3>{t("modals.UserSettingsForm.yourNameLabel")}</h3>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={css.userInfoInput}
                        type="text"
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className={css.error}>{errors.name.message}</p>
                  )}
                </div>
                <div className={css.userInfoInputContainer}>
                  <h3>{t("modals.UserSettingsForm.labelEmail")}</h3>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={css.userInfoInput}
                        type="email"
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className={css.error}>{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className={css.midContainer}>
                <h3>{t("modals.UserSettingsForm.dailyNorma")}</h3>
                <p>{`${dailyWaterNorm || "N/A"} liters`}</p>
              </div>
            </div>

            <div className={css.wrapperInputsForm}>
              <div className={css.midContainer}>
                <div className={css.userInfoInputContainer}>
                  <h3>{t("modals.UserSettingsForm.waterGoalLabel")}</h3>
                  <Controller
                    name="waterGoal"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={css.userInfoInput}
                        type="number"
                        step=".1"
                        {...field}
                        placeholder="Water Goal (ml)"
                      />
                    )}
                  />
                  {errors.waterGoal && (
                    <p className={css.error}>{errors.waterGoal.message}</p>
                  )}
                </div>
                <div className={css.userInfoInputContainer}>
                  <p>{t("modals.UserSettingsForm.TheTimeSportsLabel")}</p>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={css.userInfoInput}
                        type="number"
                        step=".1"
                        {...field}
                      />
                    )}
                  />
                  {errors.time && (
                    <p className={css.error}>{errors.time.message}</p>
                  )}
                </div>
              </div>

              <div className={css.buttonContainer}>
                <button
                  className={css.saveButton}
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? t("loading")
                    : t("modals.UserSettingsForm.saveBtn")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};

export default SettingsProfile;
