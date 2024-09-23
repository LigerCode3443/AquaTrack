import sprite from "../../images/sprite.svg";

const SvgIcon = ({ id, className = "", width = 16, height = 16 }) => (
  <svg width={width} height={height} className={className}>
    <use xlinkHref={`${sprite}#${id}`} width={width} height={height} />
  </svg>
);

export default SvgIcon;
