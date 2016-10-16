'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var stylesheetsLoader = ExtractTextPlugin.extract('style-loader','!css-loader');
var stylesheetsPlugin = new ExtractTextPlugin('[hash].css');
var htmlWebpackPlugin = new HtmlWebpackPlugin({ template: 'index.html' });


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/client/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  noParse: /\.elm$/,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/dist/, /node_modules/],
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /dist/],
        loader: 'elm-webpack'
      },
      { test: /\.css$/, loader: stylesheetsLoader },
      { test: /\.scss$/, loader: `${stylesheetsLoader}'!sass` },
      { test: /\.sass$/, loader: `${stylesheetsLoader}'!sass?indentedSyntax=sass` },
      { test: /\.less$/, loader: `${stylesheetsLoader}'!less` },
      { test: /\.html$/, loader: 'html-loader' },
    {
      test: /\.json?$/,
      loader: 'json'
    }]
  }
};