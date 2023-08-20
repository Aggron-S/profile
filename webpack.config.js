const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: false,
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "public"),   // change to dist and place the public's index.html to dist (for deployment purposes)
    filename: "main.js",
  },
  // watch: true,

  target: "web",
  devServer: {
    port: "3000",
    static: ["./public"],
    // open: true,
    open: {
      app: {
        // avoid hardcoding browser's name, it is platform-dependent
        name: "brave",
        arguments: ["--incognito" /* "--new-window" */],
      },
    },
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"],
  },
  module: {
    rules: [
      // For js/jsx babel transcompiler
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // see my npm txt lists, how to exclude node_modules except specific modules needed to bundle
        // exclude: /node_modules\/(?!(my_main_package\/what_i_need_to_include)\/).*/,
        use: "babel-loader",
      },
      // For File loading purposes
      {
        test: /\.(png|jpe?g|gif|svg|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // For File loading purposes, but with limit
      // {
      //   test: /\.(png|jpg|gif|svg|mp4)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
      
      // For style loading
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //       favicon: "./src/assets/canva/w-logo.png"
        
  //   })
  // ]
};
