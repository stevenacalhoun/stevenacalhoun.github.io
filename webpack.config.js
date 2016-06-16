var path = require('path');
var bourbon = require('node-bourbon').includePaths;
var CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  styles: path.join(__dirname, 'app/styles'),
  scripts: path.join(__dirname, 'app/scripts'),
  images: path.join(__dirname, 'app/images'),
}

module.exports = {
    entry: [
      path.resolve(PATHS.scripts, 'main.js'),
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
    ],
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: "style!css!sass?includePaths[]=" + bourbon,
          include: PATHS.styles
        },
        {
          test: /\.(png)$/,
          loader: "file-loader?name=img/img-[hash:6].[ext]"
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
      new CopyWebpackPlugin([
        { from: 'app/index.html' },
        { from: 'app/files/Steven\ Calhoun\ Resume.pdf', to: 'files/Steven\ Calhoun\ Resume.pdf' },
      ])
    ]
};
