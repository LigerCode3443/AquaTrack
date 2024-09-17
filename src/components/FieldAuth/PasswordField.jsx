import IconPasswordIsVisible from "../IconPassword/IconPasswordIsVisible";
import IconPasswordNotVisible from "../IconPassword/IconPasswordNotVisible";
import css from "./FieldAuth.module.css";

const PasswordField = ({label, placeholder}) => {
  const isShowPassword = false;

  return (
    <label className={css.group_field}>
      <span className={css.label_text}>{label}</span>
      <span className={css.field__icon}>
        <input type="password" className={css.field} placeholder={placeholder} required />
        {isShowPassword ? <IconPasswordIsVisible /> : <IconPasswordNotVisible />}
      </span>
    </label>
  );
};
export default PasswordField;
