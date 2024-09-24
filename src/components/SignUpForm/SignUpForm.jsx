import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import FormAuth from "../FormAuth/FormAuth";

import * as schemaValidate from "../../helpers/schemaValidateAuth.js";
import * as authThunk from "../../redux/auth/operations.js";

import css from "./SignUpForm.module.css";

const SignUpForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
        title={t("description.signUp.mainTitle")}
        fields={[
          {
            type: "text",
            label: t("description.signUp.emailLabel"),
            placeholder: t("description.signUp.emailPlaceholder"),
            register: register("userEmail"),
          },
          {
            type: "password",
            label: t("description.signUp.passwordLabel"),
            placeholder: t("description.signUp.passwordPlaceholder"),
            register: register("userPassword"),
          },
          {
            type: "password",
            label: t("description.signUp.repeatPasswordLabel"),
            placeholder: t("description.signUp.repeatPasswordPlaceholder"),
            register: register("repeatPassword"),
          },
        ]}
        link={"/signin"}
        textLink={t("description.signUp.signInLink")}
        textInfo={t("description.signUp.alreadyHaveAcc")}
      />
    </div>
  );
};
export default SignUpForm;
