import MediaQuery from "react-responsive";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import HomeAuthSidebar from "../../components/HomeAuthSidebar/HomeAuthSidebar";
import LocalizationSwitcher from "../../components/LocalizationSwitcher/LocalizationSwitcher";
import Logo from "../../components/Logo/Logo";
import WrapperForPublicRoutes from "../../components/WrapperForPublicRoutes/WrapperForPublicRoutes";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./ChangePassword.module.css";

const ChangePassword = () => {
  return (
    <WrapperForPublicRoutes>
      <HomeAuthSidebar>
        <div className={css.wrapper}>
          <div className={css.header}>
            <Logo />
            <LocalizationSwitcher />
          </div>

          <ChangePasswordForm />
        </div>
      </HomeAuthSidebar>

      <MediaQuery minWidth={1440}>
        <AdvantagesSection />
      </MediaQuery>
    </WrapperForPublicRoutes>
  );
};
export default ChangePassword;
