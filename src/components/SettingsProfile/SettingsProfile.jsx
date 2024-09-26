import css from "./SettingsProfile.module.css";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { updateUserThunk } from "../../redux/auth/operations.js";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import defaultAvatar from "../../images/avatar/avatars.png";
import { useTranslation } from "react-i18next";
import i18next from "../../localization/configI18n.js";

const SettingsProfile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [userAvatar, setUserAvatar] = useState(null);
  const [requiredWater, setRequiredWater] = useState("1.5");
  const [loading, setLoading] = useState(false);
  const hiddenInputUpload = useRef(null);

  const UserSchema = Yup.object().shape({
    userName: Yup.string()
      .trim()
      .min(3, i18next.t("description.validationSettings.nameMin"))
      .max(15, i18next.t("description.validationSettings.nameMax")),
    userEmail: Yup.string().email(
      i18next.t("description.validationSettings.userEmail")
    ),
    userWeight: Yup.number()
      .min(0)
      .max(635)
      .typeError(i18next.t("description.validationSettings.userWeight"))
      .required(),
    userActiveTime: Yup.number()
      .min(0)
      .typeError(i18next.t("description.validationSettings.userActiveTime"))
      .required(),
    userGender: Yup.string(),
    userWaterGoal: Yup.number()
      .min(0)
      .max(15000)
      .typeError(i18next.t("description.validationSettings.userWaterGoal")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      userAvatar: user.userAvatar,
      userName:
        user.userName || user.userEmail?.slice(0, user.userEmail?.indexOf("@")),
      userGender: user.userGender,
      userEmail: user.userEmail,
      userWeight: user.userWeight,
      userActiveTime: user.userActiveTime,
      userWaterGoal: user.userWaterGoal / 1000,
    },
  });

  const userWeight = watch("userWeight");
  const userGender = watch("userGender");
  const userActiveTime = watch("userActiveTime");

  useEffect(() => {
    if (userWeight && userGender) {
      const newAmount =
        userGender === "male"
          ? userWeight * 0.04 + userActiveTime * 0.6
          : userWeight * 0.03 + userActiveTime * 0.4;

      setRequiredWater((Math.ceil(newAmount * 10) / 10).toFixed(1));
    }
  }, [userGender, userActiveTime, userWeight]);

  const handleClick = (e) => {
    e.preventDefault();
    hiddenInputUpload.current?.click();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "userWaterGoal") {
          formData.append(key, value * 1000);
        } else formData.append(key, value);
      });

      if (userAvatar) {
        formData.append("userAvatar", userAvatar);
      }

      dispatch(updateUserThunk(formData));
      toast.success(t("description.toastAlerts.settingsUpdateSuccess"), {
        position: "top-right",
      });
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
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.userPic}>
          <h2>{t("description.settings.titleText")}</h2>
          <div className={css.picWrapper}>
            <div className={css.pic}>
              <img
                src={
                  userAvatar
                    ? URL.createObjectURL(userAvatar)
                    : user.userAvatar || defaultAvatar
                }
                className={css.avatar}
                alt="User Avatar"
              />
            </div>
            <div className={css.uploadWrapper} onClick={handleClick}>
              <SvgIcon
                id="upload"
                width="18"
                height="18"
                className={css.iconUpload}
              />
              <p className={css.textRegular}>
                {t("description.settings.uploadBtn")}
              </p>
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => setUserAvatar(e.target.files[0])}
              ref={hiddenInputUpload}
            />
          </div>
        </div>

        <div className={css.inputs}>
          <div className={css.midContainer}>
            <h3>{t("description.settings.genderText")}</h3>
            <div className={css.radioContainer}>
              {["female", "male"].map((genderOption) => (
                <div className={css.radioButton} key={genderOption}>
                  <input
                    className={css.radio}
                    type="radio"
                    {...register("userGender")}
                    id={genderOption}
                    value={genderOption}
                  />
                  <label className={css.radioLabel} htmlFor={genderOption}>
                    {genderOption === "female"
                      ? t("description.settings.womanText")
                      : t("description.settings.manText")}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={css.inputDesc}>
            <div className={css.wrapperInputsForm}>
              <div className={css.midContainer}>
                <div className={css.userInfoInputContainer}>
                  <h3>{t("description.settings.nameText")}</h3>
                  <input
                    className={
                      errors.userName
                        ? css.userInfoInputError
                        : css.userInfoInput
                    }
                    type="text"
                    {...register("userName")}
                    disabled={loading}
                  />
                  {errors.userName && (
                    <span className={css.error}>{errors.userName.message}</span>
                  )}
                </div>
                <div className={css.userInfoInputContainer}>
                  <h3>{t("description.settings.emailText")}</h3>
                  <input
                    className={
                      errors.userEmail
                        ? css.userInfoInputError
                        : css.userInfoInput
                    }
                    type="email"
                    {...register("userEmail")}
                    disabled
                  />
                  {errors.userEmail && (
                    <span className={css.error}>
                      {errors.userEmail.message}
                    </span>
                  )}
                </div>
                <div className={css.midContainer}>
                  <h3>{t("description.settings.normaText")}</h3>
                  <div className={css.formulaContainer}>
                    <div className={css.formula}>
                      <p className={css.textRegular}>
                        {t("description.settings.forWomanText")}
                      </p>
                      <p className={css.textAccent}>
                        V = (M * 0.03) + (T * 0.4)
                      </p>
                    </div>
                    <div className={css.formula}>
                      <p className={css.textRegular}>
                        {t("description.settings.forManText")}
                      </p>
                      <p className={css.textAccent}>
                        V = (M * 0.04) + (T * 0.6)
                      </p>
                    </div>
                  </div>
                  <div className={css.textarea}>
                    <span className={css.textAccent}>*</span>{" "}
                    {t("description.settings.formulaExplanation")}
                  </div>
                  <div className={css.note}>
                    <SvgIcon id="note-icon" className={css.svgIcon} />
                    <p className={css.textRegular}>
                      {t("description.settings.activeTimeHour")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.userParams}>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  {t("description.settings.weightText")}
                </p>
                <input
                  className={
                    errors.userWeight
                      ? css.userInfoInputError
                      : css.userInfoInput
                  }
                  type="number"
                  step=".1"
                  {...register("userWeight")}
                />
                {errors.userWeight && (
                  <span className={css.error}>{errors.userWeight.message}</span>
                )}
              </div>

              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  {t("description.settings.activeTimeText")}
                </p>
                <input
                  className={
                    errors.userActiveTime
                      ? css.userInfoInputError
                      : css.userInfoInput
                  }
                  type="number"
                  step=".1"
                  {...register("userActiveTime")}
                />
                {errors.userActiveTime && (
                  <span className={css.error}>
                    {errors.userActiveTime.message}
                  </span>
                )}
              </div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  {t("description.settings.waterGoalText")}{" "}
                  <span className={css.textAccent}>{`${requiredWater} ${t(
                    "description.titles.L"
                  )}`}</span>
                </p>
              </div>
              <div className={css.userInfoInputContainer}>
                <h3 className={css.textWaterGoal}>
                  {t("description.settings.waterToDrinkText")}{" "}
                </h3>
                <input
                  className={
                    errors.userWaterGoal
                      ? css.userInfoInputError
                      : css.userInfoInput
                  }
                  type="number"
                  step=".1"
                  {...register("userWaterGoal")}
                />
                {errors.userWaterGoal && (
                  <span className={css.error}>
                    {errors.userWaterGoal.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className={css.saveButton} type="submit" disabled={loading}>
          {t("description.settings.save")}
        </button>
      </form>
    </div>
  );
};

export default SettingsProfile;
