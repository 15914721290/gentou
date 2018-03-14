//导航接口
module.exports = (func)=>{
    var p = global.path;
    var api_c = require('./channel.js');
	api_c.channel(function(res){
        var result=[{Name:'首页',url:'/',Alias:'/'}],newObj={};
        if(res!='error'&&res.data.status==1){
            result = res.data.result;
            for(i in result){
                result[i].url=p+'/'+result[i].Alias+'/';
                newObj[result[i].Alias]=result[i];
            }
            result.unshift({Name:'首页',url:'/',Alias:'/'});
            global.menu = result;
            global.menu2 = newObj;
        }else{
            global.menu = result;
            global.menu2 = newObj;
        }
        func&func(result,newObj);
	});
}