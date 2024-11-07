import * as React from "react";
import Svg, { SvgProps, Path, G } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const MissedCallIcon: React.FC<CustomIconProps & SvgProps> = ({
  width = 20,
  height = 20,
  color = "currentColor",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="red" {...props}>
    <Path
      fill="red"
      fillRule="evenodd"
      d="M2.14 4.402C2.34 2.93 3.64 2 4.99 2h2.568a3 3 0 0 1 2.847 2.051L11.454 7.2a2.449 2.449 0 0 1-1.73 3.15.449.449 0 0 0-.208.752l3.382 3.382c.247.246.668.13.752-.209a2.449 2.449 0 0 1 3.15-1.729l3.149 1.05A3 3 0 0 1 22 16.441v2.568c0 1.35-.93 2.65-2.402 2.85-.687.092-1.387.14-2.098.14C8.94 22 2 15.06 2 6.5c0-.711.048-1.411.14-2.098Z"
      clipRule="evenodd"
    />
    <Path
      fill="red"
      d="M15.707 2.293a1 1 0 1 0-1.414 1.414L16.586 6l-2.293 2.293a1 1 0 0 0 1.414 1.414L18 7.414l2.293 2.293a1 1 0 0 0 1.414-1.414L19.414 6l2.293-2.293a1 1 0 0 0-1.414-1.414L18 4.586l-2.293-2.293Z"
    />
  </Svg>
);

export default MissedCallIcon;
