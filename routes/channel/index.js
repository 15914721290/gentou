//频道路由
module.exports = (router) => {
	var axios = require('axios');
	var errLoad = require('../error.js');
	var cmfunc = require('../cmfunc.js')();
	var noRes = require('../noData')
	var pd = { 'route': '' };
	var m = require('../api/menu.js');//导航接口
	pd.route = (req, res, thisChannel) => {
		if (!thisChannel) {
			errLoad(req, res);
		}
	}
	//文章详情路由
router.get('/a/:id.html', (req, res, next) => {
		m(function(menu,menu2){
			var tid = req.params.id.substr(8);
			var dataId = req.params.id.substr(0,8);
			//文章详情接口
			var a1 = global.http1(global.sv+'/api/articles/'+tid);
			//文章内链接口
			var a2 = global.http1(global.sv+'/api/articlelinks');

			var site = {title2:'',title: '', keywords: '', description:'', path: global.path};
			var assignObj = {site:site,menu:menu,menuid:'',columnid:'',url:'',children:[],articleList:{Records:[]},information:{Keywords:[],Content:[]}, 
			rightRank1: {Records:[]}, rightRank2: {Records:[]},related:[],chip:'',channelArr:[],channerlArticle:[],thisChannel:'',data: { message: ''},
			indexList:{types50:[],types3:[],types32:[],types51:[],types33:[],types34:[],types35:[],types36:[],types37:[],types52:[],types53:[],types1:[],types54:[]},relatedtitle:'相关文章'};
			axios.all([a1,a2]).then(axios.spread(function(res1,res2){
				var articleInfo = res1.data.result;
				if(articleInfo==null ){errLoad(req,res);return;}
				if(dataId!=moment(articleInfo.EditDate).format('YYYYMMDD')){errLoad(req,res);return;}
				articleInfo.EditDate = moment(articleInfo.EditDate).format('YYYY-MM-DD HH:mm');
				assignObj.information = articleInfo;
				var articleLinks = res2.data.result;
//				articleInfo.Content=cmfunc.aLinks(articleInfo.Content,articleLinks);
				var a1 = global.http1(global.sv + '/api/categories/'+ articleInfo.CategoryId);
				axios.all([a1]).then(axios.spread(function(res1){
					//文章对应频道数据
					var columnList = res1.data.result;
					var a1 = global.http1(global.sv+'/api/categories/'+columnList.TopId);
					axios.all([a1]).then(axios.spread(function(res1){
						var thisChannel = res1.data.result; 
						assignObj.thisChannel = thisChannel;
						
						// 查多栏目文章
						var channel = global.menu;
						//6个栏目
						var channelArr = [];
						var topId = '';
						for(var i=0;i<channel.length;i++){if(channel[i].Alias!='b'&&channel[i].Alias!='pics'&&channel[i].Alias!='/'){channelArr.push(channel[i]);}}
						for(var j=0;j<channelArr.length;j++){topId += 'topCategoryIds='+channelArr[j].AggregateId+'&';channelArr[j].index=j}
						topId = topId.substring(0,topId.length-1);
						assignObj.channelArr = channelArr;
						var list_01=[];
						list_01[0]=global.http1(global.sv + '/api/categories/' + thisChannel.AggregateId + '/rank', { size: 10, days: 7 });//右侧排行
						list_01[1] = global.http1(global.sv + '/api/categories/rank', { size: 10, days: 7 });//右侧排行
						list_01[2] = global.http1(global.sv+'/api/articles/'+articleInfo.AggregateId+'/relations');//相关百科接口
						list_01[3] = global.http1(global.sv+'/api/articles/'+articleInfo.AggregateId+'/addhits',{},'POST');//添加阅读量
						list_01[4] = global.http1(global.sv+'/api/articles/group?'+topId+'&size=10');// 查多栏目文章接口
						list_01[5] = global.http1(global.sv + '/api/categories/' + thisChannel.AggregateId + '/children');//查找子栏目
						list_01[6] = global.http1(global.sv + '/api/positions','types=50');//顶部广告
						list_01[7] = global.http1(global.sv + '/api/positions','types=51');//右一广告
						list_01[8] = global.http1(global.sv + '/api/positions','types=52');//右二广告
						list_01[9] = global.http1(global.sv + '/api/positions','types=3');//幻灯片
						var lxxlid=menu2['lxxl']?menu2['lxxl'].AggregateId:'';
						list_01[10] = global.http1(global.sv + '/api/positions','types=32&categoryId=' + lxxlid);//两性健康
						list_01[11] = global.http1(global.sv + '/api/positions','types=33&categoryId=' + lxxlid);//两性关系
						list_01[12] = global.http1(global.sv + '/api/positions','types=34&categoryId='+thisChannel.AggregateId);//频道百科
						list_01[13] = global.http1(global.sv + '/api/positions','types=35');//全部百科
						list_01[14] = global.http1(global.sv + '/api/positions','types=36&categoryId=' + thisChannel.AggregateId);//热门图片
						list_01[15] = global.http1(global.sv + '/api/positions','types=37');//全部图片
						list_01[16] = global.http1(global.sv+'/api/positions?types=1');//热搜词
						list_01[17] = global.http1(global.sv+'/api/positions?types=53&size=1000');//底部热门关注
						list_01[18] = global.http1(global.sv + '/api/positions','types=54');//左一广告
						list_01[19] = global.http1(global.sv+'/api/categories/channels/'+thisChannel.AggregateId+'/articles');//频道文章接口
						
						axios.all(list_01).then(axios.spread(function(res0,res1,res2,res3,res4,res5,res6,res7,res8,res9,res10,res11,res12,res13,res14,res15,res16,res17,res18,res19){
							// 右侧排行接口
							var rightRank1 = { title: thisChannel.Name, Records: res0.data.result };
							assignObj.rightRank1 = rightRank1;
							var rightRank2 = { title: '全部排行', Records: res1.data.result };
							assignObj.rightRank2 = rightRank2;
							// 相关百科接口
							var related = res2.data.result;
							for(var i=0;i<related.length;i++){related[i].PublishDate = related[i].PublishDate.substring(0,related[i].PublishDate.indexOf(' '));}
							assignObj.related = related;
							//添加阅读量
							var hits = res3.data;
							//6个栏目的所以文章
							var channerlArticle = res4.data.result;
							assignObj.channerlArticle = channerlArticle;
							// 面包屑
							assignObj.chip = {
								name_01:thisChannel.Name,
								alias_01:thisChannel.Alias,
								name_02:columnList.Name,
								alias_02:columnList.Alias,
								flag:true
							}
							//子栏目
							var children = res5.data.result;
							assignObj.children = children;
							var list_02 = [];
							list_02[0] = cmfunc.tjReq2(res6.data.result[0]);//通栏广告
							list_02[1] = cmfunc.tjReq2(res7.data.result[0],{page:1,size:1});//右一广告
							list_02[2] = cmfunc.tjReq2(res8.data.result[0],{page:1,size:1});//右二广告
							list_02[3] = cmfunc.tjReq2(res9.data.result[0]);//幻灯片
							list_02[4] = cmfunc.tjReq2(res10.data.result[0],{page:1,size:10});
							list_02[5] = cmfunc.tjReq2(res11.data.result[0],{page:1,size:10});
							list_02[6] = cmfunc.tjReq2(res12.data.result[0],{page:1,size:20});
							list_02[7] = cmfunc.tjReq2(res13.data.result[0],{page:1,size:20});
							list_02[8] = cmfunc.tjReq2(res14.data.result[0],{page:1,size:4});
							list_02[9] = cmfunc.tjReq2(res15.data.result[0],{page:1,size:4});
							list_02[10] = cmfunc.tjReq2(res16.data.result[0]);
							list_02[11] = cmfunc.tjReq2(res17.data.result[0],{size:1000});
							list_02[12] = cmfunc.tjReq2(res18.data.result[0],{page:1,size:1});//左一广告
							axios.all(list_02).then(axios.spread(function(res0,res1,res2,res3,res4,res5,res6,res7,res8,res9,res10,res11,res12){
								assignObj.indexList.types50 = noRes(res0,1);
								assignObj.indexList.types51 = noRes(res1,0);
								assignObj.indexList.types52 = noRes(res2,0);
								assignObj.indexList.types3 = noRes(res3,1);
								assignObj.indexList.types32 = noRes(res4,1);
								assignObj.indexList.types33 = noRes(res5,1);
								assignObj.indexList.types34 = noRes(res6,1);
								assignObj.indexList.types35 = noRes(res7,1);
								assignObj.indexList.types36 = noRes(res8,1);
								assignObj.indexList.types37 = noRes(res9,1);
								assignObj.indexList.types1 = noRes(res10,1);
								assignObj.indexList.types53 = noRes(res11,1)
								assignObj.indexList.types54 = noRes(res12,0);

								assignObj.url = global.path+'/'+thisChannel.Alias;
								assignObj.site.title2 = columnList.Name;
								assignObj.site.title = articleInfo.Title+'_'+columnList.Name+'_唯爱健康网';
								assignObj.site.keywords = articleInfo.Title;
								assignObj.site.description =  articleInfo.Description;
								assignObj.menuid = thisChannel.Alias;
								assignObj.columnid = columnList.Alias;
                                assignObj.position = 1
							res.render('channel/info', assignObj);
							}))
						}))
					}))
				}))
			})).catch(function(err){
				res.render('channel/info', assignObj);
			})
		})
	});


	router.get('/a/:id', (req, res, next) => {
		var d = req.params.id;
		if (d.indexOf('.html') > -1) {
			d = d.split('.html');
			d = d[0];
		}
		res.redirect(301, '/a/' + d + '.html');
	});
	//文章详情路由

	//文章标签路由
	pd.tag = function(req, res, page, size){
		var tid = req.params.id;
		if (req.originalUrl.substr(-1) != '/') {
			var url = '/k/'+tid+'/';
			if(page){
				url = '/k/'+tid+'-'+page+'/';
			}
			res.redirect(301, url);
		}
		m(function(menu,menu2){
			var thisChannel = menu2['lxxl']?menu2['lxxl']:{'AggregateId':'','Name':''};
			var list_01 = [];
			list_01[0] = global.http1(global.sv + '/api/keywords/' + tid + '/articles',{ page: page ? parseInt(page) : 1, size: 10 });//关键词接口
			list_01[1] = global.http1(global.sv + '/api/categories/' + thisChannel.AggregateId + '/rank', { size: 10, days: 7 });//右侧排行接口
			list_01[2] = global.http1(global.sv + '/api/categories/rank', { size: 10, days: 7 });
			list_01[3] = global.http1(global.sv + '/api/positions','types=50');
			list_01[4] = global.http1(global.sv + '/api/positions','types=3');// 首页_幻灯图推荐
			list_01[5] = global.http1(global.sv + '/api/positions','types=32&categoryId=' + thisChannel.AggregateId);
			list_01[6] = global.http1(global.sv + '/api/positions','types=51');// 通栏_右1广告位
			list_01[7] = global.http1(global.sv + '/api/positions','types=33&categoryId=' + thisChannel.AggregateId);// 两性关系
			list_01[8] = global.http1(global.sv + '/api/positions','types=34&categoryId=' + thisChannel.AggregateId);// 百科推荐
			list_01[9] = global.http1(global.sv + '/api/positions','types=35');// 全部百科
			list_01[10] = global.http1(global.sv + '/api/positions','types=43');//两性心理
			list_01[11] = global.http1(global.sv + '/api/positions','types=44');//全部图片
			list_01[12] = global.http1(global.sv + '/api/positions','types=52');// 通栏_右2广告位
			list_01[13] = global.http1(global.sv + '/api/positions','types=53');
			list_01[14] = global.http1(global.sv + '/api/positions','types=1');//热搜词位置
			list_01[15] = global.http1(global.sv + '/api/keywords/'+tid);//查关键词
			list_01[16] = global.http1(global.sv + '/api/categories/channel');//查频道

			
			var site = {title2:'',title: '', keywords: '', description: '', path: global.path };
			var assignObj = { site: site, menu: menu, menuid: req.params.id,columnid:'', url: site.path + '/' + tid, url2: site.path + '/k/' + tid, moment: global.moment,
				children: [], articlePage: [], rightRank1:{Records:[]} , rightRank2: {Records:[]},articleList:{Records:[],listTitle:''},data: { message: ''},thisChannel:thisChannel,
				indexList:{types50:[],types3:[],types32:[],types51:[],types33:[],types34:[],types35:[],types36:[],types37:[],types52:[],types53:[],types1:[]}};
			axios.all(list_01).then(axios.spread(function (res0, res1, res2,res3,res4,res5,res6,res7,res8,res9,res10,res11,res12,res13,res14,res15,res16) {
				console.log(res16.data.result)
				var articleList = res0.data.result;
				assignObj.articleList = articleList;
				if(page){
					if(articleList.Records.length<1){
						errLoad(req, res);
						return;
					}
				}
				
				assignObj.children = res16.data.result;
				articleList.listTitle = res15.data.result.Name;
				var articlePage = cmfunc.page(articleList.PageNow, articleList.PageSize, articleList.TotalCount);
				
				assignObj.articlePage = articlePage;
				//右侧排行接口

				var rightRank1 = { title: thisChannel.Name, Records: res1.data.result };
				assignObj.rightRank1 = rightRank1;
				var rightRank2 = { title: '全部排行', Records: res2.data.result };
				assignObj.rightRank2 = rightRank2;
				var list_02 = [];
				list_02[0] = cmfunc.tjReq2(res3.data.result[0]);
				list_02[1] = cmfunc.tjReq2(res4.data.result[0]);
				list_02[2] = cmfunc.tjReq2(res5.data.result[0],{page:1,size:10});
				list_02[3] = cmfunc.tjReq2(res6.data.result[0],{page:1,size:1});
				list_02[4] = cmfunc.tjReq2(res7.data.result[0],{page:1,size:10});
				list_02[5] = cmfunc.tjReq2(res8.data.result[0],{page:1,size:20});
				list_02[6] = cmfunc.tjReq2(res9.data.result[0],{page:1,size:20});
				list_02[7] = cmfunc.tjReq2(res10.data.result[0],{page:1,size:4});
				list_02[8] = cmfunc.tjReq2(res11.data.result[0],{page:1,size:4});
				list_02[9] = cmfunc.tjReq2(res12.data.result[0],{page:1,size:1});
				list_02[10] = cmfunc.tjReq2(res13.data.result[0],{page:1,size:50});
				list_02[11] = cmfunc.tjReq2(res14.data.result[0],{page:1,size:50});

				axios.all(list_02).then(axios.spread(function (res0,res1,res2,res3,res4,res5,res6,res7,res8,res9,res10,res11) {
					
					assignObj.indexList = {
						types50:noRes(res0,1),
						types3:noRes(res1,1),
						types32:noRes(res2,1),
						types51:noRes(res3,0),
						types33:noRes(res4,1),
						types34:noRes(res5,1),
						types35:noRes(res6,1),
						types36:noRes(res7,1),
						types37:noRes(res8,1),
						types52:noRes(res9,0),
						types53:noRes(res10,1),
						types1:noRes(res11,1)
					}
					assignObj.site.title2 ='';
					assignObj.site.title = articleList.listTitle + '_唯爱健康网';
					
					res.render('channel/tag', assignObj);
				}))
			})).catch(function (err) {
				res.render('channel/tag', assignObj);
			});
		})
	}



	router.get('/k/:id.html', (req, res, next) => {
		res.redirect(301, '/k/' + req.params.id);
	});

	router.get('/k/:id-:page', (req, res, next) => {
		pd.tag(req, res, req.params.page);
});
	router.get('/k/:id', (req, res, next) => {
			pd.tag(req, res);
	});
	


	//文章标签路由

	//频道路由 id为对应频道id

	pd.channel = function (req, res, page, size) {
		var tid = req.params.id;
		console.log(tid);
		
		if (req.originalUrl.substr(-1) != '/') {
			var url = '/' + tid + '/';
			if (page) {
				url = '/' + tid + '-' + page + '/';
			}
			res.redirect(301, url);
		}

		m(function(menu,menu2){
			var thisChannel = menu2[tid];
			console.log(thisChannel)
			pd.route(req, res, thisChannel);
			var req_arr=[];
			//子栏目接口
			req_arr[0] = global.http1(global.sv + '/api/categories/' + tid + '/children');
			//频道文章接口（不是子栏目）
			req_arr[1] = global.http1(global.sv + '/api/categories/channels/' + thisChannel.AggregateId + '/articles', { page: page ? parseInt(page) : 1, size: 10 });
			//右侧排行
			// res.json(thisChannel.AggregateId);
			req_arr[2] = global.http1(global.sv + '/api/categories/' + thisChannel.AggregateId + '/rank', { size: 10, days: 7 });
			req_arr[3] = global.http1(global.sv + '/api/categories/rank', { size: 10, days: 7 });
			req_arr[4]=global.http1(global.sv + '/api/positions','types=29&categoryId=' + thisChannel.AggregateId);
			req_arr[5]=global.http1(global.sv + '/api/positions','types=30&categoryId=' + thisChannel.AggregateId);
			req_arr[6]=global.http1(global.sv + '/api/positions','types=31&categoryId=' + thisChannel.AggregateId);
			var lxxlid=menu2['lxxl']?menu2['lxxl'].AggregateId:'';
			req_arr[7]=global.http1(global.sv + '/api/positions','types=32&categoryId=' + lxxlid);
			req_arr[8]=global.http1(global.sv + '/api/positions','types=33&categoryId=' + lxxlid);
			req_arr[9]=global.http1(global.sv + '/api/positions','types=34&categoryId=' + thisChannel.AggregateId);
			req_arr[10]=global.http1(global.sv + '/api/positions','types=35');
			req_arr[11]=global.http1(global.sv + '/api/positions','types=36&categoryId=' + thisChannel.AggregateId);
			req_arr[12]=global.http1(global.sv + '/api/positions','types=37');
			req_arr[13]=global.http1(global.sv + '/api/positions','types=1');
			req_arr[14]=global.http1(global.sv + '/api/positions','types=50');
			req_arr[15] = global.http1(global.sv + '/api/positions','types=3');
			req_arr[16] = global.http1(global.sv + '/api/positions','types=51');
			req_arr[17] = global.http1(global.sv + '/api/positions','types=52');
			req_arr[18] = global.http1(global.sv + '/api/positions','types=53');

			var site = {title2:'',title: '', keywords: '', description: '', path: global.path };
			var assignObj = { site: site, menu: menu, menuid: req.params.id,columnid:'', url: site.path + '/' + tid, url2: site.path + '/' + tid, moment: global.moment, children: [],
					  articlePage: [], rightRank1: {Records:[]}, rightRank2: {Records:[]},articleList:{Records:[],listTitle:''},thisChannel:thisChannel,data: { message: ''},
					 indexList:{types29:[],types30:[],types31:[],types32:[],types33:[],types34:[],types35:[],types36:[],types37:[],types1:[],types50:[],types3:[],types51:[],types52:[],types53:[]}};
			

			//右侧排行
			axios.all(req_arr).then(axios.spread(function (res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11, res12, res13, res14, res15,res16,res17,res18,res19) {
				var children = res1.data.result;
				assignObj.children = children;
				var articleList = res2.data.result;
				articleList.listTitle = thisChannel.Name + '最新文章';
				if(page){
					if(articleList.Records.length==0){
					 errLoad(req,res);
                   	return;
				}
				}
				
				assignObj.articleList = articleList;
				
				var articlePage = cmfunc.page(articleList.PageNow, articleList.PageSize, articleList.TotalCount);
				assignObj.articlePage = articlePage;
				//右侧排行接口
				var rightRank1 = { title: thisChannel.Name, Records: res3.data.result };
				assignObj.rightRank1 = rightRank1;
				var rightRank2 = { title: '全部排行', Records: res4.data.result };
				assignObj.rightRank2 = rightRank2;
				
				var req_arr2=[];
				req_arr2[0]=cmfunc.tjReq2(res5.data.result[0]);
				req_arr2[1]=cmfunc.tjReq2(res6.data.result[0]);
				req_arr2[2]=cmfunc.tjReq2(res7.data.result[0],{page:1,size:6});
				req_arr2[3]=cmfunc.tjReq2(res8.data.result[0]);
				req_arr2[4]=cmfunc.tjReq2(res9.data.result[0]);
				req_arr2[5]=cmfunc.tjReq2(res10.data.result[0],{page:1,size:20});
				req_arr2[6]=cmfunc.tjReq2(res11.data.result[0],{page:1,size:20});
				req_arr2[7]=cmfunc.tjReq2(res12.data.result[0],{page:1,size:4});
				req_arr2[8]=cmfunc.tjReq2(res13.data.result[0],{page:1,size:4});
				req_arr2[9]=cmfunc.tjReq2(res14.data.result[0]);
				req_arr2[10]=cmfunc.tjReq2(res15.data.result[0]);
				req_arr2[11]=cmfunc.tjReq2(res16.data.result[0]);
				req_arr2[12]=cmfunc.tjReq2(res17.data.result[0],{page:1,size:1});
				req_arr2[13]=cmfunc.tjReq2(res18.data.result[0],{page:1,size:1});
				req_arr2[14]=cmfunc.tjReq2(res19.data.result[0],{page:1,size:50});

				axios.all(req_arr2).then(axios.spread((res5, res6, res7, res8, res9, res10, res11, res12, res13, res14, res15,res16,res17,res18,res19)=>{
					assignObj.indexList = {
						types29:noRes(res5,0),
						types30:noRes(res6,0),
						types31:noRes(res7,1),
						types32:noRes(res8,1),
						types33:noRes(res9,1),
						types34:noRes(res10,1),
						types35:noRes(res11,1),
						types36:noRes(res12,1),
						types37:noRes(res13,1),
						types1:noRes(res14,1),
						types50:noRes(res15,1),
						types3:noRes(res16,1),
						types51:noRes(res17,0),
						types52:noRes(res18,0),
						types53:noRes(res19,1),
					}
					assignObj.site.title2 = thisChannel.Name;
					assignObj.site.title = thisChannel.Tkd.Title;
					assignObj.site.keywords = thisChannel.Tkd.Keywords;
					assignObj.site.description = thisChannel.Tkd.Description;
                    assignObj.position = 1
					res.render('channel/index', assignObj);
				}))
			})).catch(function (err) {
				res.render('channel/index', assignObj);
			});
		})
	}

	router.get('/:id-:page', (req, res, next) => {
		if(req.params.id!='pics'){
			pd.channel(req, res, req.params.page);
		}
		
	});

	router.get('/:id', (req, res, next) => {
		pd.channel(req, res);
	});
	//频道路由 id为对应频道id


	//栏目分页路由
	pd.colume = function (req, res, page, size) {
		var tid = req.params.id;//频道id
		var cid = req.params.column;//子栏目id

		if (req.originalUrl.substr(-1) != '/') {
			var url = '/' + tid + '/';
			if (page) {
				url = '/' + tid + '-' + page + '/';
			}
			res.redirect(301, url);
		}
		m(function(menu,menu2){
			var thisChannel = global.menu2[tid];
			pd.route(req, res, thisChannel);
			var lxxlid=menu2['lxxl']?menu2['lxxl'].AggregateId:'';
			var list_01 = [];
			list_01[0] = global.http1(global.sv + '/api/categories/' + tid + '/children');//子栏目列表接口
			list_01[1] = global.http1(global.sv + '/api/categories/'+ cid);//子栏目详情
			list_01[2] = global.http1(global.sv + '/api/positions','types=50');// 首页_顶部横幅广告位
			list_01[3] = global.http1(global.sv + '/api/positions','types=3')// 首页_幻灯图推荐 = 3
			list_01[4] = global.http1(global.sv + '/api/positions','types=32&categoryId=' + lxxlid);
			list_01[5] = global.http1(global.sv + '/api/positions','types=51');// 通栏_右1广告位
			list_01[6] = global.http1(global.sv + '/api/positions','types=33&categoryId=' + lxxlid);// 两性关系
			list_01[7] = global.http1(global.sv + '/api/positions','types=34&categoryId=' + thisChannel.AggregateId);// 百科推荐
			list_01[8] = global.http1(global.sv + '/api/positions','types=35');// 全部百科
			list_01[9] = global.http1(global.sv + '/api/positions','types=36&categoryId=' + thisChannel.AggregateId);//两性心理
			list_01[10] = global.http1(global.sv + '/api/positions','types=37');//全部图片
			list_01[11] = global.http1(global.sv + '/api/positions','types=52');// 通栏_右2广告位
			list_01[12] = global.http1(global.sv + '/api/positions','types=53');// 底部热门关注
			list_01[13] = global.http1(global.sv+'/api/positions?types=1');//热搜词位置
			
			var site = {title2:'',title: '', keywords:'', description: '', path: global.path };
			var assignObj = { site: site, menu:menu, menuid: req.params.id,columnid:cid, url: site.path + '/' + tid, url2: site.path + '/' + tid+'/'+cid, moment: global.moment,
				children: [], articlePage: [], rightRank1: {Records:[]}, rightRank2: {Records:[]},articleList:{Records:[],listTitle:''},thisChannel:thisChannel,data: { message: ''},
				indexList:{types50:[],types3:[],types32:[],types51:[],types33:[],types34:[],types35:[],types36:[],types37:[],types52:[],types53:[],types1:[],types29:{},types30:{},types31:[]}};

			axios.all(list_01).then(axios.spread(function (res0,res1,res2,res3,res4,res5,res6,res7,res8,res9,res10,res11,res12,res13) {
				var children = res0.data.result;
				assignObj.children = children;
				thisChannelChild  = res1.data.result;
				var list_02 = [];
				list_02[0] = global.http1(global.sv + '/api/categories/' + thisChannelChild.AggregateId + '/articles', { page: page ? parseInt(page) : 1, size: 10 });//栏目文章接口
				list_02[1] = global.http1(global.sv + '/api/categories/' + thisChannel.AggregateId + '/rank', { size: 10, days: 7 });//右侧排行
				list_02[2] = global.http1(global.sv + '/api/categories/rank', { size: 10, days: 7 });
				list_02[3] = cmfunc.tjReq2(res2.data.result[0]);// 首页_顶部横幅广告位
				list_02[4] = cmfunc.tjReq2(res3.data.result[0]);// 首页_幻灯图推荐
				list_02[5] = cmfunc.tjReq2(res4.data.result[0],{page:1,size:10});
				list_02[6] = cmfunc.tjReq2(res5.data.result[0],{page:1,size:1});
				list_02[7] = cmfunc.tjReq2(res6.data.result[0],{page:1,size:10});
				list_02[8] = cmfunc.tjReq2(res7.data.result[0],{page:1,size:20});
				list_02[9] = cmfunc.tjReq2(res8.data.result[0],{page:1,size:20});
				list_02[10] = cmfunc.tjReq2(res9.data.result[0],{page:1,size:4});
				list_02[11] = cmfunc.tjReq2(res10.data.result[0],{page:1,size:4});
				list_02[12] = cmfunc.tjReq2(res11.data.result[0],{page:1,size:1});
				list_02[13] = cmfunc.tjReq2(res12.data.result[0],{page:1,size:50});
				list_02[14] = cmfunc.tjReq2(res13.data.result[0]);
				list_02[15] = cmfunc.tjReq2(res13.data.result[0]);
				list_02[16] = global.http1(global.sv + '/api/positions','types=38&categoryId=' + thisChannelChild.AggregateId);
				list_02[17] = global.http1(global.sv + '/api/positions','types=39&categoryId=' + thisChannelChild.AggregateId);
				list_02[18] = global.http1(global.sv + '/api/positions','types=40&categoryId=' + thisChannelChild.AggregateId);
				axios.all(list_02).then(axios.spread(function (res0,res1,res2,res3,res4,res5,res6,res7,res8,res9,res10,res11,res12,res13,res14,res15,res16,res17,res18) {
					var articleList = res0.data.result;
					assignObj.articleList = articleList;
					articleList.listTitle = thisChannelChild.Name + '最新文章';
					if(page){
						if(articleList.Records.length==0){
							errLoad(req,res);
							return;
						}
					}
					var articlePage = cmfunc.page(articleList.PageNow, articleList.PageSize, articleList.TotalCount);
					assignObj.articlePage = articlePage;
					//右侧排行接口
					var rightRank1 = { title: thisChannel.Name, Records: res1.data.result };
					assignObj.rightRank1 = rightRank1;
					var rightRank2 = { title: '全部排行', Records: res2.data.result };
					assignObj.rightRank2 = rightRank2;
					var list_03 = [];
					list_03[0] = cmfunc.tjReq2(res16.data.result[0]);
					list_03[1] = cmfunc.tjReq2(res17.data.result[0]);
					list_03[2] = cmfunc.tjReq2(res18.data.result[0],{page:1,size:6});
					axios.all(list_03).then(axios.spread(function(res0,res1,res2){
						assignObj.indexList = {
							types50:noRes(res3,1),
							types3:noRes(res4,1),
							types32:noRes(res5,1),
							types51:noRes(res6,0),
							types33:noRes(res7,1),
							types34:noRes(res8,1),
							types35:noRes(res9,1),
							types36:noRes(res10,1),
							types37:noRes(res11,1),
							types52:noRes(res12,0),
							types53:noRes(res13,1),
							types1:noRes(res14,1),
							types29:noRes(res15,0),
							types29:noRes(res0,0),
							types30:noRes(res1,0),
							types31:noRes(res2,1)
						
						}
						assignObj.site.title2 = thisChannelChild.Name;
						assignObj.site.title = thisChannel.Tkd.Title;
						assignObj.site.keywords =  thisChannel.Tkd.Keywords;
						assignObj.site.description = thisChannel.Tkd.Description;
						
						res.render('channel/column', assignObj);

						}))
					
					
				}))
			})).catch(function (err) {
				res.render('channel/column', assignObj);
			});
		})
	}

	router.get('/:id/:column-:page', (req, res, next) => {
		pd.colume(req, res, req.params.page);
	});

	//栏目路由
	router.get('/:id/:column.html', (req, res, next) => {
		res.redirect(301, '/' + req.params.id + '/' + req.params.column + '/');
	});
	router.get('/:id/:column', (req, res, next) => {
		pd.colume(req, res);
	});
	//栏目路由
	return router;
};


