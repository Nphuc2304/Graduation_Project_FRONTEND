module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './components',
          '@screens': './src/Screen',
          '@tabs': './src/(tabs)',
          '@home': './src/(tabs)/Home',
          '@services': './services',
          '@assets': './assets',
          '@utils': './src/utils',
          '@styles': './src/Styles',
          '@hooks': './src/hooks',
          '@config': './src/config',
          '@navigation': './src/navigation',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
