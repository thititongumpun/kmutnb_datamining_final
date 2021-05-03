const path = require('path');

module.exports = {
  entry: {
    main: './js/index.js',
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
};