import PasswordField from "./PasswordField";
import css from "./FieldAuth.module.css";

const FieldAuth = ({type, label, placeholder}) => {
  if (type === "password") {
    return <PasswordField label={label} placeholder={placeholder} />;
  }
  return (
    <label className={css.group_field}>
      <span className={css.label_text}>{label}</span>
      <input type={type} className={css.field} placeholder={placeholder} required />
    </label>
  );
};
export default FieldAuth;
