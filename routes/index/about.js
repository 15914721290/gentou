//关于我们路由
var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
var errLoad = require('../error.js');
var cmfunc = require('../cmfunc.js')();
var m = require('../api/menu.js');//导航接口
var noRes = require('../noData');
module.exports = (router) => {
    router.get('/about.html', (req, res, next) => {
        var site = { title2: '', title: '关于我们', keywords: '两性网,两性健康网,两性生活,两性健康,两性技巧,两性关系,两性情感,两性心理,两性保健,两性话题,两性图片', description: '唯爱健康网是国内专业的两性网站，分享两性健康知识和两性图片，交流性教育、两性关 系、两性技巧、夫妻生活、两性情感、两性心 理、两性保健等话题。', path: global.path };
        var list2 = [{ name: '哈哈哈哈哈哈哈哈哈哈哈哈1' }, { name: '这是关键词设置哈哈2' }, { name: '哈这是关键词设置这是关键词设置哈3' }, { name: '哈哈这是关键词设置4' }, { name: '哈哈5' }, { name: '哈这是关键词设置哈6' }, { name: '哈哈7' }, { name: '哈哈8' }];
        var assignObj = { site: site, menu: global.menu, menuid: '', children: [], articleList: { 'Records': [] } };
        res.render('index/about', assignObj);
    });
    router.get('/link.html', (req, res, next) => {
        var site = { title2: '', title: '友情链接', keywords: '两性网,两性健康网,两性生活,两性健康,两性技巧,两性关系,两性情感,两性心理,两性保健,两性话题,两性图片', description: '唯爱健康网是国内专业的两性网站，分享两性健康知识和两性图片，交流性教育、两性关 系、两性技巧、夫妻生活、两性情感、两性心 理、两性保健等话题。', path: global.path };
        var list2 = [{ name: '哈哈哈哈哈哈哈哈哈哈哈哈1' }, { name: '这是关键词设置哈哈2' }, { name: '哈这是关键词设置这是关键词设置哈3' }, { name: '哈哈这是关键词设置4' }, { name: '哈哈5' }, { name: '哈这是关键词设置哈6' }, { name: '哈哈7' }, { name: '哈哈8' }];
        var assignObj = { site: site, menu: global.menu, menuid: '', children: [], articleList: { 'Records': [] } };
        res.render('index/link', assignObj);
    });
    router.get('/law.html', (req, res, next) => {
        var site = { title2: '', title: '服务条款', keywords: '两性网,两性健康网,两性生活,两性健康,两性技巧,两性关系,两性情感,两性心理,两性保健,两性话题,两性图片', description: '唯爱健康网是国内专业的两性网站，分享两性健康知识和两性图片，交流性教育、两性关 系、两性技巧、夫妻生活、两性情感、两性心 理、两性保健等话题。', path: global.path };
        var list2 = [{ name: '哈哈哈哈哈哈哈哈哈哈哈哈1' }, { name: '这是关键词设置哈哈2' }, { name: '哈这是关键词设置这是关键词设置哈3' }, { name: '哈哈这是关键词设置4' }, { name: '哈哈5' }, { name: '哈这是关键词设置哈6' }, { name: '哈哈7' }, { name: '哈哈8' }];
        var assignObj = { site: site, menu: global.menu, menuid: '', children: [], articleList: { 'Records': [] } };
        res.render('index/law', assignObj);
    });
    router.get('/contact.html', (req, res, next) => {
        var site = { title2: '', title: '联系我们', keywords: '两性网,两性健康网,两性生活,两性健康,两性技巧,两性关系,两性情感,两性心理,两性保健,两性话题,两性图片', description: '唯爱健康网是国内专业的两性网站，分享两性健康知识和两性图片，交流性教育、两性关 系、两性技巧、夫妻生活、两性情感、两性心 理、两性保健等话题。', path: global.path };
        var list2 = [{ name: '哈哈哈哈哈哈哈哈哈哈哈哈1' }, { name: '这是关键词设置哈哈2' }, { name: '哈这是关键词设置这是关键词设置哈3' }, { name: '哈哈这是关键词设置4' }, { name: '哈哈5' }, { name: '哈这是关键词设置哈6' }, { name: '哈哈7' }, { name: '哈哈8' }];
        var assignObj = { site: site, menu: global.menu, menuid: '', children: [], articleList: { 'Records': [] } };
        res.render('index/contact', assignObj);
    });
    //网站地图
    router.get('/sitemap.html', (req, res, next) => {
        m(function (menu, menu2) {
            var mapChannel = menu2;
            var a1 = global.http1(global.sv + '/api/categories/children');
            var site = { title: '网站地图_唯爱健康网', keywords: '', description: '', path: global.path };
            var dd = { site: site, menu: menu, menuid: '', mapChannel: menu2, mapChildren: [] }
            axios.all([a1]).then(axios.spread((res1) => {
                dd.mapChildren = res1.data.result;
                res.render('index/sitemap', dd);
            })).catch((err) => {
                res.render('index/sitemap', dd);
            });
        });
    });
    return router;
};