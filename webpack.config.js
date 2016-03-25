var webpack = require("webpack");

module.exports = {
  entry: './js/app.jsx',
  output: {
    path: './',
    filename: 'app.dist.js',
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};