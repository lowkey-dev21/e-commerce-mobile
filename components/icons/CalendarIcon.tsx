import Svg, { Path, Circle, Rect } from 'react-native-svg';

export function CalendarIcon({ color = '#000', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={4} width={18} height={17} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M3 9H21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M8 2V6M16 2V6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={8} cy={14} r={1} fill={color} />
      <Circle cx={12} cy={14} r={1} fill={color} />
      <Circle cx={16} cy={14} r={1} fill={color} />
    </Svg>
  );
}
