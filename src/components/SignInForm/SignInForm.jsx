import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import FormAuth from "../FormAuth/FormAuth";

import * as schemaValidate from "../../helpers/schemaValidateAuth.js";

import css from "./SignInForm.module.css";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schemaValidate.schemaLogin)});

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={css.wrapper_form}>
      <FormAuth
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        title={"Sign In"}
        fields={[
          {
            type: "text",
            label: "Email",
            placeholder: "Enter your email",
            register: register("email"),
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            register: register("password"),
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
