
//当使用文件束（bundle）加载文件的时候，chunk会被浏览器加载
//lazy 懒加载，不调用不会加载
var witeForChunk = require('bundle-loader?lazy!./a.js');

//为了等待chunk的加载完成（而且拿到了exports输出）

// 你需要异步加载等待
witeForChunk(function(file){
    document.open();
    document.write('<h1>'+file+'</h1>');
    document.close();
});


