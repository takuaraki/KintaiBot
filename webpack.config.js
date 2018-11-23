const path = require('path');
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    outgoing: './src/main/index.ts', // TODO: rename to index_outgoing.ts
    slashcommand: './src/main/index.ts' // TODO: add index_slashcommand.ts
  },
  devtool: false,
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  plugins: [
    new GasPlugin()
  ]
};
