import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import WrapperForPublicRoutes from "../../components/WrapperForPublicRoutes/WrapperForPublicRoutes";

const Home = () => {
  return (
    <WrapperForPublicRoutes>
      <WelcomeSection />
      <AdvantagesSection />
    </WrapperForPublicRoutes>
  );
};
export default Home;
