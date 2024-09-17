import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import FormAuth from "../FormAuth/FormAuth";

import * as schemaValidate from "../../helpers/schemaValidateAuth.js";
import css from "./SignUpForm.module.css";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaValidate.schemaRegister),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={css.wrapper_form}>
      <FormAuth
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        title={"Sign Up"}
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
          {
            type: "password",
            label: "Repeat password",
            placeholder: "Repeat password",
            register: register("repeatPassword"),
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
