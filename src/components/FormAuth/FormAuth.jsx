import {Link} from "react-router-dom";
import FieldAuth from "../FieldAuth/FieldAuth";
import css from "./FormAuth.module.css";

const FormAuth = ({title, fields, link, textLink, textInfo}) => {
  return (
    <>
      <h2 className={css.title}>{title}</h2>

      <form className={css.form}>
        <ul className={css.fields}>
          {fields.map((field, i) => (
            <li key={i}>
              <FieldAuth type={field.type} label={field.label} placeholder={field.placeholder} />
            </li>
          ))}
        </ul>

        <button type="submit">{title}</button>
      </form>

      <span className={css.info}>
        <p className={css.text}>{textInfo}</p>
        <Link to={link} className={css.link}>
          {textLink}
        </Link>
      </span>
    </>
  );
};
export default FormAuth;
