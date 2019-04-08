const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,

        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',

        options: {
          plugins: ['syntax-dynamic-import'],

          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                useBuiltIns: 'usage'
              }
            ]
          ]
        },
      },
      {
        test: /\.s?css$/,

        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.vue$/,

        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },

  entry: {
    'js/main': './src/js/main.js'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'static', 'weather')
  },

  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    hot: true,
    overlay: true,
    port: 9000,
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    },
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm',
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.vue', '.js', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
};
