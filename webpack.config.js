/* eslint-disable */

//path is a native module that doesnt require to be installed.
var path = require("path");

module.exports =
{
  entry: {
    "main":"./src/index.jsx"
  },
  target:'web',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/",
  },
  module: {
    loaders: [
    {
      test: /(\.js|\.jsx)$/,
      loader: "babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-1"
    }
    ]
  }
}