var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }, ]
    },

    externals: { //不从 bundle 中引用依赖 运行时从外部引用依赖，例如jquery
        'data': 'data'
    }

};