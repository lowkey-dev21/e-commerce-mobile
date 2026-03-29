import Svg, { Path, Circle } from 'react-native-svg';

export function ShieldIcon({ color = '#000', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3L4 6V12C4 16.4183 7.58172 20 12 21C16.4183 20 20 16.4183 20 12V6L12 3Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={11} r={2} stroke={color} strokeWidth={1.8} />
      <Path d="M12 13V16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
