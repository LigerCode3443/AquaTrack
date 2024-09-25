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

const SettingsProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [userAvatar, setUserAvatar] = useState(null);
  const [requiredWater, setRequiredWater] = useState("1.5");
  const [loading, setLoading] = useState(false);
  const hiddenInputUpload = useRef(null);

  const UserSchema = Yup.object().shape({
    userName: Yup.string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters"),
    userEmail: Yup.string().email("Invalid email address"),
    userWeight: Yup.number().typeError("Weight must be a number"),
    userActiveTime: Yup.number().typeError("Active time must be a number"),
    userGender: Yup.string(),
    userWaterGoal: Yup.number().typeError("Water goal must be a number"),
  });

  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      userAvatar: user.userAvatar,
      userName: user.userName,
      userGender: user.userGender,
      userEmail: user.userEmail,
      userWeight: user.userWeight,
      userActiveTime: user.userActiveTime,
      userWaterGoal: user.userWaterGoal,
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
        formData.append(key, value);
      });

      if (userAvatar) {
        formData.append("userAvatar", userAvatar);
      }

      const updatedUserData = await dispatch(updateUserThunk(formData));
      toast.success("Profile updated successfully", {
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
          <h2>Settings</h2>
          <div className={css.picWrapper}>
            <div className={css.pic}>
              <img
                src={userAvatar ? URL.createObjectURL(userAvatar) : user.photo}
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
              <p className={css.textRegular}>Upload Photo</p>
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
            <h3>Your Gender identity</h3>
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
                    {genderOption === "female" ? "Female" : "Male"}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={css.inputDesc}>
            <div className={css.wrapperInputsForm}>
              <div className={css.midContainer}>
                <div className={css.userInfoInputContainer}>
                  <h3>Your name</h3>
                  <input
                    className={css.userInfoInput}
                    type="text"
                    {...register("userName")}
                    disabled={loading}
                  />
                </div>
                <div className={css.userInfoInputContainer}>
                  <h3>Email</h3>
                  <input
                    className={css.userInfoInput}
                    type="email"
                    {...register("userEmail")}
                    disabled
                  />
                </div>
                <div className={css.midContainer}>
                  <h3>My Daily Norma</h3>
                  <div className={css.formulaContainer}>
                    <div className={css.formula}>
                      <p className={css.textRegular}>For Women:</p>
                      <p className={css.textAccent}>
                        V = (M * 0.03) + (T * 0.4)
                      </p>
                    </div>
                    <div className={css.formula}>
                      <p className={css.textRegular}>For Men:</p>
                      <p className={css.textAccent}>
                        V = (M * 0.04) + (T * 0.6)
                      </p>
                    </div>
                  </div>
                  <div className={css.textarea}>
                    <span className={css.textAccent}>*</span> V is the volume of
                    the water norm in liters per day, M is your body weight, T
                    is the time of active sports, or another type of activity
                    commensurate in terms of loads (in the absence of these, you
                    must set 0)
                  </div>
                  <div className={css.note}>
                    <SvgIcon id="note-icon" className={css.svgIcon} />
                    <p className={css.textRegular}>Active time in hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>Your Weight in kilograms:</p>
                <input
                  className={css.userInfoInput}
                  type="number"
                  step=".1"
                  {...register("userWeight")}
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  The time of active participation in sports:
                </p>
                <input
                  className={css.userInfoInput}
                  type="number"
                  step=".1"
                  {...register("userActiveTime")}
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  Your Water Goal in liters per day:
                </p>
                <input
                  className={css.userInfoInput}
                  type="number"
                  step=".1"
                  {...register("userWaterGoal")}
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  The required amount of water in liters per day:
                </p>
                <p className={css.textAccent}>
                  {requiredWater
                    ? `${requiredWater} L`
                    : "Write down how much water you will drink"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className={css.saveButton} type="submit" disabled={loading}>
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsProfile;
