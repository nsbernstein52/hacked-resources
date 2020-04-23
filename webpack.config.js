const path = require('path');
const webpack = require('webpack');
console.log("wc: ", path.resolve(__dirname, 'dist'))
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/s,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.data$/,
        loader: 'file-loader',
        type: 'javascript/auto'
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};





