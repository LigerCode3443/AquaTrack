import css from "./IconPassword.module.css";

const IconPasswordNotVisible = ({onClick}) => {
  return (
    <span className={css.icon} onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_72_3781)">
          <path
            d="M14.9497 14.9499C13.5252 16.0358 11.7906 16.6373 9.99968 16.6666C4.16634 16.6666 0.833008 9.99994 0.833008 9.99994C1.86958 8.06819 3.30729 6.38045 5.04967 5.04994M8.24968 3.53327C8.82329 3.39901 9.41056 3.33189 9.99968 3.33327C15.833 3.33327 19.1663 9.99994 19.1663 9.99994C18.6605 10.9463 18.0572 11.8372 17.3663 12.6583M11.7663 11.7666C11.5375 12.0122 11.2615 12.2092 10.9548 12.3459C10.6481 12.4825 10.3171 12.556 9.98142 12.5619C9.64574 12.5678 9.31231 12.5061 9.00102 12.3803C8.68972 12.2546 8.40694 12.0675 8.16955 11.8301C7.93215 11.5927 7.745 11.3099 7.61927 10.9986C7.49353 10.6873 7.43178 10.3539 7.4377 10.0182C7.44363 9.68252 7.5171 9.35148 7.65374 9.04481C7.79038 8.73815 7.98739 8.46215 8.23301 8.23327"
            stroke="#2F2F2F"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.833008 0.833374L19.1663 19.1667"
            stroke="#2F2F2F"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_72_3781">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
};
export default IconPasswordNotVisible;