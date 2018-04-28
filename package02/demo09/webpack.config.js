var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
    //__DEV__ 默认是false 除非手动配置
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    entry: "./index.js",
    output: {
        filename: 'bundle.js',
    },
    plugins: [devFlagPlugin]
}