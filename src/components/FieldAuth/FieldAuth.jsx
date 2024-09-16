import css from "./FieldAuth.module.css";

const FieldAuth = ({type, label, placeholder}) => {
  return (
    <label className={css.group_field}>
      <span className={css.label_text}>{label}</span>
      <input type={type} className={css.field} placeholder={placeholder} required></input>
    </label>
  );
};
export default FieldAuth;
