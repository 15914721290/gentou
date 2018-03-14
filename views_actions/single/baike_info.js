require('./commonJS.js');
require('../components/channel_swiper.js');


// tab切换
function tabSwitch(el1,el2) {
    if($('body').width()<=750 && $(el1).find('a')){
        $(el1).find('a').attr('href','javascript:void(0)')
    }
$(el1).on('mouseenter',function (e) {
    var index = $(this).index()
        $(el1).removeClass('cm_c3b').eq(index).addClass('cm_c3b')
        $(el2).addClass('cm_dn').eq(index).removeClass('cm_dn')
})
}
// 两性健康tab切换
tabSwitch('.info_head ul li','.info_body ul');
// 白银知识tab切换
tabSwitch('.knowledge-tab-wrap span','.knowledge-con-wrap .con-inner');
$('.knowledge-tab-wrap').find('span').eq(0).addClass('cm_c3b');
$('.con-inner').eq(0).removeClass('cm_dn');
//加载更多
var loadMoreInner = $('.loadMoreInner');
for(var i=0;i<loadMoreInner.length;i++){
     loadMoreInner.eq(i).index = i;
    loadMoreInner.eq(i).click(function(){
        var id = $(this).attr('flag');
        var knowledge_con = $(this).parent().siblings('.knowledge-con');
        var page = $(this).attr('page');
        page++;
        $(this).attr('page',page);
        cm.ajax(cm.app.url+'/api/index/b/'+id+'/'+page,'',function(res){
            //拼接字符串
           
           var str = '';
            for(var i=0;i<res.result.Records.length;i++){
                if(res.result.Records[i].Thumbnail==null){res.result.Records[i].Thumbnail=''}
                var str2 = '';
                    for(var j=0;j<res.result.Records[i].Keywords.length;j++){
                        str2+='<a href="'+cm.app.url+'/k/'+ res.result.Records[i].Keywords[j].Alias +'/" target="_blank">'+res.result.Records[i].Keywords[j].Name+'</a>,'
                    }
                str+='<li class="item">'+
                            '<div class="left scaleImg">'+
                                '<a href="'+cm.app.url+'/b/lx'+res.result.Records[i].Id+'.html" target="_blank">'+           
                                    '<img class="lazy2" data-original='+res.result.Records[i].Thumbnail+' alt='+ res.result.Records[i].Title +'>'+
                                '</a>'+
                            '</div>'+
                            '<div class="right">'+
                                '<strong>'+
                                    '<a href="'+cm.app.url+'/b/lx'+res.result.Records[i].Id+'.html" target="_blank">'+ res.result.Records[i].Title +'</a>'+
                                '</strong>'+
                                '<p class="detail">'+res.result.Records[i].Description+ '</p>'+
                                '<div class="bottom">'+
                                    '<span class="time">'+ res.result.Records[i].PublishDate+ '</span>'+
                                    '<span class="class">'+
                                        '分类: '+str2+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</li>';
                
            }
            //总页数
            var total  = Math.ceil(res.result.TotalCount/res.result.PageSize);
            if(res.result.PageNow<=total){
                knowledge_con.append(str);
                cm.Limg('.lazy2');
                if(res.result.PageNow==total){
                    knowledge_con.siblings('.loadMore').find('.loadMoreInner').css({'display':'none'})
                }
            }
        });

    })
}



// 微信分享：
window._bd_share_config={
    "common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},
    "share":{}
};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
    