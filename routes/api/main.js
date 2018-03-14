//中转后台接口列表
//创建者：womendi@qq.com
//日期：2017-11-28
var express = require('express');
var router = express.Router();
var axios = require('axios');

//index模块接口
var M_index = require('./index');
router=M_index(router,'/index');

//单独接口
//位置接口 /api/positions
router.get('/positions',(req,res,next)=>{
   res.json({res:123});
});

module.exports=router;