const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin");
// module.exports={
//     // entry:"./src/script/main.js",  //入口文件 字符串、数组、对象
//     // entry: ["./src/script/main.js","./src/script/test.js"], //数组
//     entry:{
//         main:"./src/script/main.js",
//         test:"./src/script/test.js",
//         page:"./src/script/page2.js",
//     },
//     output:{
//         path:path.resolve( __dirname,"./dist"),  //本地地址 此处需要绝对路径
//         filename:"js/[name]-[hash].js",
//         publicPath: 'http://cdn.com/'   //上线地址  结尾有/，表示path+filename位于占位符之后
//     },
//     plugins:[
//         new htmlWebpackPlugin({
//             filename:"index.html", //重命名
//             template:"./temp/temp.ejs",    //引用模版
//             inject:"body",    //将生成js放在head/body标签内,或者false。
//             title: "this title is from webapck!",
//             date:new Date(),
//             // minify:{
//             //     removeComments:true,   //去注释
//             //     collapseWhitespace:true, //去空格
//             // }
//             // chunks:["main","test"],    //指定引用entry中的文件
//             excludeChunks:["page"]        //指定应用除了...之外的文件
//         }), 
//         new htmlWebpackPlugin({
//             filename: 'page.html',
//             template: "./temp/page.ejs",
//             inject: "body",
//             title:"this is page 2",
//             chunks:["page"],
//         })
//     ],
// };

//case 2 单页面应用配置文件
module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'./dist',
        filename: 'js/[name].bundle.js',
    },
    modules:{
        loader:[
            {
                test:/\.js$/,
                loader:"babel",
                // query:{
                //     presets:['latest'],
                // }
            }
        ],
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:"index.html",
            template:"./temp/page.ejs",
            inject:"body",
            title:"this title form webpack"
        }),
    ]
};