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
                src={userAvatar ? URL.createObjectURL(userAvatar) : user.photo}
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
              <h3>Your Gender identity</h3>
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
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M7.57934 10.4315C7.64769 11.1434 7.76356 11.6724 7.92303 12.0214C8.08447 12.3693 8.37106 12.5429 8.78478 12.5429C8.86212 12.5429 8.93131 12.5308 8.99994 12.5167C9.07025 12.5308 9.13916 12.5429 9.21706 12.5429C9.62966 12.5429 9.91709 12.3693 10.0777 12.0214C10.238 11.6724 10.3519 11.1434 10.4217 10.4315L10.789 4.93532C10.8573 3.86404 10.8922 3.09538 10.8922 2.62879C10.8922 1.99372 10.7265 1.49816 10.3941 1.14238C10.0605 0.7866 9.62234 0.609131 9.07953 0.609131C9.05056 0.609131 9.02891 0.6156 9.0005 0.616725C8.9735 0.6156 8.95128 0.609131 8.92316 0.609131C8.37922 0.609131 7.94187 0.7866 7.60887 1.14238C7.27616 1.49872 7.10938 1.99457 7.10938 2.62907C7.10938 3.09566 7.14341 3.86432 7.21287 4.9356L7.57934 10.4315ZM9.01428 14.5518C8.48722 14.5518 8.03947 14.718 7.66766 15.0505C7.29612 15.3832 7.10994 15.7871 7.10994 16.2613C7.10994 16.7965 7.29837 17.2178 7.67244 17.5238C8.04819 17.8298 8.48637 17.9828 8.98728 17.9828C9.49719 17.9828 9.94184 17.832 10.3221 17.5297C10.7018 17.2282 10.8916 16.8046 10.8916 16.2618C10.8916 15.7876 10.7099 15.3838 10.3466 15.051C9.98319 14.718 9.53909 14.5518 9.01344 14.5518"
                      fill="#9BE1A0"
                    />
                  </svg>
                  <p className={css.textRegular}>Active time in hours</p>
                </div>
              </div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>Your Weight in kilograms:</p>
                <input
                  className={css.userInfoInput}
                  type="number"
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
                  type="number"
                  name="activeTime"
                  value={userInfo.activeTime}
                  step=".1"
                  onChange={handleChange}
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
