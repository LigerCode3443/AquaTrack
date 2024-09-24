import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import FormAuth from "../FormAuth/FormAuth.jsx";

import * as schemaValidate from "../../helpers/schemaValidateAuth.js";
import * as authThunk from "../../redux/auth/operations.js";

import css from "./SignInForm.module.css";

const SignInForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidate.schemaLogin) });

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
        title={t("description.signIn.mainTitle")}
        fields={[
          {
            type: "text",
            label: t("description.signIn.emailLabel"),
            placeholder: t("description.signIn.emailPlaceholder"),
            register: register("userEmail"),
          },
          {
            type: "password",
            label: t("description.signIn.passwordLabel"),
            placeholder: t("description.signIn.passwordPlaceholder"),
            register: register("userPassword"),
          },
        ]}
        link={"/signup"}
        textLink={t("description.signIn.signUpLink")}
        textInfo={t("description.signIn.alreadyHaveAcc")}
      />
    </div>
  );
};
export default SignInForm;
