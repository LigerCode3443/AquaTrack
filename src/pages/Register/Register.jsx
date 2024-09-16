import MediaQuery from "react-responsive";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WrapperForPublicRoutes from "../../components/WrapperForPublicRoutes/WrapperForPublicRoutes";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";
import HomeAuthSidebar from "../../components/HomeAuthSidebar/HomeAuthSidebar";

const Register = () => {
  return (
    <WrapperForPublicRoutes>
      <HomeAuthSidebar>
        <Logo />
        <SignUpForm />
      </HomeAuthSidebar>

      <MediaQuery minWidth={1440}>
        <AdvantagesSection />
      </MediaQuery>
    </WrapperForPublicRoutes>
  );
};
export default Register;
