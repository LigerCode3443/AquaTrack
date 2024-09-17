import {Link} from "react-router-dom";
import FieldAuth from "../FieldAuth/FieldAuth";
import css from "./SignUpForm.module.css";

const SignUpForm = () => {
  return (
    <div className={css.wrapper_form}>
      <h2 className={css.title}>Sign Up</h2>

      <form className={css.form_register}>
        <div className={css.fields}>
          <FieldAuth type="text" label={"Email"} placeholder={"Enter your email"} />
          <FieldAuth type="password" label={"Password"} placeholder={"Enter your password"} />
          <FieldAuth type="password" label={"Repeat password"} placeholder={"Repeat password"} />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <span className={css.info}>
        <p className={css.text}>Already have account?</p>
        <Link to="/signin" className={css.link}>
          Sign In
        </Link>
      </span>
    </div>
  );
};
export default SignUpForm;
