import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";

import FormAuth from "../FormAuth/FormAuth";

import * as schemaValidate from "../../helpers/schemaValidateAuth.js";
import * as authThunk from "../../redux/auth/operations.js";

import css from "./SignInForm.module.css";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({resolver: yupResolver(schemaValidate.schemaLogin)});

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const user = {
      userEmail: data.userEmail,
      userPassword: data.userPassword,
    };

    dispatch(authThunk.loginThunk(user));
    reset();
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
            register: register("userEmail"),
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            register: register("userPassword"),
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
