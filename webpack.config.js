var path = require('path');
var webpack = require('webpack');

// following advice from http://survivejs.com/webpack/advanced-techniques/configuring-react/

module.exports = {
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: './app/app.jsx',
  output: {
    path: './public/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,

        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need
        // something more custom, pass a path to it.
        // I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // + cf .babelrc file

        // Parse only app files! Without this it will go through
        // the entire project. In addition to being slow,
        // that will most likely result in an error.
        include: path.resolve(__dirname, 'app'),
      }
    ]
  }
};
