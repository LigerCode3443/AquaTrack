import {Watch} from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.bg}>
      <Watch color="#323F47" />
    </div>
  );
};
export default Loader;
