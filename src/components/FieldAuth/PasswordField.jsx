import {useState} from "react";
import IconPasswordIsVisible from "../IconPassword/IconPasswordIsVisible";
import IconPasswordNotVisible from "../IconPassword/IconPasswordNotVisible";
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

        {isShowPassword ? (
          <IconPasswordIsVisible onClick={toggleShowPassword} />
        ) : (
          <IconPasswordNotVisible onClick={toggleShowPassword} />
        )}
      </span>
    </label>
  );
};
export default PasswordField;
