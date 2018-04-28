const path = require('path')

module.exports = {
    devtool: 'eval-source-map',  //打包后可调试代码
    entry: "./main.jsx",
    output: {
        filename: "bundle.js",
        // path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    }
}