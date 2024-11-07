import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const CheckedIcon: React.FC<SvgProps> = (props) => (
  <Svg fill="#00f00" viewBox="0 0 32 32" {...props}>
    <Path
      fill="none"
      stroke="#00f00"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M28 8 16 20l-5-5"
    />
    <Path d="M26.7 13.5c.2.8.3 1.6.3 2.5 0 6.1-4.9 11-11 11S5 22.1 5 16 9.9 5 16 5c3 0 5.7 1.2 7.6 3.1L25 6.7C22.7 4.4 19.5 3 16 3 8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.4-.2-2.8-.7-4.1l-1.6 1.6z" />
  </Svg>
);

export default CheckedIcon;
