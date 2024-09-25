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
