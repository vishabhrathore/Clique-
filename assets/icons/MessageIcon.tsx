import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
import { Theme } from "../theme/theme"


interface CustomIconProps {
  width?: number;
  height?: number;
  color?: string; // This will be used for the stroke and fill color
}


const MessageIcon: React.FC<CustomIconProps & SvgProps> = ({
  width = 24,
  height = 24,
  color = "currentColor",
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="m12.594 23.258-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z" />
      <Path
        fill={color}
        d="M19 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7.333L4 21.5c-.824.618-2 .03-2-1V6a3 3 0 0 1 3-3zm-8 9H8a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2m5-4H8a1 1 0 0 0-.117 1.993L8 10h8a1 1 0 0 0 .117-1.993z"
      />
    </G>
  </Svg>
)
export default MessageIcon
