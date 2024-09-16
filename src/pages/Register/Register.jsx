import MediaQuery from "react-responsive";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WrapperForPublicRoutes from "../../components/WrapperForPublicRoutes/WrapperForPublicRoutes";

const Register = () => {
  return (
    <WrapperForPublicRoutes>
      Register
      <MediaQuery minWidth={1440}>
        <AdvantagesSection />
      </MediaQuery>
    </WrapperForPublicRoutes>
  );
};
export default Register;
