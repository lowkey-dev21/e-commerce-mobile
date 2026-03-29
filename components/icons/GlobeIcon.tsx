import Svg, { Path, Circle } from 'react-native-svg';

export function GlobeIcon({ color = '#000', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M3 12H21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M12 3C10 7 10 17 12 21M12 3C14 7 14 17 12 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
