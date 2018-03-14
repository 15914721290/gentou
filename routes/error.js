//创建者：womendi@qq.com
//日期：2017-11-28

module.exports = (req,res)=>{
    var err = new Error('Not Found');
    err.status = 404;
    var axios = require('axios');
    var cmfunc = require('./cmfunc.js')();
    var req_arr=[];
    req_arr[0]=global.http1(global.sv + '/api/positions','types=1');
    var site = {title:'您访问的页面出错了_唯爱健康网',keywords:'',description:'',path:global.path};
    var dd={ site:site, menu: global.menu, menuid: '',data: { message: '' },children:[],indexList:{types1:''}};
    axios.all(req_arr).then(axios.spread((res1)=>{
        var req_arr2 = [];
        req_arr2[0]=cmfunc.tjReq2(res1.data.result[0]);
        axios.all(req_arr2).then(axios.spread((res1)=>{
           dd.indexList.types1=res1.data.result;
           res.render('common/error', dd);
        })).catch((err)=>{
           res.render('common/error', dd);
        });
    })).catch((err)=>{
        res.render('common/error', dd);
    });
};