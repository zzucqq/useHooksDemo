const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');

const { NODE_ENV } = process.env;

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const publicPath = isProd ? config.build.publicPath : config.development.publicPath || '';

const { imageInlineSizeLimit, fontInlineSizeLimit } = config.global;

// 获取style loader的通用方法
const getStyleLoaders = (cssOptions, preProcessor, preProcessorOptions) => {
  const loaders = [
    isDev && require.resolve('style-loader'),
    isProd && {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // PostCSS配置，根据package.json中的配置，自动增加css浏览器前缀
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
          ],
        },
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isProd,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
          ...preProcessorOptions,
        },
      }
    );
  }
  return loaders;
};

const webpackCommonConfig = {
  devtool: 'source-map',
  entry: {
    app: paths.src + '/app.tsx',
  },
  output: {
    path: paths.build,
    publicPath,
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[name].js' : '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': paths.src,
    },
    // fallback: {
    //   // 这里三个是解决webpack引入crypto-js，报错问题，具体问题可以注释查看
    //   crypto: require.resolve('crypto-browserify'),
    //   buffer: require.resolve('buffer/'),
    //   stream: require.resolve('stream-browserify/'),
    // },
  },
  module: {
    rules: [
      // url loader作用类似file loader，不同点是url loader会将小于limit大小的文件，
      // 转换为base64
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: imageInlineSizeLimit,
          name: '[name][hash:8].[ext]',
          publicPath: publicPath,
          outputPath: '',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: fontInlineSizeLimit,
              name: '[name][hash:8].[ext]',
              publicPath: publicPath,
              outputPath: '',
              fallback: require.resolve('file-loader'),
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: paths.src,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isProd,
        }),
        sideEffects: true,
      },

      {
        test: /\.less$/,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            sourceMap: isProd,
          },
          'less-loader',
          {
            lessOptions: {
              modifyVars: {
                'ant-prefix': 'ant-main',
              },
              javascriptEnabled: true,
            },
          }
        ),
        sideEffects: true,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __NODE_ENV__: `"${NODE_ENV}"`,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '消费信贷系统-中原消费',
      template: paths.public + '/index.html', // template file
      favicon: paths.public + '/favicon.png',
      filename: 'index.html', // output file
      inject: 'body', // script插入body底部
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = webpackCommonConfig;
