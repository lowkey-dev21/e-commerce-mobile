import Svg, { Path, Circle, Rect } from 'react-native-svg';

export function LockIcon({ color = '#000', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Rect x={4} y={11} width={16} height={11} rx={2} stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={16} r={1.5} fill={color} />
      <Path d="M12 17.5V19" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
