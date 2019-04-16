const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const webpack = require("webpack"); // 用于访问内置插件

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const workboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  /*入口*/
  entry: path.join(__dirname, "src/index.js"),

  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    chunkFilename: '[name]-[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader?cacheDirectory=true"],
        include: path.join(__dirname, "src")
      },{
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "postcss-loader"]
      },{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
            },
          },
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),

    new workboxPlugin.GenerateSW({
      cacheId: "webpack-pwa", // 设置前缀
      importWorkboxFrom: "local",
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
      //swDest: "sw.js", // 输出 Service worker 文件

      runtimeCaching: [
        // 配置路由请求缓存
        {
          urlPattern: /.*\.js/, // 匹配文件
          handler: "networkFirst" // 网络优先
        },
        {
          urlPattern: /https:\/\/.*\/static\/.*\.(jpg|png|js|css)/, // 匹配文件
          handler: "cacheFirst",
          options:{
            cacheName: 'my-img-cache',
            // Configure custom cache expiration.
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60,
            },
          }
        }
      ]
    }),

    new UglifyJSPlugin(), //压缩生成文件

    new webpack.DefinePlugin({
      //内置 压缩代码  把开发环境的Log 到成产环境后都去掉
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    //compress: true,
    historyApiFallback: true,
    host: "localhost",
    port: 8088
  }
};
