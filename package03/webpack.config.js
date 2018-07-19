const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        // publicPath: "dist/" 
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    ExtractCssChunks.loader,
                    // "style-loader",   // 将加载好的css文件添加进页面<style>标签
                    "css-loader", // 加载.css文件
                    "sass-loader" // 解析sass less同理
                ]
            }, {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: "file-loader?limit=8192&name=images/[hash:8].[name].[ext]"
                }]
            }
        ]
    },
    plugins: [
        new ExtractCssChunks({
            filename: "[name].css",
            chunkFilename: "[id].css",
            hot: true,
        }),
        new HtmlWebpackPlugin({
            file: "./index.html",
            template: "src/index.html",
        })
    ],
    devServer: {
        port:"8088",
        // contentBase: "./dist", //本地服务器所加载的页面所在的目录
        // hot:true,
        // colors: true, //终端中输出结果为彩色
        // historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        // progress:true
    }
};