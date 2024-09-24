import {useState} from "react";
import {Link} from "react-router-dom";
import FieldAuth from "../FieldAuth/FieldAuth";
import css from "./FormAuth.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import ModalForgotPassword from "../ModalForgotPassword/ModalForgotPassword";

const FormAuth = ({title, fields, link, textLink, textInfo, onSubmit, errors, forgotPassword}) => {
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  return (
    <>
      <h2 className={css.title}>{title}</h2>

      <form className={css.form} onSubmit={onSubmit}>
        <ul className={css.fields}>
          {fields.map((field, i) => (
            <li key={i}>
              <FieldAuth
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                register={field.register}
                error={errors[field.register.name]}
              />
              {errors[field.register.name] && (
                <p className={css.error}>{errors[field.register.name].message}</p>
              )}
            </li>
          ))}
        </ul>

        <button type="submit" className={css.btn}>
          {title}
        </button>
      </form>

      {forgotPassword && (
        <button className={css.password} onClick={() => setIsOpenForgotPassword(true)}>
          {forgotPassword}
        </button>
      )}

      <ModalWindow isOpen={isOpenForgotPassword} onClose={() => setIsOpenForgotPassword(false)}>
        <ModalForgotPassword />
      </ModalWindow>

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
