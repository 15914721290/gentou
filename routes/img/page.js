//图片频道模块路由
var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var errLoad = require('../error.js');
var noRes = require('../noData')
var func = require('../cmfunc.js')();
var m = require('../api/menu.js');//导航接口

router.get('/pics-:id', (req, res, next) => {
    var tid=req.params.id;
    if (req.originalUrl.substr(-1) != '/') {
        res.redirect(301, '/pics-' + tid + '/');
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
        var assignObj = {site:site,menu:menu,menuid:'pics',columnid:'',url:global.path+'/pics',url2:site.path + '/pics',children:[],articleList:{Records:[],listTitle:''},picArticles:[],data: { message: ''},
        indexList:{types1:[],types50:[],types53:[],types41:[]},articlePage:'',thisChannel:thisChannel};
        axios.all(list_01).then(axios.spread(function(res1,res2,res3,res4,res5){
            var children = res1.data.result;
            assignObj.children = children;
            var picsPosition = res2.data.result;
            var bottomHots = res3.data.result;
            var list_02 = [];
            list_02[0] = global.http1(global.sv+'/api/positions/'+picsPosition[0].AggregateId+'/links?size=5');// 查轮播图接口
            list_02[1] = global.http1(global.sv+'/api/categories/channels/'+thisChannel.AggregateId+'/articles?page='+tid+'&size=20');
            list_02[2] = global.http1(global.sv+'/api/positions/'+bottomHots[0].AggregateId+'/links?size=50');
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
               if(picArticles.Records.length==0){
                   errLoad(req,res);
                   return;
               }
                assignObj.articlePage = articlePage;
                assignObj.indexList = {
                    types1 :noRes(res4,1),
                    types50:noRes(res5,1),
                    types53:noRes(res3,1),
                    types41:noRes(res1,1)
                }
                res.render('img/index', assignObj);
            }))
        })).catch(function(err1){
            res.render('img/index', assignObj);
        })
        
    })


});

module.exports = router;


