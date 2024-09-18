import {Link} from "react-router-dom";

import Logo from "../Logo/Logo";
import HomeAuthSidebar from "../HomeAuthSidebar/HomeAuthSidebar";

import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  return (
    <HomeAuthSidebar>
      <div className={css.wrapper}>
        <Logo />
        <div className={css.context}>
          <h2 className={css.subtitle}>Record daily water intake and track</h2>
          <h1 className={css.title}>Water consumption tracker</h1>
          <span className={css.wrapper_links}>
            <Link to="/signup" className={css.link_try_tracker}>
              Try tracker
            </Link>
            <Link to="/signin" className={css.link_sign_in_class}>
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </HomeAuthSidebar>
  );
};
export default WelcomeSection;
