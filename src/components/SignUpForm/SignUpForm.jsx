import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";

import FormAuth from "../FormAuth/FormAuth";

import * as schemaValidate from "../../helpers/schemaValidateAuth.js";
import * as authThunk from "../../redux/auth/operations.js";

import css from "./SignUpForm.module.css";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaValidate.schemaRegister),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const user = {
      userEmail: data.userEmail,
      userPassword: data.userPassword,
    };

    dispatch(authThunk.registerThunk(user));
    reset();
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
            register: register("userEmail"),
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            register: register("userPassword"),
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
