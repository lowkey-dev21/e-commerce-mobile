import Svg, { Path } from 'react-native-svg';

export function ShieldCheckIcon({ color = '#000', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3L4 6V12C4 16.4183 7.58172 20 12 21C16.4183 20 20 16.4183 20 12V6L12 3Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 12L11 14L15 10" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
