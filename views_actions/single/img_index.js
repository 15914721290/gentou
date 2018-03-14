

require('./commonJS.js');
require('../components/jquery.pagination.min.js');


// 轮播图
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay:3000,
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    pagination : '.pagination',
    paginationClickable :true,
    autoplayDisableOnInteraction:false
  
    });
    $('.img_slide3 .swiper-button-prev').click(function(){
        swiper.swipePrev(); 
        })
        $('.img_slide3 .swiper-button-next').click(function(){
        swiper.swipeNext(); 
    })
    $('.swiper-container').mouseover(function(){
        $('.img_slide3 .swiper-button-prev,.img_slide3 .swiper-button-next').css({
            'display':'block'
        })
    })

    $('.swiper-container').mouseout (function(){
        $('.img_slide3 .swiper-button-prev,.img_slide3 .swiper-button-next').css({
            'display':'none'
        })
    })

$('.scaleTarget').hover(function(){
    $(this).animate({
        width:412,
        height:310,
        marginLeft:-68,
        marginTop:-51
    },100)
},function () {
    $(this).animate({
        width:275,
        height:207,
        marginLeft:0,
        marginTop:0
    },100)
})

