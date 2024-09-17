import FormAuth from "../FormAuth/FormAuth";
import css from "./SignInForm.module.css";

const SignInForm = () => {
  return (
    <div className={css.wrapper_form}>
      <FormAuth
        title={"Sign In"}
        fields={[
          {
            type: "text",
            label: "Email",
            placeholder: "Enter your email",
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
          },
        ]}
        link={"/signup"}
        textLink={"Sign Up"}
        textInfo={"Don’t have an account?"}
      />
    </div>
  );
};
export default SignInForm;
