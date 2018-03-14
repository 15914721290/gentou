//nodejs中转后台接口请求，隐藏真实后台接口地址
//创建者：womendi@qq.com
//日期：2017-11-28

var request = require('request');
//url,d,method,func1,func2
// 分别为请求地址,请求数据(json格式),请求方式GET,POST等，成功回调函数，失败回调函数
module.exports = (url,d,method,func1,func2)=>{
	request({
	    url: url,
	    method:method,
	    json: true,
	    headers: {'content-type': 'application/json'},
	    body: d
	}, function(error, res, data) {
		//error, res, data分别为错误信息，请求响应信息，接口返回数据
		//console.log 信息只在nodejs控制台可看
		// console.log('res==='+JSON.stringify(res));
		//console.log('requrest data === '+JSON.stringify(data));
	    if (!error && res.statusCode == 200) {
	    	func1(res, data);
	    }else{
	    	// console.log('error==='+error);
	    	func2(error);
		}
	});
}
//例子
// var http2 = require('./http2');
// http2(sv+'/cmapi/mine/log',{},'GET',function(response,data){
// 	res.json(data);
// },function(err){
// 	res.json({title:'error',msg:'Request error'});
// });