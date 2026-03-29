import Svg, { Path } from 'react-native-svg';

export function ClipboardIcon({ color = '#000', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4H16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M8 4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V5C16 5.55228 15.5523 6 15 6H9C8.44772 6 8 5.55228 8 5V4Z" stroke={color} strokeWidth={1.8} />
      <Path d="M9 12H15M9 16H13" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
