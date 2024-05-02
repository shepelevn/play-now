// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const { DefinePlugin } = require('webpack');

require('dotenv').config({ path: '.env' });

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
  devtool: 'source-map',
  entry: {
    bundle: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: './src/resources/favicon.ico',
    }),
    new SpritePlugin(),
    new DefinePlugin({
      'window.process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        exclude: [path.resolve(__dirname, './src/resources/svg/')],
        type: 'asset',
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, './src/resources/svg/')],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              // publicPath: '/',
            },
          },
          'svgo-loader',
        ],

        // use: 'svg-sprite-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
