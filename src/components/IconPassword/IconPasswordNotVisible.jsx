import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./IconPassword.module.css";

const IconPasswordNotVisible = ({onClick}) => {
  return (
    <span className={css.icon} onClick={onClick}>
      <SvgIcon id="hide" width={20} height={20} />
    </span>
  );
};
export default IconPasswordNotVisible;
