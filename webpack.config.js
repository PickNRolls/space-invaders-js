const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js'
  },
  devtool: 'source-map',
  watch: true,
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist')
  }
};
