const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    vendors: ['react', 'react-dom', 'react-refresh/runtime'],
    app: ['./src/index.tsx'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    symlinks: false,
  },
  output: {
    filename: '[name].js',
    pathinfo: false,
  },
  experiments: {
    lazyCompilation: {
      entries: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                transform: {
                  react: {
                    development: true,
                    refresh: true,
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    hot: true,
    host: 'localhost',
    port: 5173,
    client: { overlay: false },
  },
};

module.exports = webpackConfig;
