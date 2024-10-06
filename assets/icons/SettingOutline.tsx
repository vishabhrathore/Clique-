import * as React from "react";
import Svg, { Path, Circle, SvgProps } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const SettingOutline: React.FC<CustomIconProps & SvgProps> = ({
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
      d="M14 21h-4l-.551-2.48a7 7 0 0 1-1.819-1.05l-2.424.763l-2-3.464l1.872-1.718a7 7 0 0 1 0-2.1L3.206 9.232l2-3.464l2.424.763A7 7 0 0 1 9.45 5.48L10 3h4l.551 2.48a7 7 0 0 1 1.819 1.05l2.424-.763l2 3.464l-1.872 1.718a7 7 0 0 1 0 2.1l1.872 1.718l-2 3.464l-2.424-.763a7 7 0 0 1-1.819 1.052z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={12}
      cy={12}
      r={3}
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

export default SettingOutline;
