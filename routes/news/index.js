//资讯路由
var express = require('express');
var router = express.Router();
var path = require('path');
//栏目分页路由
router.get('/:id/:page', (req, res, next) => {
    res.json({ a: '/news/' + req.params.id + '/' + req.params.page });
});


var pd = (req, res, next) => {
    var tid = req.params.id;
    res.json({ a: '栏目:' + tid });
}

var info = (req, res, next) => {
    var tid = req.params.id;
    res.redirect(301, '/news/' + tid + '.html');
}

//文章详情路由
router.get('/:id.html', (req, res, next) => {
    var tid = req.params.id;
    res.json({ a: '哈哈文章详情:' + tid });
});
//文章详情路由

//栏目路由、文章详情路由
router.get('/:id', (req, res, next) => {
    var tid = parseInt(req.params.id);
    if (tid && tid != null) {
        info(req, res, next);
    } else {
        pd(req, res, next);
    }
});
//栏目路由、文章详情路由

//频道路由
router.get('/', (req, res, next) => {
    // res.json({ a: '/news' });
    var site = { title2: '', title: '关于我们', keywords: '两性网,两性健康网,两性生活,两性健康,两性技巧,两性关系,两性情感,两性心理,两性保健,两性话题,两性图片', description: '唯爱健康网是国内专业的两性网站，分享两性健康知识和两性图片，交流性教育、两性关 系、两性技巧、夫妻生活、两性情感、两性心 理、两性保健等话题。', path: global.path };
    var list2 = [{ name: '哈哈哈哈哈哈哈哈哈哈哈哈1' }, { name: '这是关键词设置哈哈2' }, { name: '哈这是关键词设置这是关键词设置哈3' }, { name: '哈哈这是关键词设置4' }, { name: '哈哈5' }, { name: '哈这是关键词设置哈6' }, { name: '哈哈7' }, { name: '哈哈8' }];
    var assignObj = { site: site, menu: global.menu, menuid: '', children: [], articleList: { 'Records': [] } };
    res.render('news/index', assignObj);
});
//频道路由

module.exports = router;