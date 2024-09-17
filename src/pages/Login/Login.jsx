import MediaQuery from "react-responsive";

import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WrapperForPublicRoutes from "../../components/WrapperForPublicRoutes/WrapperForPublicRoutes";
import SignInForm from "../../components/SignInForm/SignInForm";
import Logo from "../../components/Logo/Logo";
import HomeAuthSidebar from "../../components/HomeAuthSidebar/HomeAuthSidebar";

import css from "./Login.module.css";

const Login = () => {
  return (
    <WrapperForPublicRoutes>
      <HomeAuthSidebar>
        <div className={css.wrapper}>
          <Logo />
          <SignInForm />
        </div>
      </HomeAuthSidebar>

      <MediaQuery minWidth={1440}>
        <AdvantagesSection />
      </MediaQuery>
    </WrapperForPublicRoutes>
  );
};
export default Login;
