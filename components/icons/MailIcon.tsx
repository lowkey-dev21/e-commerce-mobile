import Svg, { Path, Rect } from 'react-native-svg';

export function MailIcon({ color = '#000', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={4} width={20} height={16} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M2 7L12 13L22 7" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
