module.exports =  function(res,type) {
    // 0:对象，1：数组
    if(type == 0){
        var data = {}
    }else {
        var data = []
    }
    if(type == 0 && res){
        if(res.data.result.PageNow){
            data = res.data.result.Records[0]
        }else {
            data = res.data.result[0]
        }
    }
    if(type == 1 && res){
        if(res.data.result.PageNow){
            data = res.data.result.Records
        }else {
            data = res.data.result
        }
    }
    return data || {} || []
}