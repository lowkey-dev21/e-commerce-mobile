import Svg, { Path, Rect } from 'react-native-svg';

export function CardIcon({ color = '#000', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={5} width={20} height={14} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M2 10H22" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M6 15H10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
