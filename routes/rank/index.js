
//排行榜路由
var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var errLoad = require('../error.js');
var cmfunc = require('../cmfunc.js')();
var m = require('../api/menu.js');//导航接口
var noRes = require('../noData');


//排行榜文章详情路由
router.get('/:id', (req, res, next) => {
    var tid = parseInt(req.params.id);
    res.json({a:'排行榜文章详情路由'+tid});
});
//排行榜文章详情路由

//排行榜首页
router.get('/', (req, res, next) => {
    res.json({a:'排行榜首页'});
});
//排行榜首页

module.exports = router;
