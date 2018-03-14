//npm命令行:less生成css
//创建者：womendi@qq.com
//日期：2017-12-01
var path = require('path');
var le2css = require('./less2css');

module.exports = ()=>{
    var buildDir = global.buildDir;
    var dir = global.staticDir;
    var cssArr = require('./lessConf')();
    if(cssArr.length>0){
        var len=cssArr.length;
        for(var i=0;i<len;i++){
            le2css(buildDir+cssArr[i].fromPath,dir+cssArr[i].toPath,'',cssArr[i].isCompress);
        }
    }
};
