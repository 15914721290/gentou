//公共js方法
var axios = require('axios');
module.exports=()=>{
    var a = {};
    //分页
    a.page = (PageNow,PageSize,TotalCount,KangNum)=>{
        var b = {};
        b.PageNow=PageNow;
        b.PageSize=PageSize;
        b.TotalCount=TotalCount;
        //总页数
        b.PageNum = parseInt(b.TotalCount/b.PageSize);
        var isPage=b.TotalCount%b.PageSize;
        if(isPage!=0){
            b.PageNum+=1;
        }
        //上下一页链接
        if(b.PageNow==1){
            b.PrevPage=0;
            b.NextPage=0;
            if(b.PageNum>1){
                b.NextPage=2;
            }
        }else if(b.PageNow==b.PageNum){
            b.PrevPage=b.PageNow-1;
            b.NextPage=0;
        }else{
            b.PrevPage=b.PageNow-1;
            b.NextPage=b.PageNow+1;
        }
        //可显示的页数
        var DisNum = 5;
        if(KangNum){
            DisNum=KangNum;
        }
        if(b.PageNum<DisNum+1){
            b.StartId = 1;
            b.EndId = b.PageNum+1;
            b.NoPage = 0;
        }else{
            b.StartId = 1;
            b.EndId = DisNum+1;
            b.NoPage = 0;
            if(b.PageNow>DisNum){
                b.NoPage = b.PageNow;
            }
        }
        return b;
    }
    a.aLinks = (txt,arr)=>{
        var len = txt;
        var isIn=-1;
        for(i in arr){
            isIn=txt.indexOf(arr[i].Name);
            if(isIn>-1){
                txt=txt.substr(0,isIn)+'<a href="'+arr[i].Url+'" title="'+arr[i].Name+'" target="_blank">'+arr[i].Name+'</a>'+txt.substr(isIn+arr[i].Name.length);
            }
        }
        return txt;
    }
    a.tjReq = (res)=>{
        var req_arr = [],b;
        for(i in res){
            req_arr.push(a.tjReq2(res[i]));
        }
        
        return req_arr;
    }
    a.tjReq2 = (res,d)=>{
        if(res && res.FromCategory){
            return global.http1(global.sv+'/api/categories/'+res.RelatedId+'/articles',d?d:{});
        }else if(res && !res.FromCategory){
            return global.http1(global.sv+'/api/positions/'+res.AggregateId+'/links',d?d:{});
        }else {
            return ''
        }
    }
    a.tjReq3 = (res)=>{
        var req_arr = [],b='';
        for(i in res){
            i==0?b+='':b+='&';
            b+='categoryIds='+res[i].RelatedId;
        }
        return global.http1(global.sv+'/api/articles/group',b);
    }
    a.getIP=()=>{  
        var interfaces = require('os').networkInterfaces();  
        for(var devName in interfaces){  
              var iface = interfaces[devName];  
              for(var i=0;i<iface.length;i++){  
                   var alias = iface[i];  
                   if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                         return alias.address;  
                   }  
              }  
        }  
      } 
    return a;
}