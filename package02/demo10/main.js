// require('./a.js');
// require.ensure([], function (require) {
//     require('./b.js');
// });

require.ensure(['./c'],function(){
    const content = require('./c');
    document.open();
    document.write('<h1>' + content + '</h1>');
    document.close();
});