import css from "./SettingsProfile.module.css";
import toast, { LoaderIcon } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { updateUserThunk } from "../../redux/auth/operations.js";
import SvgIcon from "../SvgIcon/SvgIcon";

const SettingsProfile = ({ setIsUserRefreshed, closeModal }) => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState(user);
  const [name, setName] = useState(userData.name);
  const [gender, setGender] = useState(userData.gender);
  const [email, setEmail] = useState(userData.email);
  const [weight, setWeight] = useState(userData.weight);
  const [userAvatar, setUserAvatar] = useState(null);
  const [requiredWater, setRequiredWater] = useState("1.5");
  const [willWater, setWillWater] = useState(userData.recommendedWater);
  const [time, setTime] = useState(userData.activeTime);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const UserSchema = Yup.object().shape({
    gender: Yup.string(),
    name: Yup.string()
      .trim()
      .min(3, t("modals.UserSettingsForm.validation.nameMin"))
      .max(50, t("modals.UserSettingsForm.validation.nameMax")),
    email: Yup.string().email(
      t("modals.UserSettingsForm.validation.emailInvalid")
    ),
    weight: Yup.number().typeError(
      t("modals.UserSettingsForm.validation.weightNumber")
    ),
    activeTime: Yup.number().typeError(
      t("modals.UserSettingsForm.validation.timeNumber")
    ),
    recommendedWater: Yup.number().typeError(
      t("modals.UserSettingsForm.validation.waterNumber")
    ),
  });

  useEffect(() => {
    if (weight && gender) {
      let newAmount;
      if (gender === "male") {
        newAmount = weight * 0.04 + time * 0.6;
      } else if (gender === "female") {
        newAmount = weight * 0.03 + time * 0.4;
      }
      setRequiredWater((Math.ceil(newAmount * 10) / 10).toFixed(1));
    }
  }, [gender, time, weight]);

  const hiddenInputUpload = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (hiddenInputUpload.current) {
      hiddenInputUpload.current.click();
    }
  };

  const handleChange = (e) => {
    if (e.target.files) {
      const fileUploaded = e.target.files[0];
      setUserAvatar(fileUploaded);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataForValidation = {
      gender,
      name,
      email,
      weight,
      activeTime: time,
      recommendedWater: willWater,
    };

    try {
      const validatedData = await UserSchema.validate(dataForValidation, {
        abortEarly: false,
      });

      const formData = new FormData();
      formData.append("name", validatedData.name);
      formData.append("photo", userAvatar);
      formData.append("activeTime", validatedData.activeTime);
      formData.append("recommendedWater", validatedData.recommendedWater);
      formData.append("email", validatedData.email);
      formData.append("gender", validatedData.gender);
      formData.append("weight", validatedData.weight);

      const updatedUserData = await dispatch(
        updateUserThunk(formData)
      ).unwrap();

      toast.success(t("modals.UserSettingsForm.success"), {
        position: "top-right",
      });
      setUserData(updatedUserData);
      setIsUserRefreshed(true);
      closeModal();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
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
                  userAvatar ? URL.createObjectURL(userAvatar) : userData?.photo
                }
                className={css.avatar}
                alt="avatar"
              />
            </div>
            <div className={css.uploadWrapper} onClick={handleClick}>
              <SvgIcon
                id="upload"
                width="24"
                height="24"
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
                    id="female"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "female"}
                  />
                  <label className={css.radioLabel} htmlFor="female">
                    {t("modals.UserSettingsForm.femaleGenderLabel")}
                  </label>
                </div>
                <div className={css.radioButton}>
                  <input
                    className={css.radio}
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "male"}
                  />
                  <label className={css.radioLabel} htmlFor="male">
                    {t("modals.UserSettingsForm.maleGenderLabel")}
                  </label>
                </div>
              </div>
            </div>

            <div className={css.midContainer}>
              <div className={css.userInfoInputContainer}>
                {t("modals.UserSettingsForm.yourNameLabel")}
                <input
                  className={css.userInfoInput}
                  type="text"
                  name="name"
                  id="name"
                  value={name || userData.name}
                  onChange={(e) => setName(e.target.value)}
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
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <h3>{t("modals.UserSettingsForm.labelWeight")}</h3>
                <input
                  className={css.userInfoInput}
                  type="number"
                  name="weight"
                  id="weight"
                  value={weight || ""}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <h3>{t("modals.UserSettingsForm.labelActiveTime")}</h3>
                <input
                  className={css.userInfoInput}
                  type="number"
                  name="activeTime"
                  id="activeTime"
                  value={time || ""}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className={css.recommendationWrapper}>
              <h3>{t("modals.UserSettingsForm.labelWater")}</h3>
              <div className={css.userInfoInputContainer}>
                <input
                  className={css.userInfoInput}
                  type="number"
                  name="recommendedWater"
                  id="recommendedWater"
                  value={willWater || requiredWater}
                  onChange={(e) => setWillWater(e.target.value)}
                />
              </div>
              <p>
                {t("modals.UserSettingsForm.labelWaterRecommendation")}{" "}
                {requiredWater} l
              </p>
            </div>
          </div>
          <button className={css.saveButton} type="submit" disabled={loading}>
            {loading ? <LoaderIcon /> : t("modals.UserSettingsForm.saveBtn")}
          </button>
        </div>
      </form>
    </div>
  );
};
export default SettingsProfile;
