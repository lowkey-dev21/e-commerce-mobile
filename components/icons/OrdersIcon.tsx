import Svg, { Path, Circle, Rect } from 'react-native-svg';

export function OrdersIcon({ color = '#C5C5C5', size = 24 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={1} y={6} width={15} height={10} rx={2} stroke={color} strokeWidth={1.8} />
      <Path
        d="M16 8.5H19.5L23 12.5V16H16V8.5Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Circle cx={5.5} cy={18} r={2} stroke={color} strokeWidth={1.8} />
      <Circle cx={19} cy={18} r={2} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}
