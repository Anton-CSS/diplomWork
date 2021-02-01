const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);
const optimization = () => {
  const configObj = {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    configObj.minimizer = [
      new CssMinimizerPlugin({ parallel: true }),
      new TerserPlugin(),
    ];
  }

  return configObj;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `./js/${filename('js')}`,
    publicPath: '',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    filename: 'index.html',
    minify: {
      collapseWhitespace: isProd,
    },
  }),
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new MiniCssExtractPlugin({
    filename: `./css/${filename('css')}`,
  }),
  new ImageMinimizerPlugin({
    minimizerOptions: {
      plugins: [
        ['gifsicle', { interlaced: true }],
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 5 }],
        [
          'svgo',
          {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        ],
      ],
    },
  }),
  ],
  devtool: isProd ? false : 'source-map',
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attributes: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`,
          },
        },
        'css-loader',
        ],
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg|webp|mp4)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `./img/${filename('[ext]')}`,
          },
        }],
      },
    ],
  },
};
