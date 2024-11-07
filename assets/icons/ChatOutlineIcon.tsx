import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChatOutlineIcon: React.FC<CustomIconProps & SvgProps> = ({
  width = 24,
  height = 24,
  color = "currentColor",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 9h8m-8 3h8m-8 3h3m10-3a9 9 0 0 1-13.815 7.605L3 21l1.395-4.185A9 9 0 1 1 21 12"
    />
  </Svg>
);

export default ChatOutlineIcon;
