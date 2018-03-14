//平台库路由
module.exports = (router) => {
    // 平台库
    router.get('/p2p', (req, res, next) => {
        var site = {name:'互金跟投',title: '互金跟投_P2P网贷平台_P2P 投资理财综合门户', keywords: '网贷,网贷平台,P2P网贷,P2P网贷平台,P2P理财,P2P投资理财', description: '互金跟投是国内专业的P2P网贷平台，致力于提 供最新网贷新闻、海量网贷平台数据、实用投资 理财工具查询，汇聚数百家P2P网贷理财公司核 心信息，帮助您选择最好的P2P网贷平台。', path: global.path };
	    var assignObj = {site: site, menu: global.menu, menuid: '/p2p',data:{message:''}, url: site.path + '/', moment: global.moment};
        res.render('platform/p_index', assignObj);
    });
    // 平台库筛选列表页
    router.get('/p2p/all', (req, res, next) => {
        res.send('条件筛选-默认页');
    });
    router.get('/p2p/:id', (req, res, next) => {
        res.send('条件筛选');
    });
    // 地图
    router.get('/p2p-dh', (req, res, next) => {
        res.send('平台地图');
    });
    return router;
};