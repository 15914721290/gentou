//百科模块路由
var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var func = require('../cmfunc.js')();
var errLoad = require('../error.js');
var noRes = require('../noData')
var m = require('../api/menu.js');//导航接口

//详情
// router.get('/lx:id.html', (req, res, next)=>{
// 	m(function(menu,menu2){
// 		var tid = req.params.id;
// 		var thisChannel = menu2['b'];
// 		var list_01 = [];
// 		list_01[0] = global.http1(global.sv+'/api/articles/'+tid);// 文章详情接口
// 		list_01[1] = global.http1(global.sv+'/api/articlelinks');// 内链的接口
// 		list_01[2] = global.http1(global.sv + '/api/categories/' + thisChannel.AggregateId + '/rank', { size: 10, days: 7 });//右侧排行
// 		list_01[3] = global.http1(global.sv + '/api/categories/rank', { size: 10, days: 7 });
// 		list_01[4] = global.http1(global.sv+'/api/categories/b/children');// 百科栏目
// 		list_01[5] = global.http1(global.sv+'/api/categories/channel');// 全部频道/
// 		list_01[6] = global.http1(global.sv+'/api/positions?types=53');//底部热门关注推荐位置
// 		list_01[7] = global.http1(global.sv+'/api/positions?types=1');//热搜词位置
// 		list_01[8] = global.http1(global.sv+'/api/positions?types=50');//栏目推荐位位置
// 		list_01[9] = global.http1(global.sv+'/api/positions?types=32&categoryId='+menu2['lxxl'].AggregateId);//两性健康
// 		list_01[10] = global.http1(global.sv+'/api/positions?types=33&categoryId='+menu2['lxxl'].AggregateId);//两性关系
// 		list_01[11] = global.http1(global.sv+'/api/positions?types=34&categoryId='+thisChannel.AggregateId);//热门百科
// 		list_01[12] = global.http1(global.sv+'/api/positions?types=35');//全部百科
// 		list_01[13] = global.http1(global.sv+'/api/positions?types=3');//右侧幻灯片的推荐位
// 		list_01[14] = global.http1(global.sv+'/api/positions?types=36&categoryId='+thisChannel.AggregateId);//精彩图片
// 		list_01[15] = global.http1(global.sv+'/api/positions?types=37');//全部图片
// 		list_01[16] = global.http1(global.sv+'/api/positions?types=51');//右一广告位
// 		list_01[17] = global.http1(global.sv+'/api/positions?types=52');//右二广告位
// 		list_01[18] = global.http1(global.sv+'/api/positions?types=54');//左一广告位

// 		var site = { title2:'',title:'', keywords:'', description: '', path: global.path};
// 		var assignObj = {site:site,menu:menu,menuid:thisChannel.Alias,columnid:'',url:global.path+'/b',children:[],lxRelation:{data:[]},
// 		articleList:{Records:[]},information:{Keywords:[]},rightRank1:{Records:[]},rightRank2:{Records:[]},related:[],chip:[],channelArr:[],thisChannel:thisChannel,data: { message: ''},
// 		channerlArticle:[],indexList:{types1 :[],types50:[],types53:[],types32:[],types33:[],types34:[],types35:[],types3:[],types36:[],types37:[],types51:[],types52:[],types54:[]},relatedtitle:'相关百科'};
// 		axios.all(list_01).then(axios.spread(function (res1,res2,res3,res4,res5,res6,res7,res8,res9,res10,res11,res12,res13,res14,res15,res16,res17,res18,res19) {
// 			var channel = res6.data.result;
			
// 			//6个栏目
// 			var channelArr = [];
// 			var topId = '';
// 			for(var i=0;i<channel.length;i++){if(channel[i].Name!='百科'&&channel[i].Name!='图库'){channelArr.push(channel[i]);}}
// 			for(var j=0;j<channelArr.length;j++){topId += 'topCategoryIds='+channelArr[j].AggregateId+'&';channelArr[j].index=j}
// 			topId = topId.substring(0,topId.length-1);
// 			// 文章详情接口
// 			var information = res1.data.result;
// 			if(information==null){
// 				errLoad(req,res);
//                    return;
// 			}
// 			if(information.Content==null){information.Content='';}
// 			assignObj.information = information;
// 			assignObj.channelArr = channelArr;
			
// 			// 内链的接口
// 			var info_02 = res2.data.result;
// 			// 右侧排行
// 			var rightRank1 = { title: thisChannel.Name, Records: res3.data.result };
// 			assignObj.rightRank1 = rightRank1;
// 			var rightRank2 = { title: '全部排行', Records: res4.data.result };
// 			assignObj.rightRank2 = rightRank2;
// 			// 栏目
// 			var children = res5.data.result;
// 			assignObj.children = children;
// 			// 替换关键词
// 			information.Content=func.aLinks(information.Content,info_02);
// 			var bottomHots = res7.data.result;
// 			var magList = [];
// 			magList[0] = global.http1(global.sv+'/api/articles/'+information.AggregateId+'/relations');// 相关百科接口
// 			magList[1] = global.http1(global.sv+'/api/articles/'+information.AggregateId+'/addhits',{},'POST');// 添加阅读量
// 			magList[2] = global.http1(global.sv+'/api/categories/'+information.CategoryId);//查看栏目详情
// 			magList[3] = global.http1(global.sv+'/api/articles/group?'+topId+'&size=10');// 查多栏目文章接口
// 			magList[4] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');//底部热门关注数据接口
// 			magList[5] = func.tjReq2(res8.data.result[0]);//热词
// 			magList[6] = func.tjReq2(res9.data.result[0]);//顶部广告位
// 			magList[7] = func.tjReq2(res10.data.result[0]);//两性健康
// 			magList[8] = func.tjReq2(res11.data.result[0]);//两性关系
// 			magList[9] = func.tjReq2(res12.data.result[0],{page:1,size:20});//热门百科
// 			magList[10] = func.tjReq2(res13.data.result[0],{page:1,size:20});//全部百科
// 			magList[11] = func.tjReq2(res14.data.result[0]);//右侧幻灯片
// 			magList[12] = func.tjReq2(res15.data.result[0],{page:1,size:4});//精彩图片
// 			magList[13] = func.tjReq2(res16.data.result[0],{page:1,size:4});//全部图片
// 			magList[14] = func.tjReq2(res17.data.result[0]);//右一广告位
// 			magList[15] = func.tjReq2(res18.data.result[0]);//右二广告位
// 			magList[16] = func.tjReq2(res19.data.result[0]);//左一广告位
// 			axios.all(magList).then(axios.spread(function (res1,res2,res3,res4,res5,res6,res7,res8,res9,res10,res11,res12,res13,res14,res15,res16,res17) {
// 				// 相关百科接口
// 				var related = res1.data.result;
// 				assignObj.related = related;
// 				for(var i=0;i<related.length;i++){
// 					related[i].PublishDate = related[i].PublishDate.substring(0,related[i].PublishDate.indexOf(' '));
// 				}
// 				// 添加阅读量
// 				var hits = res2.data;
// 				var catDetails = res3.data.result;
				
// 				// 面包屑
// 				assignObj.chip = {
// 					name_01:thisChannel.Name,
// 					alias_01:thisChannel.Alias,
// 					name_02:catDetails.Name,
// 					alias_02 : catDetails.Alias,
// 					flag:true
// 				}
// 				//6个栏目的所以文章
// 				var channerlArticle = res4.data.result;
// 				assignObj.channerlArticle = channerlArticle;
			
// 				assignObj.indexList = {
// 					types1 : res6.data.result,
// 					types50:res7.data.result,
//                 	types53:res5.data.result,
// 					types32:res8.data.result,
// 					types33:res9.data.result,
// 					types34:noRes(res10,1),
// 					types35:noRes(res11,1),
// 					types3:res12.data.result,
// 					types36:noRes(res13,1),
// 					types37:noRes(res14,1),
// 					types51:noRes(res15,0),
// 					types52:noRes(res16,0),
// 					types54:noRes(res17,0)
// 				}
// 				assignObj.site.title = information.Title+'_唯爱百科';
// 				assignObj.site.keywords =  information.Title;
// 				assignObj.site.description = information.Description;
// 				assignObj.site.title2 = catDetails.Name;
// 				assignObj.columnid = catDetails.Alias;
// 				assignObj.information.EditDate = moment(assignObj.information.EditDate).format('YYYY-MM-DD H:mm');
// 				res.render('baike/info', assignObj);
// 			}))
// 		})).catch(function(err1){
// 			res.render('baike/info', assignObj);
// 		})
		
// 	})
// });

//详情
router.get('/:id.html', (req, res, next)=>{
	m(function(menu,menu2){
		var tid = req.params.id;
		var thisChannel = menu2['b'];


		var site = { title2:'',title:'', keywords:'', description: '', path: global.path};
		var assignObj = {site:site,menu:menu,menuid:thisChannel.Alias,columnid:'',url:global.path+'/b',children:[],lxRelation:{data:[]},
		articleList:{Records:[]},information:{Keywords:[]},rightRank1:{Records:[]},rightRank2:{Records:[]},related:[],chip:[],channelArr:[],thisChannel:'',data: { message: ''},
		channerlArticle:[],indexList:{types1 :[],types50:[],types53:[],types32:[],types33:[],types34:[],types35:[],types3:[],types36:[],types37:[],types51:[],types52:[],types54:[]},relatedtitle:'相关百科'};
		axios.all().then(axios.spread(function () {
			
			axios.all().then(axios.spread(function () {
				
			}))
		})).catch(function(err1){
			res.render('baike/info', assignObj);
		})
		
	})
});
 router.get('/:id.:id', (req, res, next)=>{
 	errLoad(req,res);
    return;
 });


//栏目
router.get('/:id-:page', (req, res, next)=>{
	var id = req.params.id;
	var page = req.params.page;
	if (req.originalUrl.substr(-1) != '/') {
		res.redirect(301, '/b/' + id +'-'+ page + '/');
	}
	m(function(menu,menu2){
		// 百科栏目
		var thisChannel = menu2['b'];

		var list_01 = [];
		list_01[0] = global.http1(global.sv+'/api/categories/b/children');// 百科子栏目
		list_01[1] = global.http1(global.sv+'/api/categories/'+id);// 栏目详情
		list_01[2] = global.http1(global.sv+'/api/positions?types=53');//底部热门关注推荐位置
		list_01[3] = global.http1(global.sv+'/api/positions?types=1');//热搜词位置
		list_01[4] = global.http1(global.sv+'/api/positions?types=50');//栏目推荐位位置
		var site = {title2:'',title:'',keywords:'',description:'',path:global.path};
		var assignObj = {site:site,menu:menu,menuid:'b',columnid:id,url:global.path+'/b',children:[],articleList:{Records:[],listTitle:''},thisChannel:thisChannel,data: { message: ''},
		baikeList:[],baikeArticles:[].Records,url2: site.path + '/b/'+id,articlePage:'',chip:{},indexList:{types1:[],types50:[],types53:[]}};
		axios.all(list_01).then(axios.spread(function (res1,res2,res3,res4,res5) {
			var children = res1.data.result;
			assignObj.children = children;
			var baikeList = res2.data.result;
			assignObj.baikeList = [baikeList];
			var bottomHots = res3.data.result;
			var magList = [];
			magList[0] = global.http1(global.sv+'/api/categories/'+baikeList.AggregateId+'/articles?page='+page+'&size=100');
			magList[1] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');
			magList[2] = func.tjReq2(res4.data.result[0]);
			magList[3] = func.tjReq2(res5.data.result[0]);
			axios.all(magList).then(axios.spread(function(res1,res2,res3,res4){
				var baikeArticles = res1.data.result;
				assignObj.baikeArticles = baikeArticles.Records;
				if(baikeArticles.Records.length==0){
                   errLoad(req,res);
                   return;
               }

				// 分页
				var articlePage = func.page(baikeArticles.PageNow, baikeArticles.PageSize, baikeArticles.TotalCount);
				assignObj.articlePage = articlePage;
				if(thisChannel.Subtitle ==null){thisChannel.Subtitle = ''}
				// 面包屑
				assignObj.chip = {
					name_01:thisChannel.Name,
					alias_01:thisChannel.Alias,
					name_02:baikeList.Name,
					alias_02 : baikeList.Alias,
					addA:true
				}
				// 公共模块数据
			
				assignObj.indexList = {
					types1:noRes(res3,1),
					types50:noRes(res4,1),
					types53:noRes(res2,1)
				}
				assignObj.site.title = baikeList.Name+thisChannel.Subtitle+'_唯爱百科';
				assignObj.site.keyWords = baikeList.Name+thisChannel.Subtitle;
				assignObj.site.description = '唯爱两性百科频道提供'+baikeList.Name+'相关知识，包括'+thisChannel.Subtitle;
				assignObj.site.title2 = baikeList.Name;
			
				res.render('baike/column', assignObj);
			}))
		})).catch(function(err1){
			res.render('baike/column', assignObj);
		})
	})
});


router.get('/:id',(req,res,next)=>{
	var id = req.params.id;
	
	if (req.originalUrl.substr(-1) != '/') {
		res.redirect(301, '/baike/' + id + '/');
	}
	m(function(menu,menu2){
			var thisChannel = menu2['b'];
			var list_01 = [];
			list_01[0] = global.http1(global.sv+'/api/categories/b/children');// 百科子栏目
			list_01[1] = global.http1(global.sv+'/api/categories/'+id);// 栏目详情
			list_01[2] = global.http1(global.sv+'/api/positions?types=53');//底部热门关注推荐位置
			list_01[3] = global.http1(global.sv+'/api/positions?types=1');//热搜词位置
			list_01[4] = global.http1(global.sv+'/api/positions?types=50');//栏目推荐位位置
			var site = {title2:'',title:'',keywords:'',description:'',path:global.path};
			var assignObj = {site:site,menu:menu,menuid:'b',columnid:id,url:global.path+'/b',children:'',articleList:{Records:[],listTitle:''},thisChannel:thisChannel,data: { message: ''},
			baikeList:'',baikeArticles:''.Records,url2: site.path + '/b/'+id,articlePage:'',chip:'',indexList:{types1:[],types50:[],types53:[]}};

			axios.all(list_01).then(axios.spread(function (res1,res2,res3,res4,res5) {
				var children = res1.data.result;
				assignObj.children = children;
				
				var baikeList = res2.data.result;
				assignObj.baikeList = [baikeList];
				var bottomHots = res3.data.result;
				var magList = [];
				magList[0] = global.http1(global.sv+'/api/categories/'+baikeList.AggregateId+'/articles?page=1&size=100');// 文章列表
				magList[1] = a5 = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');
				magList[2] = func.tjReq2(res4.data.result[0]);
				magList[3] = func.tjReq2(res5.data.result[0]);
				
				axios.all(magList).then(axios.spread(function(res1,res2,res3,res4){
					var baikeArticles = res1.data.result;
					assignObj.baikeArticles = baikeArticles.Records;
					
					// 分页
					var articlePage = func.page(baikeArticles.PageNow, baikeArticles.PageSize, baikeArticles.TotalCount);
					assignObj.articlePage = articlePage;
					if(thisChannel.Subtitle ==null){thisChannel.Subtitle = ''}
					
					// 面包屑
					assignObj.chip = {
						name_01:thisChannel.Name,
						alias_01:thisChannel.Alias,
						name_02:baikeList.Name,
						alias_02 : baikeList.Alias,
						addA:true
					}
					
					// 公共模块数据
					
					assignObj.indexList = {
						types1:noRes(res3,1),
						types50:noRes(res4,1),
						types53:noRes(res2,1)
					}
					assignObj.site.title = baikeList.Name+thisChannel.Subtitle+'_唯爱百科';
					assignObj.site.keyWords = baikeList.Name+thisChannel.Subtitle;
					assignObj.site.description = '唯爱两性百科频道提供'+baikeList.Name+'相关知识，包括'+thisChannel.Subtitle;
					assignObj.site.title2 = baikeList.Name;
					res.render('baike/column', assignObj);
					
				}))
			})).catch(function(err1){
				res.render('baike/column', assignObj);
			})
	})
})


//频道
router.get('/', (req, res, next)=>{
	if (req.originalUrl.substr(-1) != '/') {
		res.redirect(301, '/baike/');
	}
	m(function(menu,menu2){
		var thisChannel = menu2['b'];
		// 百科子栏目
		var a1 = global.http1(global.sv+'/api/categories/b/children');
		//底部热门关注推荐位置
		var a3 = global.http1(global.sv+'/api/positions?types=53');
		//热搜词位置
		var a5 = global.http1(global.sv+'/api/positions?types=1');
		//栏目推荐位位置
		var a7 = global.http1(global.sv+'/api/positions?types=50');

		var site = {title2:thisChannel.Name,title:'两性百科_性生活常识_性爱技巧_ 性姿势_性心理_唯爱百科',keywords:'两性百科,性生活常识,性爱技巧,性姿 势,性心理',description:'唯爱两性百科频道提供实用的两性生活常识、 性爱技巧、性姿势、性心理等，您身边的两性 生活必备指南',path:global.path};
		var assignObj = {site:site,menu:menu,menuid:'b',columnid:'',url:global.path+'/b',children:'',baikeList:'',articleList:{Records:[],listTitle:''},thisChannel:thisChannel,data: { message: ''},
		baikeArticles:'',indexList:{types1:[],types50:[],types53:[]}};

		axios.all([a1,a3,a5,a7]).then(axios.spread(function (res1,res3,res5,res7) {
			var baikeList = res1.data.result;
			assignObj.children = baikeList;
			assignObj.baikeList = baikeList;
			var aId='';
			for(var i=0;i<baikeList.length;i++){ aId += 'categoryIds='+baikeList[i].AggregateId+'&';}
			aId=aId.substring(0,aId.length-1);
			// 文章列表
			var bottomHots = res3.data.result;
			var magList = [];
			magList[0] = global.http1(global.sv+'/api/articles/group?'+aId+'&size=20');
			magList[1] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');
			magList[2] = func.tjReq2(res5.data.result[0]);
			magList[3] = func.tjReq2(res7.data.result[0]);
			axios.all(magList).then(axios.spread(function (res2,res3,res6,res8) {
				var baikeArticles = res2.data.result;
				assignObj.baikeArticles = baikeArticles;
				assignObj.indexList = {
					types1:noRes(res6,1),
					types50:noRes(res8,1),
					types53:noRes(res3,1)
				}
				// console.log(res8.data.result);
                assignObj.position = 1
				res.render('baike/index', assignObj);
			})).catch(function(err1){
				errLoad(req,res);
			})

		})).catch(function(err1){
			res.render('baike/index', assignObj);
		})
	})
});





module.exports = router;
