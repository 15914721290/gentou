require('./commonJS.js');
// 单独的js必须导入commonJS.js
//-----------------------------操作写在以下
require('../components/channel_swiper.js');


//导航菜单pop
var tsPop = function(id,tp){
    var pm = $('#cm_pop_menu>li').eq(id);
	if(tp){
		pm.find('ul').removeClass('cm_dn');
		pm.find('span').addClass('cm_dn');
		return;
	}
	pm.find('ul').addClass('cm_dn');
	pm.find('span').removeClass('cm_dn');
}
cm.ck('.cm_pc_menu>a>span',function(t){
	 var mid = parseInt(t.attr('mid'));
	 if(mid==1||mid==2){
		var mid2 = 2;
		if(mid==2){
			mid2=1;
		}
		tsPop(mid,1);
		tsPop(mid2,0);
	 }else{
		tsPop(1,0);
		tsPop(2,0);
	 }
},4);
cm.ck('#cm_pop_menu>li',function(t){
	var mid = t.index();
	if(mid==1||mid==2){
		tsPop(mid,0);
	}else{
		tsPop(1,0);
		tsPop(2,0);
	 }
},5);
//选中
cm.ck('.menu_pop01>li',function(t){
	t.addClass('cm_c1c cm_be').siblings().removeClass('cm_c1c cm_be');
},4);
cm.ck('.menu_pop01>li',function(t){
	t.removeClass('cm_c1c cm_be');
},5);
//选中
//搜索框弹框与隐藏
cm.ck('.cm_pop_menu02',function(t){
	t.next().removeClass('cm_dn');
},4);
cm.ck('.cm_pop_menu02',function(t){
	t.next().addClass('cm_dn');
},5);
cm.ck('.menu_pop02',function(t){
	t.removeClass('cm_dn');
},4);
cm.ck('.menu_pop02',function(t){
	t.addClass('cm_dn');
},5);
cm.ck('.menu_pop02>li',function(t){
	t.addClass('cm_c1c cm_be').siblings().removeClass('cm_c1c cm_be');
},4);
cm.ck('.menu_pop02>li',function(t){
	t.removeClass('cm_c1c cm_be');
},5);
//搜索框弹框与隐藏

//导航菜单pop

//tab切换
cm.ck('.cm_tab01>div',function(t){
	var tid = t.index();
	t.addClass('cm_bt2c1 cm_c1c cm_bf').siblings().removeClass('cm_bt2c1 cm_c1c cm_bf');
	t.parent().next().find('ul').eq(tid).removeClass('cm_dn').siblings().addClass('cm_dn');
},4);
//tab切换

cm.ck('#foot_friend>div',function(t){
    t.addClass('cm_b1c1 cm_c1c').removeClass('cm_b1cf cm_c1f').siblings().addClass('cm_b1cf cm_c1f').removeClass('cm_b1c1 cm_c1c');
    $('#foot_friend_list>div').eq(t.index()).removeClass('cm_dn').siblings().addClass('cm_dn');
	var mySwiper = new Swiper('.host_swiper_container',{
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
	})
	$('.host_swiper_container .swiper-button-prev').click(function(){
	mySwiper.swipePrev(); 
	});
	$('.host_swiper_container .swiper-button-next').click(function(){
	mySwiper.swipeNext(); 
	});
},4);



// // 移动端轮播图
var mySwiper = new Swiper('.m_swiper-container',{
// autoplay : 1000,
loop : true,
paginationClickable: true,
centeredSlides: true,
slidesPerView: 3,
watchActiveIndex: true
})


// 移动端4个推荐位的切换
var column = $('.column')
for(var i=0;i<column.length;i++){
	var navSpan = column.eq(i).find('.column_ul').find('span');
	if(navSpan.length!=0){
		for(var j=0;j<navSpan.length;j++){
			navSpan.eq(j).click(function(){
				var index = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
					var navBox = $(this).parent().next().children();
					navBox.eq(index).removeClass('hide').siblings().addClass('hide');
			})
		}
	}
}

// 移动端排行版和热门标签的切换
for(var i=0;i<column.length;i++){
	var hostLi = column.eq(i).find('.column_child').find('.hots_head').children();
	for(var j=0;j<hostLi.length;j++){
		hostLi.eq(j).click(function(){
			var index = $(this).index();
			$(this).addClass('flag').siblings().removeClass('flag');
			var tabBox = $(this).parent().next().children();
			tabBox.eq(index).removeClass('hide').siblings().addClass('hide');
		})
	}
	
}
