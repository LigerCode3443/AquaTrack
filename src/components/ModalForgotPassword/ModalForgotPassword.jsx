import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaEmail} from "../../helpers/schemaValidateAuth";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import css from "./ModalForgotPassword.module.css";
import {useDispatch} from "react-redux";
import {forgotPasswordThunk} from "../../redux/auth/operations";

const ModalForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({resolver: yupResolver(schemaEmail)});
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [dataEmail, setDataEmail] = useState(null);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(forgotPasswordThunk(data))
      .unwrap()
      .then((res) => {
        setDataEmail(res.message);
      });
    reset();
    setIsFormVisible(false);
  };

  return isFormVisible ? (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>{t("description.modalForgotPassword.subtitleText")}</h2>
      <span className={css.group}>
        <input
          type="text"
          className={css.field}
          placeholder={t("description.modalForgotPassword.emailPlaceholder")}
          {...register("userEmail")}
        />
        {errors.userEmail && <p className={css.error}>{errors.userEmail.message}</p>}
      </span>
      <button type="submit" className={css.btn}>
        {t("description.modalForgotPassword.btnModalText")}
      </button>
    </form>
  ) : (
    <p className={css.message}>{dataEmail}</p>
  );
};
export default ModalForgotPassword;