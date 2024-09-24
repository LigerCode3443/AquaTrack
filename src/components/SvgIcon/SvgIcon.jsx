import sprite from "../../images/sprite.svg";

const SvgIcon = ({ id, width, height, className }) => (
  <svg width={width} height={height} className={className}>
    <use xlinkHref={`${sprite}#${id}`} width={width} height={height} />
  </svg>
);

export default SvgIcon;
