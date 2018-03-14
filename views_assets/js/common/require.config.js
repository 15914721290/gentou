window.loadAction = [];
window.rConcat = function(obj,version){
    var t = this;
    t.sv = 'http://'+window.location.host+'/';
    t.arr1 = [];
    t.arr2 = [];
    t.arr3 = [];
    t.arr4 = [];
    t.isLoad = 0;
    for(v in obj){
        if(obj[v].name!='jquery'){
            if(t.isLoad==1){
                if(obj[v].isFirst==1){
                    t.arr3.push(obj[v].name);
                }else{
                    t.arr4.push(obj[v].name);
                }
            }else{
                if(obj[v].name=='common'){
                    t.arr2.push(obj[v].name);
                    t.isLoad = 1;
                }else{
                    t.arr1.push(obj[v].name);
                }
            }
        }
        obj[v]=t.sv+obj[v].path+obj[v].filename+'.'+obj[v].type+'?v='+version;
    }
    return [obj,t.arr1,t.arr2,t.arr3,t.arr4];
}