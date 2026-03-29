import Svg, { Path } from 'react-native-svg';

export function TrashIcon({ color = '#000', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 6H5H21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6L18.1245 19.1319C18.0535 20.1893 17.1742 21 16.1143 21H7.88571C6.82581 21 5.94648 20.1893 5.87549 19.1319L5 6H19Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
