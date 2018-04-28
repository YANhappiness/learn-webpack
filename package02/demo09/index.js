// product 环境
document.write('<h1>生产环境</h1>');

// dev 环境
if(__DEV__){
    document.write(new Date());
}