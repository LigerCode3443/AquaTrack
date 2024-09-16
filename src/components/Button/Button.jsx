import styles from "./Button.module.scss";
import Icon from "../../Icon/Icon";

const Button = ({ variant, children, className = "", icon, ...props }) => {
  const buttonClass = `
    ${styles.btn}
    ${styles[`btn--${variant}`]}
    ${className}
  `;

  return (
    <button className={buttonClass} {...props}>
      {icon && <Icon iconName={icon} />}
      {children && <span className={styles["btn-text"]}>{children}</span>}
    </button>
  );
};

export default Button;
