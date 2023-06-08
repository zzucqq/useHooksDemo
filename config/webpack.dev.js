const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');
const commonConfig = require('./webpack.common');

const { API_ENV } = process.env;

const proxy_target = {
  dev: 'http://10.94.25.110:8000',
  local: 'http://60.64.56.21:8000',
  sit: 'http://10.94.25.110:8000',
  auto: 'http://111.231.45.86:8000',
  uat: 'http://60.64.56.21:8000',
};

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    compress: true,
    hot: true,
    open: true,
    port: 8080,
    proxy: {
      // 用法1： 请求到 /api/xxx 现在会被代理到请求 http://localhost:3000/api/xxx, 例如 /api/user 现在会被代理到请求 http://localhost:3000/api/user
      // '/api': 'http://localhost:3000',
      // 用法2： 请求到 /api2/xxx 现在会被代理到请求 http://localhost:3000/xxx, 例如 /api2/user 现在会被代理到请求 http://localhost:3000/user
      '/api': {
        target: proxy_target[API_ENV],
        pathRewrite: { '^/api': '/fpi' },
        // secure: false, // 是否验证SSL Certs，默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果想要接受，只要设置 secure: false 就行
        // changeOrigin: true, // 将主机标头的原点更改为目标URL，默认false，如果接口跨域，需要进行这个参数配置
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()].filter(Boolean),
});
