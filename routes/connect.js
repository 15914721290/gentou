//连接mysql数据库
//创建者：womendi@qq.com
//日期：2017-11-28
module.exports = (func)=>{
    //npm install --save-dev mysql
	var mysql = require('mysql');
	var connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: 'root',
	    database:'bcw'
	});

	connection.connect();

    if(typeof func=='function'){
        func(connection);
        //func 执行完成后 要加 关闭连接 connection.end();
    }
	//关闭连接
	//connection.end();
}



//例子 
// var conn = require('../connect');

// conn(function(connection){
// 	//查询
// 	connection.query('SELECT * from user', function(err, rows, fields) {
// 		var a;
// 		if (err) {
// 			a=err;
// 		}
// 		else{
// 			a=rows;
// 		}
// 		res.send(a);
// 	});
// 	//关闭连接
// 	connection.end();
// });