####webpack 使用说明步骤

- 参考链接

webpack 官网 ： http://webpack.github.io/docs/
webpack 慕课网webpack教程 ： https://www.imooc.com/learn/802
webpack 插件html-webpack-plugin npm : https://www.npmjs.com/package/html-webpack-plugin
babel-loader 用于支持es高版本语法 插件官网 http://babeljs.io/


- webpack-demo 目录结构
    -dist //打包后的静态资源
        -js
        -index.html
    -node_modules
    -src  //引用库文件
        -script
        -style
    -temp  //html模版
        -index.ejs
    -index.html 
    -package-lock.json
    -package.json  //npm 配置文件
    webpack.config.js   //webpack 配置文件
    README.me  

0. 初始化npm文件包 文件名应避免和要安装的包同名
    npm init   //Refusing to install package with name "webpack" under a package
1. 全局安装webpack文件
    npm install webpack -g
    npm install webpack --save-dev 本地安装

2. 打包js文件  被打包文件名  生成文件名
    webpack test.js  bundle.js

3. 安装打包css文件工具包
    npm install css-loader style-loader --save-dev

4. 打包css文件 通过命令行指定 load
    webpack hello.js bundle.js --module-bind "css=style-loader!css-loader"   //双引号

5. 自动打包参数 读条 显示引用模块 打包原因  监听
    webpack hello.js bundle.js --progress --display-modules --display-reasons --watch

6. webpack 配置文件  webpack.config.js
    webpack  <自动执行webpack.config.js 文件>
    webpack --config webpack.dev.config.js

7. webpack 在npm中的配置 "script"下
    "webpack":"webpack --config webpack.config.js --progress --display-modules --colors --display-reason --watch"

8. 通过npm运行webpack配置文件
    npm run webpack

9. webpack插件  html-webpack-plugin 
    npm install html-webpach-plugin --save-dev

10. entry //webpack 入口文件 
    entry :"./src/script/main.js"  // 字符串
    entry :["./src/script/main.js","./src/script/test.js"]   //数组
    entry: {                                  //对象
        page1:"./src/script/main.js",
        page2:"./src/script/test.js"
    }
    
    其中数组和对象适用于多入口文件，如果多个入口而只有一个output path 则会覆盖之前文件，仅保留一个文件
    Multiple assets emit to the same filename bundle.js //报错

11. output path<绝对路径> filename文件名
    当多个入口文件时 filename需要通过[name]、[hash]、[chunkhash]占位符区别

- 插件内应用
12. 利用插件在页面中引用动态的js文件 html-webpack-plugin
    npm install html-webpack-plugin --save-dev  //安装
    
    const htmlWebpackPlugin = require("html-webpack-plugin");  //引入

    plugins:[ new htmlWebpackPlugin({
        filename:'index-[hash].html',
        template: 'index.html',
        inject:'body',
        title:'this title from webpack！ ',
        }), ],  //调用  指定模版
    
    结果：在指定目录、指定模版下生成index.html文件。

13. webpack使用ejs模版语法可导入插件中设置的title
    <%= htmlWebpackPlugin.options.title%> //通过ejs语法可以遍历htmlWebpackPlugin

    //webpack不可以直接解析以.html为模版的ejs语法
    If you already have a template loader, you can use it to parse the template. Please note that this will also happen if you specifiy the html-loader and use .html file as template.
    //出处：npm html-webpack-plugin插件说明  https://www.npmjs.com/package/html-webpack-plugin
    不过却可以直接解析ejs为模版的内容
    可以在path中直接引用.ejs文件作为模版，或者可以引用 html-loader帮助解析!!!

14. 通过ejs语法可以获取webpack打包的信息，chunks.entery 即可以手动配置js文件
    <script type="text/javscript" src="<%=htmlWebpackPlugin.files.chunks.main.entry%>"></script>
    
    此时，plugins:[inject:false] //不允许插入

15. output 'publicpath' 上线引用地址
    publicPath: 'http://cdn.com/' //上线地址  结尾有/，占位符

16. 文件压缩 minify
    minify:{
        removeComments:true,   //去注释
        collapseWhitespace:true, //去空格
    }

    参考链接 ： https://github.com/kangax/html-minifier#options-quick-reference

17. 配置多页面应用 应用不同打包js
    plugins:[
        new htmlWebpackPlugin({
            filename:"a.html",
            template:"./temp/temp.ejs",
            inject:"body",
            title:"a.html",
            chunks:["a"]   //chunks指定引用入口文件的文件名
        }),
            new htmlWebpackPlugin({
            filename:"b.html",
            template:"./temp/temp.ejs",
            inject:"body",
            title:"b.html",
            <!-- chunks:["b"],   //chunks引用入口文件的文件名 -->
            excludeChunks:["a"]  //引用entry中除了a之外的所有文件
        }),
    ]

18. loader以及loader特性
    -src        单页面目录结构
        -components  //组件文件夹
            -layer  //layer组件
                -layer.html
                -layer.js
                -layer.less
        -app.js  //文件入口
    
    loader用于预处理文件，可以将文件从不同的语言转化为javascript
    安装： npm install <loader-name>
    使用：
    01. require声明中指定loader 
        require("./loader!./dir/file.txt"); 
    02. 配置文件中 配置 test:正则配置符合条件的文件 ， loader/loaders引用需要加载的loader
        {
        module: {
            loaders: [
                { test: /\.jade$/, loader: "jade" },
                // => "jade" loader is used for ".jade" files
                { test: /\.css$/, loader: "style!css" },
                // => "style" and "css" loader is used for ".css" files
                // Alternative syntax:
                { test: /\.css$/, loaders: ["style", "css"] },
            ]
        }
    }
    03. cli执行命令时指定
        $ webpack --module-bind jade --module-bind 'css=style!css'

19. 使用babel转化为js语法
    安装： npm install --save-dev babel-loader babel-core
    配置： 
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
    通过指定presets来生成不同支持版本 es5/es6/es7...
    //该插件为babel插件，使用前需要安装
    npm install babel-presets-latest --save-dev
    {
     "presets": ["env"]   //latest
    }








