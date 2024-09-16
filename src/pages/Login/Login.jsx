import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import MediaQuery from "react-responsive";

const Login = () => {
  return (
    <div>
      Login
      <MediaQuery minWidth={1440}>
        <AdvantagesSection />
      </MediaQuery>
    </div>
  );
};
export default Login;
