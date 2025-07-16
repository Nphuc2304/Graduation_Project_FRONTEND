import {useTheme} from './utils/ThemeContext';

// Legacy colors for backward compatibility
const legacyColors = {
  white: '#fff',
  black: '#000',
  transparent: 'transparent',
  lightBlack: '#353535',
  darkGray: '#CDCDCD',
  gray: '#D9D9D9',
  primary: '#1A8FE3',
  lightPrimary: '#D6E9F9',
  red: '#EE0004',
};

// Hook để sử dụng colors với theme
export const useColors = () => {
  const {colors} = useTheme();
  return {
    ...legacyColors,
    ...colors,
  };
};

// Default export cho backward compatibility
const colors = legacyColors;
export default colors;
