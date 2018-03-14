//路由设置
//创建者：womendi@qq.com
//日期：2017-11-28
module.exports=(app)=>{

	global.cmfunc = require('./cmfunc')();
	var menu2 = require('./api/menu2')(function(m1,m2){

	});

    var svurl = [
        {'url':'','name':'本地环境'},
        {'url':'','name':'测试环境'},
        {'url':'','name':'生产环境'}
	];
	var apiurl = [
		{'url':'http://192.168.1.111:8210','name':'本地环境'},
        {'url':'http://120.76.153.210:8012','name':'测试环境'},
        {'url':'','name':'正式环境'}
    ];
	//0为本地环境，1为测试环境，2为正式环境
	var serverId = 1;
	global.sv = apiurl[serverId].url;
	global.path = svurl[serverId].url;
	
	global.http1 = require('./axios2.js');//http请求方法

	//全局格式化时间日期
	global.moment = require('moment');

	var routeArr = {
		'api':{'url_name':'api','url':'/api','path':'./api/main'},//中转后台接口路由，固定
		'baike':{'url_name':'baike','url':'/baike','path':'./baike/index'},//百科路由
		'news':{'url_name':'news','url':'/news','path':'./news/index'},//资讯路由
		'rank':{'url_name':'rank','url':'/rank','path':'./rank/index'},//排行榜路由
		'zt':{'url_name':'zt','url':'/zt','path':'./zt/index'},//专题路由
		'img2':{'url_name':'img','url':'/','path':'./img/page'},//路由
		'img':{'url_name':'img','url':'/pics','path':'./img/index'},//图库路由
		'index':{'url_name':'index','url':'/','path':'./index/index'},//首页路由,频道路由和关于我们路由也在里面
	};
	for(var i in routeArr){
		app.use(routeArr[i].url,require(routeArr[i].path));
	}
	var err = require('./error');
	app.use(err);
}