import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {Moon, Sun} from 'lucide-react-native';
import {useTheme} from '../src/utils/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = true,
  size = 'medium',
}) => {
  const {theme, colors, toggleTheme} = useTheme();

  const isDark = theme === 'dark';

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {iconSize: 16, fontSize: 14};
      case 'large':
        return {iconSize: 24, fontSize: 18};
      default:
        return {iconSize: 20, fontSize: 16};
    }
  };

  const {iconSize, fontSize} = getSizeStyles();

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          {isDark ? (
            <Moon size={iconSize} color={colors.text} />
          ) : (
            <Sun size={iconSize} color={colors.text} />
          )}
          <Text style={[styles.label, {color: colors.text, fontSize}]}>
            {isDark ? 'Dark' : 'Light'} Mode
          </Text>
        </View>
      )}
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{false: '#E0E0E0', true: '#1976D2'}}
        thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
        ios_backgroundColor="#E0E0E0"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    marginLeft: 8,
    fontWeight: '500',
  },
});
