import MediaQuery from "react-responsive";

import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WrapperForPublicRoutes from "../../components/WrapperForPublicRoutes/WrapperForPublicRoutes";

const Login = () => {
  return (
    <WrapperForPublicRoutes>
      Login
      <MediaQuery minWidth={1440}>
        <AdvantagesSection />
      </MediaQuery>
    </WrapperForPublicRoutes>
  );
};
export default Login;
