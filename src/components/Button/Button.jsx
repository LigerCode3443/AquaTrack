import styles from "./Button.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
const Button = ({
  variant,
  children,
  className = "",
  icon,
  iconWidth,
  iconHeight,
  ...props
}) => {
  const buttonClass = `
    ${styles.btn}
    ${styles[`btn--${variant}`]}
    ${className}
  `;

  return (
    <button className={buttonClass} {...props}>
      {icon && (
        <span className={styles.icon}>
          <SvgIcon id={icon} width={iconWidth} height={iconHeight} />
        </span>
      )}
      {children && <span className={styles["btn-text"]}>{children}</span>}
    </button>
  );
};

export default Button;
