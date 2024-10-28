import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CallIcon: React.FC<CustomIconProps & SvgProps> = ({
  width = 24,
  height = 24,
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
      d="M13 18.675c1.93.83 4.242 1.325 7 1.325v-4l-4-1zm0 0C9.159 17.023 6.824 14.045 5.5 11m0 0C4.4 8.472 4 5.898 4 4h4l1 4z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CallIcon;
