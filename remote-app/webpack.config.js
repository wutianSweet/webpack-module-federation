const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    target: 'web',
    entry: './src/index.js',
    mode: "development",
    devServer: {
      port: 3001,
      hot: true,
      open: true,
      contentBase: path.join(__dirname, "dist"),
    },
    output: { 
      filename: "[name].js",
      chunkFilename:"[name].js",
      publicPath: "auto"
  },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
          {
            test: /.vue$/,
            loader: 'vue-loader'
          }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new ModuleFederationPlugin({
            // 唯一ID，用于标记当前服务
            name: "remote_app",
            // 提供给其他服务加载的文件
            filename: "remoteEntry.js",
            exposes: {
              './Button': "./src/components/Button/index.vue",
            },
             shared: {
                vue: {
                    singleton: true
                }
            }
          })
      ]
}

