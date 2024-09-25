import sprite from "../../images/sprite.svg";

const SvgIcon = ({ id, className = "", width, height, stroke }) => (
  <svg
    width={width}
    height={height}
    className={className !== "" ? className : null}
    stroke={stroke}
  >
    <use xlinkHref={`${sprite}#${id}`} width={width} height={height} />
  </svg>
);

export default SvgIcon;
