import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./IconPassword.module.css";

const IconPasswordIsVisible = ({onClick}) => {
  return (
    <span className={css.icon} onClick={onClick}>
      <SvgIcon id="eye" width={20} height={20} />
    </span>
  );
};
export default IconPasswordIsVisible;
