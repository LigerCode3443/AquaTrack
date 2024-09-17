import FormAuth from "../FormAuth/FormAuth";
import css from "./SignUpForm.module.css";

const SignUpForm = () => {
  return (
    <div className={css.wrapper_form}>
      <FormAuth
        title={"Sign Up"}
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
          {
            type: "password",
            label: "Repeat password",
            placeholder: "Repeat password",
          },
        ]}
        link={"/signin"}
        textLink={"Sign In"}
        textInfo={"Already have account?"}
      />
    </div>
  );
};
export default SignUpForm;
