import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import FormAuth from "../FormAuth/FormAuth";
import * as schemaValidate from "../../helpers/schemaValidateAuth.js";
import {useForm} from "react-hook-form";

import css from "./ChangePasswordForm.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {recoveryPasswordThunk} from "../../redux/auth/operations.js";

const ChangePasswordForm = () => {
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaValidate.schemaChangePassword),
  });
  const {verificationToken} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newData = {
      verificationToken,
      userNewPassword: data.userNewPassword,
    };
    console.log(newData);
    dispatch(recoveryPasswordThunk(newData));
    reset();
    navigate("/signin", {replace: true});
  };

  return (
    <div className={css.wrapper_form}>
      <FormAuth
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        title={t("description.restorePassword.subtitleText")}
        fields={[
          {
            type: "password",
            label: t("description.restorePassword.passwordLabel"),
            placeholder: t("description.restorePassword.passwordPlaceholder"),
            register: register("userNewPassword"),
          },
          {
            type: "password",
            label: t("description.restorePassword.repeatPasswordLabel"),
            placeholder: t("description.restorePassword.repeatPasswordPlaceholder"),
            register: register("repeatNewPassword"),
          },
        ]}
        btnTitle={t("description.restorePassword.btnText")}
        link={"/signin"}
        textLink={t("description.restorePassword.signInLink")}
        textInfo={t("description.restorePassword.text")}
      />
    </div>
  );
};
export default ChangePasswordForm;
