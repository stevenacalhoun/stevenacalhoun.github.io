var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  styles: path.join(__dirname, 'app/styles'),
  scripts: path.join(__dirname, 'app/scripts'),
  images: path.join(__dirname, 'app/images'),
}

module.exports = {
    entry: [
      path.resolve(PATHS.scripts, 'main.js')
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          loader: "babel-loader",
          include: PATHS.scripts
        },
        {
          test: /\.scss$/,
          loader: "style!css!sass",
          include: PATHS.styles
        },
        {
          test: /\.(png|gif|jpg)$/,
          loader: "file-loader?name=img/img-[hash:6].[ext]"
        },
        {
          test: /\:.html$/,
          loader: "html-loader"
        }
      ]
    },
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js', '.json']
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: 'app/favicon.ico',
        template: './app/index.html',
        title: 'Steven Calhoun'
      }),
      new CopyWebpackPlugin([
        { from: 'app/files/Steven\ Calhoun\ Resume.pdf', to: 'files/Steven\ Calhoun\ Resume.pdf' },
        { from: 'CNAME', to: './'}
      ])
    ]
};
