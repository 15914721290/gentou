//平台库路由
module.exports = (router) => {
    // 详情页-新闻
    router.get('/newss', (req, res, next) => {
        res.send('新闻');
    });
    // 详情页-档案
    router.get('/beian', (req, res, next) => {
        res.send('档案');
    });
    // 详情页-评测
    router.get('/pingji', (req, res, next) => {
        res.send('评测');
    });
    // 详情页-平台推荐
    router.get('/guanfang', (req, res, next) => {
        res.send('平台推荐');
    });
    // 详情页-首页
    router.get('/shouye', (req, res, next) => {
        res.send('首页');
    });
    
    return router;
};