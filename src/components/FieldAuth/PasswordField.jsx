import {useState} from "react";

import SvgIcon from "../SvgIcon/SvgIcon";

import css from "./FieldAuth.module.css";

const PasswordField = ({label, placeholder, register, errorMessage}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <label className={css.group_field}>
      <span className={css.label_text}>{label}</span>
      <span className={css.field__icon}>
        <input
          type={isShowPassword ? "text" : "password"}
          className={errorMessage ? css.errorField : css.field}
          placeholder={placeholder}
          {...register}
        />

        <button type="button" onClick={toggleShowPassword} className={css.icon}>
          {isShowPassword ? (
            <SvgIcon id="eye" width={20} height={20} />
          ) : (
            <SvgIcon id="hide" width={20} height={20} />
          )}
        </button>
      </span>
    </label>
  );
};
export default PasswordField;
