import * as Yup from "yup";

export const schemaRegister = Yup.object({
  userEmail: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address")
    .required("Email is required"),
  userPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{6,12}$/,
      "Password must have a number, a letter, and no spaces"
    )
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), null], "Passwords do not match!")
    .required("Repeat password is required"),
});

export const schemaLogin = Yup.object({
  userEmail: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address")
    .required("Email is required"),
  userPassword: Yup.string().required("Password is required"),
});

export const schemaEmail = Yup.object({
  userEmail: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address")
    .required("Email is required"),
});
