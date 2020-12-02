const webpack = require("webpack");

module.exports = {
  entry:"./src/index.js",
  mode:"development",
  module:{
    rules: [
      {
        test:/\.js$/, 
        exclude:/node_modules/, 
        loader:"babel-loader",
      },
      {
        test:/\.css$/,
        use:["style-loader", "css-loader"]
      }
    ],
  },
  devServer:{
    contentBase:"./dist",
    port: 3001,
    proxy: {
      "/api":"http://localhost:3002"
    }
  }
}