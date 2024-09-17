import sprite from "../../images/sprite.svg";

const SvgIcon = ({ id, width = 16, height = 16 }) => (
  <svg width={width} height={height}>
    <use xlinkHref={`${sprite}#${id}`} width={width} height={height} />
  </svg>
);

export default SvgIcon;
