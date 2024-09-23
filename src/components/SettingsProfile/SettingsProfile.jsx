import css from "./SettingsProfile.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useModalContext } from "../../context/useContext.jsx";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
/*import {
  calculateRequiredWater,
  setDailyWaterNorm,
} from "../../redux/store.js";*/

export const SettingsProfile = () => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const { userWeight, dailyWaterNorm } = useSelector((state) => state.water);

  const [userData, setUserData] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [gender, setGender] = useState("woman");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState(userWeight || null);
  const [time, setTime] = useState(0);
  const hiddenInputUpload = useRef(null);

  const UserSchema = Yup.object().shape({
    gender: Yup.string().required("is required!"),
    name: Yup.string()
      .trim()
      .min(3, "Min 3 chars!")
      .max(50, "Max 50 chars!")
      .required("is required!"),
    email: Yup.string().email().required("is required!"),
    weight: Yup.number("must be a number").required("is required!"),
    time: Yup.number("must be a number").required("is required!"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users/profile");
        setUserData(response.data);
        setGender(response.data.gender);
        setName(response.data.name);
        setEmail(response.data.email);
        setWeight(response.data.weight);
        setTime(response.data.dailyActivityTime || 0);
        //dispatch(setDailyWaterNorm(response.data.dailyWaterNorm));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  /*useEffect(() => {
    if (weight && gender) {
      const newAmount =
        gender === "man"
          ? weight * 0.04 + time * 0.6
          : weight * 0.03 + time * 0.4;
      dispatch(calculateRequiredWater(newAmount));
    }
  }, [gender, time, weight, dispatch]);*/

  const handleClick = (e) => {
    e.preventDefault();
    hiddenInputUpload.current?.click();
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setUserAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForValidation = {
      gender,
      name,
      email,
      weight,
      time,
    };

    try {
      await UserSchema.validate(dataForValidation, {
        abortEarly: false,
      });

      await axios.put("/users/profile", dataForValidation);
      toast.success("User settings updated successfully!");
      closeModal();
    } catch (validationErrors) {
      validationErrors.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
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
            <div className={css.uploadWrapper} onClick={handleClick}>
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
          </div>
        </div>

        <div className={css.inputs}>
          <div className={css.wrapperInputsForm}>
            <div className={css.midContainer}>
              <h3>{t("modals.UserSettingsForm.yourGenderLabel")}</h3>
              <div className={css.radioContainer}>
                <div className={css.radioButton}>
                  <input
                    className={css.radio}
                    type="radio"
                    name="gender"
                    id="woman"
                    value="woman"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "woman"}
                  />
                  <label className={css.radioLabel} htmlFor="woman">
                    {t("modals.UserSettingsForm.femaleGenderLabel")}
                  </label>
                </div>
                <div className={css.radioButton}>
                  <input
                    className={css.radio}
                    type="radio"
                    name="gender"
                    id="man"
                    value="man"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "man"}
                  />
                  <label className={css.radioLabel} htmlFor="man">
                    {t("modals.UserSettingsForm.femaleGenderMale")}
                  </label>
                </div>
              </div>
            </div>

            <div className={css.midContainer}>
              <div className={css.userInfoInputContainer}>
                <h3>{t("modals.UserSettingsForm.yourNameLabel")}</h3>
                <input
                  className={css.userInfoInput}
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <h3>{t("modals.UserSettingsForm.labelEmail")}</h3>
                <input
                  className={css.userInfoInput}
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={css.midContainer}>
              <h3>{t("modals.UserSettingsForm.dailyNormah")}</h3>
              <p>{`${dailyWaterNorm || "N/A"} liters`}</p>
            </div>
          </div>

          <div className={css.wrapperInputsForm}>
            <div className={css.midContainer}>
              <div className={css.userInfoInputContainer}>
                <p>{t("modals.UserSettingsForm.infoUser")}</p>
                <input
                  className={css.userInfoInput}
                  type="number"
                  name="weight"
                  id="weight"
                  step=".1"
                  value={weight || ""}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <p>{t("modals.UserSettingsForm.TheTimeSportsLabel")}</p>
                <input
                  className={css.userInfoInput}
                  type="number"
                  name="time"
                  id="time"
                  step=".1"
                  value={time || ""}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={css.buttonContainer}>
              <button className={css.saveButton} type="submit">
                {t("modals.UserSettingsForm.saveBtn")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsProfile;
