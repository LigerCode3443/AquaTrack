import * as Icons from "../../static-assets/icons";

const Icon = ({ iconName, className, width = 24, height = 24 }) => {
  const SelectedIcon = Icons[iconName];

  if (!SelectedIcon) {
    return null;
  }

  return <SelectedIcon className={className} width={width} height={height} />;
};

export default Icon;
