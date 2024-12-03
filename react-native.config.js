module.exports = {
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? { 'react-native-flipper': { platforms: { ios: null, android: null } } }
      : {}),
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
};
