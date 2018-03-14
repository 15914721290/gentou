var axios = require('axios');
module.exports = {
        channel: (func, d, tp) => {
                //频道接口
                var a1 = global.http1(global.sv + '/api/categories/channel', d ? d : {}, tp ? tp : 'GET');
                axios.all([a1]).then(axios.spread(function (res1) {
                        func(res1);
                })).catch(function (err1) {
                        func('error');
                });
        },
        children: (func, d, tp, url) => {
                //子栏目接口
                var a1 = global.http1(global.sv + '/api/categories/' + url + '/children', d ? d : {}, tp ? tp : 'GET');
                axios.all([a1]).then(axios.spread(function (res1) {
                        func(res1);
                })).catch(function (err1) {
                        func(err1);
                });
        }
}