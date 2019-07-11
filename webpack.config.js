
const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./app/server.js",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", "*"]
  },
  module: {
    rules: []
  },
  node: {
    fs: 'empty'
  },
  devtool: "source-map"
};