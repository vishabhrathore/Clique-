import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChatIcon: React.FC<CustomIconProps & SvgProps> = ({
  width = 24,
  height = 24,
  color = "currentColor",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.935-1.3l-3.749 1.249a1 1 0 0 1-1.265-1.265l1.25-3.749A9.96 9.96 0 0 1 2 12m6-5a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2z"
      clipRule="evenodd"
    />
  </Svg>
);

export default ChatIcon;
