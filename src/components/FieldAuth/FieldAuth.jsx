import PasswordField from "./PasswordField";
import css from "./FieldAuth.module.css";

const FieldAuth = ({type, label, placeholder, register, error}) => {
  if (type === "password") {
    return (
      <PasswordField
        label={label}
        placeholder={placeholder}
        register={register}
        errorMessage={error}
      />
    );
  }
  return (
    <label className={css.group_field}>
      <span className={css.label_text}>{label}</span>
      <input
        type={type}
        className={error ? css.errorField : css.field}
        placeholder={placeholder}
        {...register}
      />
    </label>
  );
};
export default FieldAuth;
