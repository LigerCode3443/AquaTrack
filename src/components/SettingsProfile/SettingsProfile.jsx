import css from "./SettingsProfile.module.css";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { updateUserThunk } from "../../redux/auth/operations.js";
import SvgIcon from "../SvgIcon/SvgIcon";

const SettingsProfile = ({ setIsUserRefreshed, closeModal }) => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [userInfo, setUserInfo] = useState({
    name: user.name,
    gender: user.gender,
    email: user.email,
    weight: user.weight,
    activeTime: user.activeTime,
    recommendedWater: user.recommendedWater,
  });

  const [userAvatar, setUserAvatar] = useState(null);
  const [requiredWater, setRequiredWater] = useState("1.5");
  const [loading, setLoading] = useState(false);

  const hiddenInputUpload = useRef(null);

  const UserSchema = Yup.object().shape({
    gender: Yup.string().required("Gender is required"),
    name: Yup.string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    weight: Yup.number()
      .typeError("Weight must be a number")
      .required("Weight is required"),
    activeTime: Yup.number()
      .typeError("Active time must be a number")
      .required("Active time is required"),
    recommendedWater: Yup.number()
      .typeError("Water must be a number")
      .required("Recommended water is required"),
  });

  useEffect(() => {
    if (userInfo.weight && userInfo.gender) {
      const newAmount =
        userInfo.gender === "male"
          ? userInfo.weight * 0.04 + userInfo.activeTime * 0.6
          : userInfo.weight * 0.03 + userInfo.activeTime * 0.4;

      setRequiredWater((Math.ceil(newAmount * 10) / 10).toFixed(1));
    }
  }, [userInfo.gender, userInfo.activeTime, userInfo.weight]);

  const handleClick = (e) => {
    e.preventDefault();
    hiddenInputUpload.current?.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await UserSchema.validate(userInfo, { abortEarly: false });

      const formData = new FormData();
      Object.entries(userInfo).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (userAvatar) {
        formData.append("photo", userAvatar);
      }

      const updatedUserData = await dispatch(
        updateUserThunk(formData)
      ).unwrap();

      toast.success("Profile updated successfully", {
        position: "top-right",
      });
      setUserInfo(updatedUserData);
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
          <h2>Settings</h2>
          <div className={css.picWrapper}>
            <div className={css.pic}>
              <img
                src={userAvatar ? URL.createObjectURL(userAvatar) : user?.photo}
                className={css.avatar}
                alt="User Avatar"
              />
            </div>
            <div className={css.uploadWrapper} onClick={handleClick}>
              <SvgIcon
                id="upload"
                width="24"
                height="24"
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
          <div className={css.wrapperInputsForm}>
            <div className={css.midContainer}>
              <h3>Your gender identity</h3>
              <div className={css.radioContainer}>
                {["female", "male"].map((genderOption) => (
                  <div className={css.radioButton} key={genderOption}>
                    <input
                      className={css.radio}
                      type="radio"
                      name="gender"
                      id={genderOption}
                      value={genderOption}
                      onChange={handleChange}
                      checked={userInfo.gender === genderOption}
                    />
                    <label className={css.radioLabel} htmlFor={genderOption}>
                      {genderOption === "female" ? "Female" : "Male"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={css.midContainer}>
              <div className={css.userInfoInputContainer}>
                <h3>Your name</h3>
                <input
                  className={css.userInfoInput}
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <h3>Email</h3>
                <input
                  className={css.userInfoInput}
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className={css.midContainer}>
                <h3>My Daily Norma</h3>
                <div className={css.formulaContainer}>
                  <div className={css.formula}>
                    <p className={css.textRegular}>For Women:</p>
                    <p className={css.textAccent}>V = (M * 0.03) + (T * 0.4)</p>
                  </div>
                  <div className={css.formula}>
                    <p className={css.textRegular}>For Men:</p>
                    <p className={css.textAccent}>V = (M * 0.04) + (T * 0.6)</p>
                  </div>
                </div>
                <div className={css.textarea}>
                  <span className={css.textAccent}>*</span> V is the volume of
                  the water norm in liters per day, M is your body weight, T is
                  the time of active sports, or another type of activity
                  commensurate in terms of loads (in the absence of these, you
                  must set 0)
                </div>
                <div className={css.note}>
                  <p className={css.textRegular}>Active time in hours</p>
                </div>
              </div>
            </div>
            <div className={css.wrapperInputsForm}>
              <div className={css.midContainer}>
                <div className={css.userInfoInputContainer}>
                  <p className={css.textRegular}>Your Weight in kilograms:</p>
                  <input
                    className={css.userInfoInput}
                    type="text"
                    name="weight"
                    value={userInfo.weight}
                    step=".1"
                    onChange={handleChange}
                  />
                </div>
                <div className={css.userInfoInputContainer}>
                  <p className={css.textRegular}>
                    The time of active participation in sports:
                  </p>
                  <input
                    className={css.userInfoInput}
                    type="text"
                    name="activeTime"
                    value={userInfo.activeTime}
                    step=".1"
                    onChange={handleChange}
                  />
                </div>
                <div className={css.midContainer}>
                  <div
                    className={`${css.userInfoInputContainer} ${css.amount}`}
                  >
                    <div className={css.userInfoInputContainer}>
                      <p className={css.textRegular}>
                        The required amount of water in liters per day:
                      </p>
                      <p className={css.textAccent}>
                        {requiredWater
                          ? `${requiredWater} L`
                          : "The required amount of water in liters per day:"}
                      </p>
                      <h3>Write down how much water you will drink:</h3>
                      <input
                        className={css.userInfoInput}
                        type="text"
                        name="water"
                        value={userInfo.recommendedWater}
                        id="water"
                        step=".1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={css.buttonContainer}>
          <button className={css.saveButton} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsProfile;
