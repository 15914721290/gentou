//index模块路由
var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var errLoad = require('../error.js');
var cmfunc = require('../cmfunc.js')();
var m = require('../api/menu.js');//导航接口
var noRes = require('../noData');
//搜索
router.get('/search', (req, res, next) => {
	res.redirect(301, '/search/k=');
});

var search = function (req, res) {
	m(function (menu, menu2) {
		var tid = req.params.id;
		var gtid = tid;
		var senArr = ['%', '&', '*', '+', '<', '>', ':', '/', undefined]
		senArr.forEach(function (item, index) {
			if (!gtid || gtid.indexOf(item) != -1) {
				gtid = undefined;
			}
		})
		var page = 1;
		var thisChannel = menu2['lxxl'] ? menu2['lxxl'] : { 'AggregateId': '', 'Name': '' };
		var list_01 = [];
		list_01[0] = global.http1(global.sv + '/api/articles/search/' + encodeURI(gtid), { page: page ? parseInt(page) : 1, size: 10 });//搜索接口
		list_01[1] = global.http1(global.sv + '/api/categories/rank', { size: 10, days: 30 });//排行接口
		list_01[2] = global.http1(global.sv + '/api/categories/' + thisChannel.AggregateId + '/rank', { size: 10, days: 7 });//右侧排行
		list_01[3] = global.http1(global.sv + '/api/categories/rank', { size: 10, days: 7 });//右侧排行
		list_01[4] = global.http1(global.sv + '/api/positions?types=34&categoryId=' + thisChannel.AggregateId);//热门百科
		list_01[5] = global.http1(global.sv + '/api/positions?types=35');//全部百科
		list_01[6] = global.http1(global.sv + '/api/positions?types=46');//精彩图片
		list_01[7] = global.http1(global.sv + '/api/positions?types=47');//全部图片
		list_01[8] = global.http1(global.sv + '/api/positions?types=51');//右一广告位
		list_01[9] = global.http1(global.sv + '/api/positions?types=53');//底部热门关注推荐位置
		list_01[10] = global.http1(global.sv + '/api/positions?types=1');//热搜词位置
		var site = { title: '', keywords: '', description: '', path: global.path };
		var assignObj = {
			site: site, menu: menu, menuid: 'search', url: site.path, moment: global.moment, children: [], articleList: [],
			articlePage: '', data: { message: tid }, rightRank1: { Records: [] }, rightRank2: { Records: [] }, indexList: { types34: [], types35: [], types36: [], types37: [], types50: [], types51: [], types53: [], types1: [], }
		};
		axios.all(list_01).then(axios.spread(function (res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11) {
			var children = [];
			var articleList = res1.data.result ? res1.data.result : [];
			articleList.isHave = 1;
			articleList.listTitle = tid;

			//搜索不到数据时
			if (articleList.Records.length == 0) {
				articleList = {};
				articleList.isHave = 0;
				articleList.Records = res2.data.result;
				articleList.listTitle = '推荐阅读';
			}
			var list_02 = [];
			list_02[0] = cmfunc.tjReq2(res5.data.result[0], { page: 1, size: 20 });//热门百科
			list_02[1] = cmfunc.tjReq2(res6.data.result[0], { page: 1, size: 20 });//全部百科
			list_02[2] = cmfunc.tjReq2(res7.data.result[0], { page: 1, size: 4 });//热门图片
			list_02[3] = cmfunc.tjReq2(res8.data.result[0], { page: 1, size: 4 });//全部图片
			list_02[4] = cmfunc.tjReq2(res9.data.result[0]);//右一广告位
			list_02[5] = cmfunc.tjReq2(res10.data.result[0], { page: 1, size: 50 });//底部热门关注数据接口
			list_02[6] = cmfunc.tjReq2(res11.data.result[0]);//热搜词位置

			var articlePage = cmfunc.page(articleList.PageNow, articleList.PageSize, articleList.TotalCount);
			assignObj.rightRank1 = { title: '两性心理', Records: res3 ? res3.data.result : [] };
			assignObj.rightRank2 = { title: '全部排行', Records: res4 ? res4.data.result : [] };
			axios.all(list_02).then(axios.spread(function (res1, res2, res3, res4, res5, res6, res7) {
				assignObj.indexList = {
					types34: res1 ? (res1.data.result.PageNow ? res1.data.result.Records : res1.data.result) : [],
					types35: res2 ? (res2.data.result.PageNow ? res2.data.result.Records : res2.data.result) : [],
					types36: res3 ? (res3.data.result.PageNow ? res3.data.result.Records : res3.data.result) : [],
					types37: res4 ? (res4.data.result.PageNow ? res4.data.result.Records : res4.data.result) : [],
					types50: [],
					types51: (res5 && res5.data.result.length > 0) ? (res5.data.result[0]) : [],
					types53: res6 ? (res6.data.result) : [],
					types1: res7 ? (res7.data.result) : []
				};
				assignObj.articlePage = cmfunc.page(articleList.PageNow, articleList.PageSize, articleList.TotalCount);
				assignObj.children = children;
				assignObj.articleList = articleList;
				if (tid == undefined) { tid = '' }
				assignObj.site.title = tid + '_唯爱健康网';
				assignObj.position = 2
				res.render('index/search', assignObj);
			}))

		})).catch(function (err) {
			res.render('index/search', assignObj);
		});
	});
}

router.get('/search/k=', (req, res, next) => {
	search(req, res);
});
router.get('/search/k=:id', (req, res, next) => {
	search(req, res);
});
//搜索
//首页
router.get('/index.html', (req, res, next) => {
	res.redirect(301, '/');
});

router.get('/', (req, res, next) => {
	var site = {name:'互金跟投',title: '互金跟投_P2P网贷平台_P2P 投资理财综合门户', keywords: '网贷,网贷平台,P2P网贷,P2P网贷平台,P2P理财,P2P投资理财', description: '互金跟投是国内专业的P2P网贷平台，致力于提 供最新网贷新闻、海量网贷平台数据、实用投资 理财工具查询，汇聚数百家P2P网贷理财公司核 心信息，帮助您选择最好的P2P网贷平台。', path: global.path };
	var assignObj = {
		site: site, menu: global.menu, menuid: '/',data:{message:''}, url: site.path + '/', moment: global.moment};
	res.render('index/index', assignObj);
});
//首页

//关于我们路由单独一个js
var about = require('./about.js');
router = about(router);
//关于我们路由单独一个js


//平台库路由
var platform = require('../platform/p2p.js');
router = platform(router);

var platform = require('../platform/index.js');
router = platform(router);
//平台库路由

//频道路由单独一个js
var pd = require('../channel/index.js');
router = pd(router);
//频道路由单独一个js


module.exports = router;