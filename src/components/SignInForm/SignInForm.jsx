import {Link} from "react-router-dom";
import FieldAuth from "../FieldAuth/FieldAuth";
import css from "./SignInForm.module.css";

const SignInForm = () => {
  return (
    <div className={css.wrapper_form}>
      <h2 className={css.title}>Sign In</h2>

      <form className={css.form_register}>
        <div className={css.fields}>
          <FieldAuth type="text" label={"Email"} placeholder={"Enter your email"} />
          <FieldAuth type="password" label={"Password"} placeholder={"Enter your password"} />
        </div>

        <button type="submit">Sign In</button>
      </form>

      <span className={css.info}>
        <p className={css.text}>Don’t have an account?</p>
        <Link to="/signin" className={css.link}>
          Sign Up
        </Link>
      </span>
    </div>
  );
};
export default SignInForm;
