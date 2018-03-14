require('./commonJS.js');
//-----------------------------操作写在以下
require('../components/channel_swiper.js');
// tab切换
function tabSwitch(el1,el2) {
$(el1).on('mouseenter',function (e) {
    var index = $(this).index()
        $(el1).removeClass('active').eq(index).addClass('active')
        $(el2).addClass('hide').eq(index).removeClass('hide')
})
}

// 两性健康tab切换
tabSwitch('.info_head ul li','.info_body ul');
