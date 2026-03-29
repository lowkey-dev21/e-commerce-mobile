import Svg, { Path, Circle } from 'react-native-svg';

export function PlusCircleIcon({ color = '#000', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M12 8V16M8 12H16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
