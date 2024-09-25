import i18next from "../localization/configI18n.js";
import * as Yup from "yup";

export const schemaRegister = Yup.object({
  userEmail: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      i18next.t("description.validationAuth.emailPattern")
    )
    .required(i18next.t("description.validationAuth.requiredEmail")),
  userPassword: Yup.string()
    .min(6, i18next.t("description.validationAuth.passwordMin"))
    .max(12, i18next.t("description.validationAuth.passwordMax"))
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{6,12}$/,
      i18next.t("description.validationAuth.passwordPattern")
    )
    .required(i18next.t("description.validationAuth.passwordRequired")),
  repeatPassword: Yup.string()
    .oneOf(
      [Yup.ref("userPassword"), null],
      i18next.t("description.validationAuth.passwordMatch")
    )
    .required(i18next.t("description.validationAuth.repeatPassword")),
});

export const schemaLogin = Yup.object({
  userEmail: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      i18next.t("description.validationAuth.emailPattern")
    )
    .required(i18next.t("description.validationAuth.requiredEmail")),
  userPassword: Yup.string().required(
    i18next.t("description.validationAuth.passwordRequired")
  ),
});

export const schemaEmail = Yup.object({
  userEmail: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address")
    .required("Email is required"),
});

export const schemaChangePassword = Yup.object({
  userNewPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{6,12}$/,
      "Password must have a number, a letter, and no spaces"
    )
    .required("Password is required"),

  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref("userNewPassword"), null], "Passwords do not match!")
    .required("Repeat password is required"),
});
