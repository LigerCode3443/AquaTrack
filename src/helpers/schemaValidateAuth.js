import * as Yup from "yup";

export const schemaRegister = Yup.object({
  userEmail: Yup.string().email("Invalid email address").required("Email is required"),
  userPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), null], "Passwords do not match!")
    .required("Repeat password is required"),
});

export const schemaLogin = Yup.object({
  userEmail: Yup.string().email("Invalid email address").required("Email is required"),
  userPassword: Yup.string().required("Password is required"),
});
