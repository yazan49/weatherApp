import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const Remove = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={12} cy={12} r={9} fill="white" fillOpacity={0.25} />
    <Path
      d="M16 8L8 16"
      stroke="#222222"
      strokeWidth={1.2}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <Path
      d="M8 8L16 16"
      stroke="#222222"
      strokeWidth={1.2}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Remove;
