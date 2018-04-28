var webpack = require('webpack');

module.exports = {
    entry: {
        bundle1: './index1.js',
        bundle2: './index2.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    },
    plugins: [ //CommonsChunkPlugin是提取公共代码块用的
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
        })
    ]
};