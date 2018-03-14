//导航接口
module.exports = (func)=>{
    var p = global.path;
    var result = [{'Name':'首页',url:'/'},
    {'Name':'资讯',url:'/news/'},
    {'Name':'平台库',url:'/p2p/'},
    {'Name':'百科',url:'/baike/'},
    {'Name':'专题',url:'/zt/'},
    {'Name':'排行榜',url:'/rank/'},
    {'Name':'平台地图',url:'p2p-dh'},
    ],newObj={};
    for(i in result){
        newObj[result[i].url]=result[i];
    }
    global.menu = result;
    global.menu2 = newObj;
    func&func(result,newObj);
}