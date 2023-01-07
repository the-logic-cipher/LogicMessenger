module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    ...my,
    other,
    rules,
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
  },
};
