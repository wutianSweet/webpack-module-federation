const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    target: 'web',
    entry: './src/index.js',
    mode: "development",
    output: { 
        filename: "[name].js",
        chunkFilename:"[name].js",
        publicPath: "auto"
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        contentBase: path.join(__dirname, "dist"),
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
            name: "main_app",
            remotes: {
                'remote_app': "remote_app@http://localhost:3001/remoteEntry.js", // （接受app1的“微服务”），remoteEntry可以理解为中间代理人）
            },
            shared: {
                vue: {
                    singleton: true
                }
            }
        })
    ]
}

