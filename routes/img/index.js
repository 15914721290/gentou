//图片频道模块路由
var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var errLoad = require('../error.js');
var noRes = require('../noData')
var func = require('../cmfunc.js')();
var m = require('../api/menu.js');//导航接口
//详情页
router.get('/:id.html', (req, res, next)=>{
	m(function(menu,menu2){
		var tid = req.params.id;
		//图片栏目
		var thisChannel = menu2['pics'];
		
		var list_01 = [];
		list_01[0] = global.http1(global.sv+'/api/categories/'+thisChannel.AggregateId+'/children');// 子栏目接口
		list_01[1] = global.http1(global.sv+'/api/articles/'+tid);// 文章详情接口
		list_01[2] = global.http1(global.sv+'/api/positions?types=26');//查精选图片推荐位置
		list_01[3] = global.http1(global.sv+'/api/positions?types=53');//底部热门关注推荐位置
		list_01[4] = global.http1(global.sv+'/api/positions?types=1');//热搜词位置
		list_01[5] = global.http1(global.sv+'/api/positions?types=50');//栏目推荐位位置

		var site = {title2:'',title:'',keywords:'',description:'',path:global.path};
		var assignObj = {site:site,menu:menu,menuid:'pics',columnid:'',url:global.path+'/pics',children:[],articleList:{Records:[],listTitle:''},thisChannel:thisChannel,data: { message: ''},
		information:{},articleChannel:[],newArticle:[],indexList:{types1:[],types50:[],types53:[],types26:[]}};
		
		axios.all(list_01).then(axios.spread(function(res1,res2,res3,res4,res5,res6){
			//图片频道子栏目数据
			var children = res1.data.result;
			assignObj.children = children;
			//文章详情数据
			var information = res2.data.result;
			if(information==null){errLoad(req,res);return;}
			assignObj.information = information;
			//精选图片位置数据
			var picSelect = res3.data.result;
			var bottomHots = res4.data.result;
			var list_02 = [];
			list_02[0] = global.http1(global.sv+'/api/categories/'+information.CategoryId);//对应文章的子栏目接口
			list_02[1] = global.http1(global.sv+'/api/positions/'+picSelect[0].AggregateId+'/links?size=4');//精选图片链接接口
			list_02[2] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');
			list_02[3] = func.tjReq2(res5.data.result[0]);
			list_02[4] = func.tjReq2(res6.data.result[0]);
			
			axios.all(list_02).then(axios.spread(function(res1,res2,res3,res4,res5){
				//对应文章的子栏目数据
				var articleChannel = res1.data.result;
				assignObj.articleChannel = articleChannel;
				//最近更新的文章接口
				var a4 =global.http1(global.sv+'/api/articles/group?topCategoryIds='+thisChannel.AggregateId+'&size=4'); 
				assignObj.indexList = {
					types1:noRes(res4,1),
					types50:noRes(res5,1),
	                types53:noRes(res3,1),
					types26:noRes(res2,1)
				}
				axios.all([a4]).then(axios.spread(function(res4){
					//最近更新的文章数据
					var newArticle = res4.data.result;
					assignObj.newArticle = newArticle;
					assignObj.columnid = articleChannel.Alias;
					assignObj.site.title2 = articleChannel.Name;
					assignObj.information.PublishDate = moment(assignObj.information.PublishDate).format('YYYY-MM-DD H:mm');
					res.render('img/details', assignObj);
				}))
			}))
		})).catch(function(err1){
			res.render('img/details', assignObj);
		})
	})
});









//栏目页
router.get('/:type-:page', (req, res, next)=>{
	m(function(menu,menu2){
		var type = req.params.type;
		var page = req.params.page;
		if (req.originalUrl.substr(-1) != '/') {
			res.redirect(301, '/pics/' + type +'-'+page + '/');
		}
		//图片频道
		var thisChannel = menu2['pics'];
		var list_01 = [];
		list_01[0] = global.http1(global.sv+'/api/categories/'+thisChannel.AggregateId+'/children');// 子栏目
		list_01[1] = global.http1(global.sv+'/api/categories/'+type);//查子栏目详情
		list_01[2] = global.http1(global.sv+'/api/positions?types=53');//底部热门关注推荐位置
		list_01[3] = global.http1(global.sv+'/api/positions?types=1');//热词
		list_01[4] = global.http1(global.sv+'/api/positions?types=50');
		var site = {title2:'',title:'',keywords:'',description:'',path:global.path};
			var assignObj = {site:site,menu:menu,menuid:'pics',columnid:type,url:global.path+'/pics',children:[],articleList:{Records:[],listTitle:''},picArticles:[].Records,url2: site.path + '/pics/'+type,
			articlePage:'',indexList:{types1:[],types50:[],types53:[]},thisChannel:thisChannel,data: { message: ''}};

		axios.all(list_01).then(axios.spread(function(res1,res2,res3,res4,res5){
			var children = res1.data.result;
			var picsList=res2.data.result;
			var bottomHots = res3.data.result;
			var list_02 = [];
			list_02[0] = global.http1(global.sv+'/api/categories/'+picsList.AggregateId+'/articles?page='+page+'&size=12');//子栏目文章列表
			list_02[1] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');
			list_02[2] = func.tjReq2(res4.data.result[0]);
			list_02[3] = func.tjReq2(res5.data.result[0]);

			axios.all(list_02).then(axios.spread(function(res1,res2,res3,res4){
				var picArticles=res1.data.result;
				//分页
				var articlePage = func.page(picArticles.PageNow, picArticles.PageSize, picArticles.TotalCount);
				if(!thisChannel.Subtitle){thisChannel.Subtitle='';}
				var indexList ={
	                types1:res3.data.result,
	                types50:res4.data.result,
	                types53:res2.data.result
            	}
				assignObj.picArticles = picArticles.Records;
				assignObj.children = children;
				assignObj.articlePage = articlePage;
				assignObj.indexList = {
					types1:noRes(res1,1),
					types50:noRes(res4,1),
	                types53:noRes(res2,1)
				}
				assignObj.site.title = thisChannel.Name+thisChannel.Subtitle+'_唯爱图库';
				assignObj.site.title2 = picsList.Name;

				res.render('img/column', assignObj);
			}))
		})).catch(function(err1){
			res.render('img/column', assignObj);
		})
	})
});




router.get('/:type',(req,res,next)=>{
	m(function(menu,menu2){
		var type = req.params.type;
		var thisChannel = menu2['pics'];
		var list_01 = [];
		list_01[0] = global.http1(global.sv+'/api/categories/'+thisChannel.AggregateId+'/children');// 子栏目
		list_01[1] = global.http1(global.sv+'/api/categories/'+type);//栏目详情
		list_01[2] = global.http1(global.sv+'/api/positions?types=53');//底部热门关注推荐位置
		list_01[3] = global.http1(global.sv+'/api/positions?types=1');// 热词
		list_01[4] = global.http1(global.sv+'/api/positions?types=50');//顶部广告图

		var site = {title2:'',title:'',keywords:'',description:'',path:global.path};
			var assignObj = {site:site,menu:global.menu,menuid:'pics',columnid:type,url:global.path+'/pics',children:[],articleList:{Records:[],listTitle:''},picArticles:[].Records,url2: site.path + '/pics/'+type,
			articlePage:'',indexList:{types1:[],types50:[],types53:[]},thisChannel:thisChannel,data: { message: ''}};
		axios.all(list_01).then(axios.spread(function(res1,res2,res3,res4,res5){
			var children = res1.data.result;
			var picsList=res2.data.result;
			var bottomHots = res3.data.result;
			var list_02 = [];
			list_02[0] = global.http1(global.sv+'/api/categories/'+picsList.AggregateId+'/articles?page=1&size=20');//栏目文章列表
			list_02[1] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');
			list_02[2] = func.tjReq2(res4.data.result[0]);
			list_02[3] = func.tjReq2(res5.data.result[0]);
			axios.all(list_02).then(axios.spread(function(res1,res2,res3,res4){
				var picArticles=res1.data.result;
				picArticles.listTitle = '热门两性图片';
				picArticles.listTitle02 =picsList.Name+ '图片';
				//分页
				var articlePage = func.page(picArticles.PageNow, picArticles.PageSize, picArticles.TotalCount);
				assignObj.picArticles = picArticles;
				assignObj.children = children;
				assignObj.articlePage = articlePage;
				assignObj.indexList = {
					types1:noRes(res3,1),
					types50:noRes(res4,1),
	                types53:noRes(res2,1)
				}
				if(!thisChannel.Subtitle){thisChannel.Subtitle='';}
				assignObj.site.title = thisChannel.Name+thisChannel.Subtitle+'_唯爱图库';
				assignObj.site.title2 = picsList.Name;
				res.render('img/column', assignObj);
			}))
		})).catch(function(err1){
			res.render('img/column', assignObj);
		})

	})
})

//频道页
router.get('/', (req, res, next)=>{
	if (req.originalUrl.substr(-1) != '/') {
		res.redirect(301, '/pics/');
	}
	m(function(menu,menu2){
		var thisChannel = menu2['pics'];
		var list_01 = [];
		list_01[0] = global.http1(global.sv+'/api/categories/'+thisChannel.AggregateId+'/children');// 子栏目
		list_01[1] = global.http1(global.sv+'/api/positions?types=41');// 图片频道轮播图推荐位置
		list_01[2] = global.http1(global.sv+'/api/positions?types=53');//底部热门关注推荐位置
		list_01[3] = global.http1(global.sv+'/api/positions?types=1');//热搜词位置
		list_01[4] = global.http1(global.sv+'/api/positions?types=50');//栏目推荐位位置

		var site = {title2:thisChannel.Name,title:'美女图片,性爱图片,性交图片,男女做爱图片_唯爱图库',keywords:'美女图片,性爱图片,性交图片,男女做爱图片',description:'唯爱两性图片频道提供最新最热门的两性图片，高清美女图、性爱图、性交图、男女做爱图，旨在传达健康的性教育观念。',path:global.path};
		var assignObj = {site:site,menu:menu,menuid:'pics',columnid:'',url:global.path+'/pics',url2:site.path + '/pics',url3:site.path,children:[],articleList:{Records:[],listTitle:''},picArticles:[],data: { message: ''},
		indexList:{types1:[],types50:[],types53:[],types41:[]},articlePage:'',thisChannel:thisChannel};
		axios.all(list_01).then(axios.spread(function(res1,res2,res3,res4,res5){
			var children = res1.data.result;
			assignObj.children = children;
			var picsPosition = res2.data.result;
			var bottomHots = res3.data.result;
			
			var list_02 = [];
			list_02[0] = global.http1(global.sv+'/api/positions/'+picsPosition[0].AggregateId+'/links?size=5');// 查轮播图接口
			list_02[1] = global.http1(global.sv+'/api/categories/channels/'+thisChannel.AggregateId+'/articles?page=1&size=20');
			list_02[2] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=1000');
			list_02[3] = func.tjReq2(res4.data.result[0]);
			list_02[4] = func.tjReq2(res5.data.result[0]);
			
			axios.all(list_02).then(axios.spread(function(res1,res2,res3,res4,res5){
				// 子栏目的文章列表
				picArticles=res2.data.result;
				picArticles.listTitle = '两性图片精选';
				picArticles.listTitle02 ='两性图片精选';
				assignObj.picArticles = picArticles;
				// 分页
				var articlePage = func.page(picArticles.PageNow, picArticles.PageSize, picArticles.TotalCount);
				assignObj.articlePage = articlePage;
				assignObj.indexList = {
					types1 :noRes(res4,1),
					types50:noRes(res5,1),
	                types53:noRes(res3,1),
					types41:noRes(res1,1)
				}
                assignObj.position = 1
				res.render('img/index', assignObj);
			}))
		})).catch(function(err1){
			res.render('img/index', assignObj);
		})
		
	})

});

module.exports = router;
