
module.exports={
    entry:"./index.js",
    output:{
        filename:"bundle.js",
    },
    module:{
        rules:[
            {
                //选中需要匹配的文件
                test:/\.css$/,
                use:['style-loader','css-loader'],
            }
        ]
    }
};