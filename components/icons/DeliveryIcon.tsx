import Svg, { Path, Circle, Rect } from 'react-native-svg';

export function DeliveryIcon({ color = '#000', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={1} y={3} width={15} height={13} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M16 8H19L22 11V16H16V8Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Circle cx={5.5} cy={18.5} r={2.5} stroke={color} strokeWidth={1.8} />
      <Circle cx={18.5} cy={18.5} r={2.5} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}
