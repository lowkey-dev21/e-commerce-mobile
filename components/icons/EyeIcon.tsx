import Svg, { Path, Circle } from 'react-native-svg';

export function EyeIcon({ color = '#000', size = 22, hidden = false }: { color?: string; size?: number; hidden?: boolean }) {
  if (hidden) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.61 23 12C22.45 13.49 21.6 14.83 20.52 15.95M1 1L23 23" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8.71 8.71A4 4 0 0 0 15.29 15.29" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M1 12C2.73 7.61 7 4 12 4C17 4 21.27 7.61 23 12C21.27 16.39 17 20 12 20C7 20 2.73 16.39 1 12Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}
