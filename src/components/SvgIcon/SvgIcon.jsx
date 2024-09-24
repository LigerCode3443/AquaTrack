import sprite from "../../images/sprite.svg";

const SvgIcon = ({ id, className = "", width = 16, height = 16, stroke }) => (
  <svg width={width} height={height} className={className} stroke={stroke}>
    <use xlinkHref={`${sprite}#${id}`} width={width} height={height} />
  </svg>
);

export default SvgIcon;
