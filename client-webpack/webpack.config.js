/* eslint-env node */
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  const isProd = env === 'production';

  const devPlugins = isProd ? [] : [
    // new BundleAnalyzerPlugin(),
    new HtmlPlugin({ template: './src/index.html' }),
    new Dotenv({ path: path.resolve(__dirname, './.env') }),
  ];

  return {
    entry: [
      './src/index.js'
    ],
    output: {
      filename: 'bundle.[hash].js',
      publicPath: '/'
    },
    devtool: isProd ? 'source-map' : 'inline-source-map',
    devServer: {
      port: 8080,
      historyApiFallback: true,
      proxy: {
        '/graphql': {
          target: 'http://localhost:7890',
          secure: false
        }
      }
    },
    plugins: [
      new CleanPlugin('./build/bundle.*.js'),
      ...devPlugins
    ],
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')(),
                  require('postcss-nested')(),
                  require('postcss-simple-vars')()
                ]
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|svg|gif)$/,
          use: {
            loader: 'url-loader',
            options: { limit: 1000 }, // the fallback is file-loader if limit is exceeded
          },
        }
      ]
    }

  };

};
