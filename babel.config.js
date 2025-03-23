module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          navigation: './src/navigation',
          features: './src/features',
          components: './src/components',
          types: './src/types',
          styles: './src/styles',
          utils: './src/utils',
          assets: './src/assets',
          constants: './src/constants',
          services: './src/services',
        },
      },
    ],
  ],
};
