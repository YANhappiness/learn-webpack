var webpack = require('webpack');

module.exports = {
    entry: {
        app: './index.js',
        vendor: ['jquery'],
    },
    output: {
        filename: 'bundle.js'
    },
    plugins: [

        // jquery 为共同的引用文件，commonschunkPlugin 可提取共通文件，仅打包一次
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ]
};
