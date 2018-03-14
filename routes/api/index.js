//创建者：womendi@qq.com
//日期：2017-11-28
module.exports = (router,url)=>{
    var path = require('path');
    var axios = require('axios');
    var errLoad = require('../error.js');
    var cmfunc = require('../cmfunc.js')();

    router.get(url+'/g', (req, res, next) => {
        res.json({name:'222222'});
    });
    
    router.get(url+'/b/:id/:page', (req, res, next) => {
        var id=req.params.id;
        var page=req.params.page;
        var a1 = global.http1(global.sv + '/api/categories/channels/'+id+'/articles?page='+page+'&size=10');
        axios.all([a1]).then(axios.spread((res1)=>{
            res.json(res1.data);
        })).catch((err)=>{
            res.json({'status':2,message:'error',result:[]});
        });
    });

    router.get(url+'/search/:id/:page', (req, res, next) => {
        var id=req.params.id;
        var page=req.params.page;
        var a1 = global.http1(global.sv + '/api/articles/search/'+encodeURI(id)+'?page='+page+'&size=10');
        axios.all([a1]).then(axios.spread((res1)=>{
            res.json(res1.data);
        })).catch((err)=>{
            res.json({'status':2,message:'error',result:[]});
        });
    });

    return router;
};