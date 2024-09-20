import { useState, useEffect } from "react";
import axios from "axios";

import css from "./SettingsProfile.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useTranslation } from 'react-i18next';

export const SettingsProfile = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [formValues, setFormValues] = useState({
    gender: "female",
    name: "",
    email: "",
    weight: null,
    requiredWater: 1.5,
    wantWater: null,
    time: null,
    amount: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/users/profile");
        setUserData(response.data);
        setFormValues((prevValues) => ({
          ...prevValues,
          name: response.data.name || prevValues.name,
          email: response.data.email || prevValues.email,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const { gender, weight, time } = formValues;
    if (weight && time) {
      let newAmount;
      if (gender === "male") {
        newAmount = weight * 0.04 + time * 0.6;
      } else if (gender === "female") {
        newAmount = weight * 0.03 + time * 0.4;
      }
      setFormValues((prevValues) => ({
        ...prevValues,
        amount: (Math.ceil(newAmount * 10) / 10).toFixed(1),
      }));
    }
  }, [formValues.gender, formValues.time, formValues.weight]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserAvatar(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.userPic}>
          <h2>{t("modals.SettingsProfile.setting")}</h2>
          <div className={css.picWrapper}>
            <div className={css.pic}>
              <img
                className={css.avatar}
                src={userAvatar || userData?.avatar}
                alt="avatar"
              />
            </div>
            <div className={css.uploadWrapper}>
              <SvgIcon id="upload" width={24} height={24} />
              <p className={css.textRegular}>
                {t("modals.SettingsProfileForm.uploadPhotoBtn")}
              </p>
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <div className={css.inputs}>
          <div className={css.wrapperInputsForm}>
            <div className={css.midContainer}>
              <h3>{t("modals.SettingsProfileForm.yourGenderLabel")}</h3>
              <div className={css.radioContainer}>
                <div className={css.radioButton}>
                  <input
                    className={css.radio}
                    type="radio"
                    name="gender"
                    id="woman"
                    checked={formValues.gender === "female"}
                    onChange={() =>
                      setFormValues((prev) => ({ ...prev, gender: "female" }))
                    }
                  />
                  <label className={css.radioLabel} htmlFor="woman">
                    {t("modals.SettingsProfileForm.femaleGenderLabel")}
                  </label>
                </div>
                <div className={css.radioButton}>
                  <input
                    className={css.radio}
                    type="radio"
                    name="gender"
                    id="man"
                    checked={formValues.gender === "male"}
                    onChange={() =>
                      setFormValues((prev) => ({ ...prev, gender: "male" }))
                    }
                  />
                  <label className={css.radioLabel} htmlFor="man">
                    {t("modals.SettingsProfileForm.femaleGenderMale")}
                  </label>
                </div>
              </div>
            </div>

            <div className={css.midContainer}>
              <div className={css.userInfoInputContainer}>
                {t("modals.SettingsProfileForm.yourNameLabel")}
                <input
                  className={css.userInfoInput}
                  type="text"
                  name="name"
                  id="name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <h3>{t("modals.SettingsProfileForm.labelEmail")}</h3>
                <input
                  className={css.userInfoInput}
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={css.midContainer}>
              <h3>{t("modals.SettingsProfileForm.dailyNorma")}</h3>
              <div className={css.formulaContainer}>
                <div className={css.formula}>
                  <p className={css.textRegular}>
                    {t("modals.SettingsProfileForm.forWomanP")}
                  </p>
                  <p className={css.textAccent}>V=(M*0,03) + (T*0,4)</p>
                </div>
                <div className={css.formula}>
                  <p className={css.textRegular}>
                    {t("modals.SettingsProfileForm.forManP")}
                  </p>
                  <p className={css.textAccent}>V=(M*0,04) + (T*0,6)</p>
                </div>
              </div>
              <div className={css.textarea}>
                <span className={css.textAccent}>*</span>{" "}
                {t("modals.SettingsProfileForm.starText")}
              </div>
              <div className={css.note}>
                <SvgIcon id="note-icon" width={18} height={18} />
                <p className={css.textRegular}>
                  {t("modals.SettingsProfileForm.activeText")}
                </p>
              </div>
            </div>
          </div>

          <div className={css.wrapperInputsForm}>
            <div className={css.midContainer}>
              <div className={`${css.userInfoInputContainer} ${css.down}`}>
                <p className={css.textRegular}>
                  {t("modals.SettingsProfileForm.infoUser")}
                </p>
                <input
                  className={css.userInfoInput}
                  type="number"
                  name="weight"
                  id="weight"
                  step=".1"
                  value={formValues.weight || ""}
                  onChange={handleChange}
                />
              </div>
              <div className={css.userInfoInputContainer}>
                <p className={css.textRegular}>
                  {t("modals.SettingsProfileForm.TheTimeSportsLabel")}
                </p>
                <input
                  className={css.userInfoInput}
                  type="number"
                  name="time"
                  id="time"
                  step=".1"
                  value={formValues.time || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={css.midContainer}>
              <div className={`${css.userInfoInputContainer} ${css.amount}`}>
                <p className={css.textRegular}>
                  {t("modals.SettingsProfileForm.requiredWater")}
                </p>
                <p className={css.textAccent}>{formValues.amount}</p>
              </div>
            </div>

            <div className={css.userInfoInputContainer}>
              <h3>{t("modals.SettingsProfileForm.writeDownLabel")}</h3>
              <input
                className={css.userInfoInput}
                type="number"
                name="wantWater"
                id="wantWater"
                step=".1"
                value={formValues.wantWater || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={css.buttonContainer}>
          <button className={css.saveButton} type="submit">
            {t("modals.SettingsProfileForm.saveBtn")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsProfile;
