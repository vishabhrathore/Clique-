import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const SettingIcon: React.FC<CustomIconProps & SvgProps> = ({
  width = 32,
  height = 32,
  color = "currentColor",
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.024 2.783A1 1 0 0 1 10 2h4a1 1 0 0 1 .976.783l.44 1.981q.6.285 1.14.66l1.938-.61a1 1 0 0 1 1.166.454l2 3.464a1 1 0 0 1-.19 1.237l-1.497 1.373a8 8 0 0 1 0 1.316l1.497 1.373a1 1 0 0 1 .19 1.237l-2 3.464a1 1 0 0 1-1.166.454l-1.937-.61q-.54.375-1.14.66l-.44 1.98A1 1 0 0 1 14 22h-4a1 1 0 0 1-.976-.783l-.44-1.981q-.6-.285-1.14-.66l-1.938.61a1 1 0 0 1-1.166-.454l-2-3.464a1 1 0 0 1 .19-1.237l1.497-1.373a8 8 0 0 1 0-1.316L2.53 9.97a1 1 0 0 1-.19-1.237l2-3.464a1 1 0 0 1 1.166-.454l1.937.61q.54-.375 1.14-.66l.44-1.98zM12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
    />
  </Svg>
);

export default SettingIcon;
