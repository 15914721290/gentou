require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

console.log('loading..start');
//全局jquery
window.jQuery = window.$ = require('jquery/dist/jquery.min.js');

require('../../views_assets/js/jqplugin/jquery.lazyload_v1.9.3.js');
require('../../views_assets/js/jqplugin/idangerous.swiper.min.js');

//全局cmapp.js  里面方法不用修改
window.cmapp= require('../../views_assets/js/common/cmapp_webpack.js');
window.cm= cmapp();

//公共js方法
require('../common/common.js');
console.log('loading..end');
