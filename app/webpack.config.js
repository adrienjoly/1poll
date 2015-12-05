var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        // + cf .babelrc file
      }
    ]
  }
};
