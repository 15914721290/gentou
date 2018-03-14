
//专题路由
var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var errLoad = require('../error.js');
var cmfunc = require('../cmfunc.js')();
var m = require('../api/menu.js');//导航接口
var noRes = require('../noData');


//专题路由
router.get('/:id', (req, res, next) => {
    var tid = parseInt(req.params.id);
    res.json({a:'专题路由'+tid});
});
//专题路由

module.exports = router;
