import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.wrapper}>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};
export default Home;
