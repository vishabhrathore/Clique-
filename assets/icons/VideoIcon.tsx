import * as React from "react";
import Svg, { SvgProps, Path, G, Rect } from "react-native-svg";

interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const VideoIcon: React.FC<CustomIconProps & SvgProps> = ({
  width = 36,
  height = 36,
  color = "currentColor",
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="-4 -4 32 32"
    fill="green"
    {...props}
  >
    <Path
      fill={"#7a5bc4"}
      d="M21.12 7.34a2 2 0 0 0-1.86-.2L15.63 8.6a1 1 0 0 0-.63.92v5a1 1 0 0 0 .63.92l3.63 1.46a2.11 2.11 0 0 0 .74.1 2 2 0 0 0 1.12-.34A2 2 0 0 0 22 15V9a2 2 0 0 0-.88-1.66Z"
    />
    <Rect width={15} height={14} x={2} y={5} rx={2} fill={"#7a5bc4"} />
  </Svg>
);

export default VideoIcon;
