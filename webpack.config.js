const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./app/index.js",
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
  devtool: "source-map"
};
