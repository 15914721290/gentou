
require('./commonJS.js');
tacTag();
$('.loadMoreInner').click(function(){
    var id = encodeURI($('.infolistMain').attr('flag'));
    var page = $(this).attr('page');
    page++;
    $(this).attr('page',page);
    cm.ajax(cm.app.url+'/api/index/search/'+id+'/'+page,'',function(res){
        var str = '';
        for(var i=0;i<res.result.Records.length;i++){
            var str2 = '';
            for(var j=0;j<res.result.Records[i].Keywords.length;j++){
                str2+='<span class="cm_fl cm_fs08 cm_ml05"><a class="cm_c1c" href="'+cm.app.url+'/k/'+res.result.Records[i].Keywords[j].Alias+'/" title="'+res.result.Records[i].Keywords[j].Name+'" target="_blank">'+res.result.Records[i].Keywords[j].Name+'</a></span>'
            }
            str+='<li class="cm_pc_12 cm_pr cm_bb1ce">'+
                   '<div class="cm_pc_12 cm_pr cm_mtb1 listNewHeight">'+
                        '<div class="cm_pa cm_tl0 cm_z2 topImg">'+
                            '<div class="cm_pr cm_w11 cm_h7 scaleImg">'+
                                '<a class="" href="" title="'+res.result.Records[i].Title+'" target="_blank">'+
                                        '<img class="cm_z1 cm_wh100 cm_bs100 cm_br02 lazy2" data-original="'+res.result.Records[i].Thumbnail+'"/>'+
                                    '</a>'+
                            '</div>'+
                        '</div>'+
                        '<ul class="cm_pc_12 cm_pl12 cm_pr0 cm_pr cm_minh7">'+
                            '<li class="cm_pc_12 cm_pr cm_mtb02">'+
                                '<strong class="cm_fs12 cm_fwb smallSize"><a class="cm_c3c" href="" title="'+res.result.Records[i].Title+'" target="_blank">'+res.result.Records[i].Title+'</a></strong>'+
                            '</li>'+
                            '<li class="cm_pc_12 cm_pr cm_wb_b cm_mb1 mobile_hide">'+
                                '<a class="" href="" title="'+res.result.Records[i].Title+'" target="_blank"><span class="cm_fs09 cm_c4c">'+res.result.Records[i].Description+'</span></a>'+
                            '</li>'+
                            '<li class="cm_pc_12 cm_pr">'+
                                '<span class="cm_fl cm_fs08 cm_c5c mobile_hide">'+res.result.Records[i].PublishDate+'</span>'+
                                '<span class="cm_fl cm_fs08 cm_c5c cm_mrl05 noMarginLeft">标签:</span>'+str2+
                            '</li>	'+									
                        '</ul>'+
                    '</div>'+
                '</li>'
        }
        //总页数
            var total  = Math.ceil(res.result.TotalCount/res.result.PageSize);
            if(res.result.PageNow<=total){
                $('.infolistMain').append(str);
                tacTag();
                cm.Limg('.lazy2');
                if(res.result.PageNow==total){
                    $('.infolistMain').siblings('.loadMore').find('.loadMoreInner').css({'display':'none'})
                }
            }
    })
})



// 替换搜索词
function tacTag(){
    var searchArr = $('.infolistMain').find('strong>a');
    var id = $('.infolistMain').attr('flag');
    var span = '<span style="color:red;">'+id+'</span>';
    for(var i=0;i<searchArr.length;i++){
        searchArr.eq(i).html(searchArr.eq(i).html().replace(id,span))
    }
}




