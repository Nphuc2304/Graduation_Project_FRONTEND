const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const path = require('path');

const config = {
  resolver: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'components'),
      '@screens': path.resolve(__dirname, 'src/Screen'),
      '@tabs': path.resolve(__dirname, 'src/(tabs)'),
      '@home': path.resolve(__dirname, 'src/(tabs)/Home'),
      '@services': path.resolve(__dirname, 'services'),
      '@assets': path.resolve(__dirname, 'assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/Styles'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
    },
    // Handle parentheses in paths
    platforms: ['ios', 'android', 'native', 'web'],
  },
  server: {
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        console.log(`[Metro] ${req.method} ${req.url}`);
        return middleware(req, res, next);
      };
    },
  },
};

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(getDefaultConfig(__dirname), config),
);
