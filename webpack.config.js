const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/components/Hologram.js',
  output: {
    path: path.join(__dirname, 'dist'),
    library: 'Hologram',
    libraryTarget: 'commonjs2',
    filename: 'Hologram.js',
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'object-assign': 'object-assign',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
