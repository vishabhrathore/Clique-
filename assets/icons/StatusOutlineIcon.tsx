import * as React from "react";
import Svg, { Path, Circle, SvgProps } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const StatusOutlineIcon: React.FC<CustomIconProps & SvgProps> = ({
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
      d="M15 3.512a9.03 9.03 0 0 1 5.5 5.523M11 3.055a9 9 0 0 0-6.605 13.76L3 21l4.185-1.395A9 9 0 0 0 20.945 13"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M12 17a5 5 0 0 1-5-5m2-4a5 5 0 0 1 7 7"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Circle
      cx={12}
      cy={12}
      r={1}
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

export default StatusOutlineIcon;
