//公共js初始化
// window.cm = new cmapp();
//懒加载
cm.Limg();
var loadimg = function (t) {
  var num = Math.random() * 10;
  var hbody = $('html,body');
  var st = t.offset().top + num - 60;
  hbody.animate({ scrollTop: st }, 0);
}
//懒加载
var win_w = function () {
  var t = this;
  t.resetW = function () {
    t.w = $(window).width();
    t.h = $(window).height();
    var m1 = $('.cm_main');
    var m2 = $('.cm_main2');
    if (t.w < 768) {
      m1.css({ width: '100%' });
    } else {
      m1.css({ width: '1200px' });
    }
  }
  t.resetW();
  $(window).bind('resize', function () {
    t.resetW();
  });
}
//详情页面右侧切换
cm.ck('.right_ts>div', function (t) {
  t.addClass('cm_bt2c1 cm_c1c cm_bb1ce').removeClass('cm_bt1ce').siblings().addClass('cm_bt1ce').removeClass('cm_bt2c1 cm_c1c cm_bb1ce');
  var p = t.parents('.right_ts_main');
  var rtl = p.find('.right_ts_list');
  rtl.find('ul').eq(t.index()).removeClass('cm_dn').siblings().addClass('cm_dn');
}, 4);

cm.ck('.right_tsnav>span', function (t) {
  t.addClass('cm_bt2c1 cm_c1c cm_bb1ce').removeClass('cm_bt1ce').siblings().addClass('cm_bt1ce').removeClass('cm_bt2c1 cm_c1c cm_bb1ce');
  var p = t.parents('.right_ts_main');
  var rtl = p.find('.right_tscon');
  rtl.children('ul').eq(t.index()).removeClass('cm_dn').siblings().addClass('cm_dn');
}, 4);
//详情页面右侧列表显示详情切换
cm.ck('.right_tsinfo>li', function (t) {
  t.find('ul').removeClass('cm_dn');
  t.siblings().find('ul').addClass('cm_dn');
  t.find('.info_list').addClass('cm_dn');
  t.siblings().find('.info_list').removeClass('cm_dn');
}, 4);

// $('.right_tsnav span').click(function(){
// console.log(11)
// })
        

//搜索
function search() {
  var txt = '请输入搜索关键字';
  var check = false
  var dataValue = $('#search').attr('data-value')
  var position = $('#search').attr('position')
  console.log(position)
  console.log(dataValue)
  if (dataValue) {
    $('#search').val(dataValue)
  } else {
    $('#search').val(txt)
  }

  var href = $('.seacrhLink').attr('href')
  if (!href) {
    return
  }
  var num = href.indexOf('=')
  var nHref = href.substring(0, num + 1)

  $('#search').bind('input propertychange', function () {
    var val = $(this).val().indexOf('%') == -1 ? $(this).val() : '';
    $('#ck_soso').attr('href', nHref + val)
  });

  $('#search').on('keydown', function (e) {
    var e = e || window.event
    var val = $(this).val().indexOf('%') == -1 ? $(this).val() : '';
    console.log(e.keyCode)
    if (e.keyCode != 13) {
      if (position == 1) {
        if (check && !dataValue) {
          return
        }
        $('#search').val('')
        check = true
      }
    } else if (e.keyCode == 13) {
      if ($('#search').val() == txt) {
        window.location.href = nHref + ''
        return
      }
      window.location.href = nHref + val
    }
  })
}
search()
//头部菜单弹出
var head_pop = function () {
  var hmtid = 0, hmapid = 0;
  cm.ck('#head_menu>li', function (t) {
    var tid = t.index();
    var hmp = $('#head_menu_pop');
    var hli = hmp.find('li');
    hmtid = tid == 0 ? 0 : (tid == 2 ? 1 : 2);
    if (tid % 2 == 0) {
      hmp.removeClass('cm_dn');
      hli.eq(hmtid).removeClass('cm_dn').siblings().addClass('cm_dn');
      cm.ck('#head_map', function (t) {
        hmp.removeClass('cm_dn');
        hmapid = 1;
      }, 4);
      cm.ck('#head_map', function (t) {
        hmp.addClass('cm_dn');
        hmapid = 0;
      }, 5);
    }
  }, 4);
  cm.ck('#head_menu>li', function (t) {
    $('#head_menu_pop').addClass('cm_dn');
  }, 5);
}
head_pop();
//头部菜单弹出

//文章分页
cm.ck('#info_page>li', function (t) {
  var aid = t.attr('aid');
  if (aid == 'no') {
    return;
  }
  t.addClass('cm_c1b').removeClass('cm_b1c5');
  t.find('a').addClass('cm_cf').removeClass('cm_c5c');
}, 4);
cm.ck('#info_page>li', function (t) {
  var aid = t.attr('aid');
  if (aid == 'no') {
    return;
  }
  t.removeClass('cm_c1b').addClass('cm_b1c5');
  t.find('a').removeClass('cm_cf').addClass('cm_c5c');

  if (aid == '1') {
    t.addClass('cm_c1b').removeClass('cm_b1c5');
    t.find('a').addClass('cm_cf').removeClass('cm_c5c');
  }
}, 5);

//文章分页

//鼠标在图片上动效
var scaleIE = function () {
  console.log('图片缩放')
  // var isIE = cm.isIE();
  // if(!isIE){
  //   return;
  // }
  // console.log('ie running...');
  // cm.ck('.scaleImg img',function(t){
  // console.log('mouseenter...');
  //   var w='140%';
  //   var h='140%';
  //   var m = '-20% 0 0 -20%';
  //   t.animate({width:w,height:h,margin:m}, 500).stop(true);
  // },4);
  // cm.ck('.scaleImg img',function(t){
  //   console.log('mouseleave...');
  //   var w='100%';
  //   var h='100%';
  //   var m = '0';
  //   t.animate({width:w,height:h,margin:m}, 500).stop(true);
  // },5);
}
scaleIE();
//鼠标在图片上动效


// banner图点击关闭
$('#commonBanner span').on('click', function () {
  $('#commonBanner').slideUp(500);
})


// 首页图片下方文字隐藏
$('.ImgSpage').mouseover(function () {
  $(this).find('span').css({ 'display': 'block' });
})
$('.ImgSpage').mouseout(function () {
  $(this).find('span').css({ 'display': 'none' });
})


// 热门关注轮播图
var mySwiper = new Swiper('.host_swiper_container', {
  prevButton: '.swiper-button-prev',
  nextButton: '.swiper-button-next',
})
$('.host_swiper_container .swiper-button-prev').click(function () {
  mySwiper.swipePrev();
});
$('.host_swiper_container .swiper-button-next').click(function () {
  mySwiper.swipeNext();
});





