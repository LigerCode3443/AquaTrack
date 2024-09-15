import css from "./SettingsProfile.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const SettingsProfile = () => {
  const [userAvatar, setUserAvatar] = useState(null);
  const [gender, setGender] = useState("female");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [requiredWater, setRequiredWater] = useState(1.5);
  const [wantWater, setWantWater] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/users/???");
        setUserAvatar(response.data.avatar);
        setName(response.data.name);
        setEmail(response.data.email);
        setWeight(response.data.weight);
        setTime(response.data.time);
        setGender(response.data.gender);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (weight && time) {
      let waterAmount = 1.5;
      if (gender === "female") {
        waterAmount = weight * 0.03 + time * 0.4;
      } else {
        waterAmount = weight * 0.04 + time * 0.6;
      }
      setRequiredWater(waterAmount.toFixed(2));
    }
  }, [weight, time, gender]);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings saved!");
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <div className={css.avatarSettingWrapper}>
          <h2>Setting</h2>
          <img src={userAvatar} alt="user avatar" />
          <button type="button">Upload a photo</button>
        </div>

        <div className={css.userSettingWrapper}>
          <div className={css.genderInputWrapper}>
            <label>Your gender identity</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                Male
              </label>
            </div>
          </div>
          <div className={css.userDataWrapper}>
            <div className={css.userNameWrapper}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={css.userEmailWrapper}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={css.dailyNormaWrapper}>
            <h2>My daily norm</h2>
            <div className={css.mathWrapper}>
              <div className={css.formulaWrapper}>
                <p>For women:</p>
                <p>V = (M * 0.03) + (T * 0.4)</p>
              </div>
              <div className={css.formulaWrapper}>
                <p>For men:</p>
                <p>V = (M * 0.04) + (T * 0.6)</p>
              </div>
              <p className={css.howItWorks}>
                * V is the volume of the water norm in liters per day, M is your
                body weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </p>
              <p className={css.warning}>Active time in hours</p>
              <div className={css.weightTimeWrapper}>
                <div className={css.weightWrapper}>
                  <label htmlFor="weight">Your weight in kilograms</label>
                  <input
                    type="text"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className={css.timeWrapper}>
                  <label htmlFor="time">
                    The time of active participation in sports:
                  </label>
                  <input
                    type="text"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className={css.waterNeedsWrapper}>
                <div className={css.requiredWater}>
                  <p>The required amount of water in liters per day:</p>
                  <p>{requiredWater}</p>
                </div>
                <div className={css.requiredWater}>
                  <label htmlFor="waterNeed">
                    Write down how much water you will drink:
                  </label>
                  <input
                    type="text"
                    id="waterNeed"
                    value={wantWater}
                    onChange={(e) => setWantWater(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default SettingsProfile;
