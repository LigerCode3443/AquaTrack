import styles from "./Button.module.scss";

const Button = ({ variant, children, className = "", icon, ...props }) => {
  const buttonClass = `
    ${styles.btn}
    ${styles[`btn--${variant}`]}
    ${className}
  `;

  return (
    <button className={buttonClass} {...props}>
      {icon && (
        <span
          className={styles.icon}
          style={{ backgroundImage: `url('/src/images/sprite.svg#${icon}')` }}
        ></span>
      )}
      {children && <span className={styles["btn-text"]}>{children}</span>}
    </button>
  );
};

export default Button;
