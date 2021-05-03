const path = require('path');

module.exports = {
  entry: {
    main: './js/index.js',
    vendor: './js/Model.js',
  },
  mode: 'development',
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
};

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
// };