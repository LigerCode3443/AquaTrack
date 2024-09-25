import MediaQuery from "react-responsive";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WrapperForPublicRoutes from "../../components/WrapperForPublicRoutes/WrapperForPublicRoutes";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";
import HomeAuthSidebar from "../../components/HomeAuthSidebar/HomeAuthSidebar";
import LocalizationSwitcher from "../../components/LocalizationSwitcher/LocalizationSwitcher";

import css from "./Register.module.css";

const Register = () => {
  return (
    <WrapperForPublicRoutes>
      <HomeAuthSidebar>
        <div className={css.wrapper}>
          <div className={css.header}>
            <Logo />

            <LocalizationSwitcher />
          </div>
          <SignUpForm />
        </div>
      </HomeAuthSidebar>

      <MediaQuery minWidth={1440}>
        <AdvantagesSection />
      </MediaQuery>
    </WrapperForPublicRoutes>
  );
};
export default Register;
