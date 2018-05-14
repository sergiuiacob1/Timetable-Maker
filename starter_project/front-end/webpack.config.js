const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    if (extension === 'html')
      return new HtmlWebpackPlugin({
        hash: true,
        filename: `${name}.html`,
        chunks: [name],
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: 'body'
      });
  }).filter((e) => e !== undefined);
}

const htmlPlugins = generateHtmlPlugins('./src/')
console.log(htmlPlugins);

module.exports = {
  devtool: 'inline-sourcemap',
  context: __dirname,
  entry: {
    app: './src/index.js',
    login: './src/login.js',
    admin: './src/admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ].concat(htmlPlugins)
}
