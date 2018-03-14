//配置需要生成css的less
//创建者：womendi@qq.com
//日期：2017-11-30
module.exports = ()=>{
    //fromPath为less文件路径
    //toPath为生成css后的css文件路径
    //对应根目录为views_assets
    var cssArr=[
        {fromPath:'/less/cmstyle.less',toPath:'/css/apps/cmstyle.css',isCompress:false},
        {fromPath:'/less/cmreset.less',toPath:'/css/apps/cmreset.css',isCompress:false},
        {fromPath:'/less/common.less',toPath:'/css/apps/common.css',isCompress:false}
    ];
    return cssArr;
}