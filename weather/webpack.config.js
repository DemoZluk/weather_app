const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
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
            outputPath: 'font/'
          }
        }]
      }
    ]
  },

  entry: {
    'main': './src/js/main.js'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'static', 'weather', 'bundles')
  },

  mode: 'production',

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      },
    }
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
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    }),
  ],
};
