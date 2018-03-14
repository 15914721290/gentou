   $('.swiper-container.baike_index_swiper').mouseover(function(){
        $('.baike_index_swiper .swiper-button-prev,.baike_index_swiper .swiper-button-next').css({
            'display':'block'
        })
    })

    $('.swiper-container').mouseout (function(){
        $('.baike_index_swiper .swiper-button-prev,.baike_index_swiper .swiper-button-next').css({
            'display':'none'
        })
    })

    $('.baike_index_swiper .swiper-button-prev').click(function(){
        swiper.swipePrev(); 
        })
    $('.baike_index_swiper .swiper-button-next').click(function(){
        swiper.swipeNext(); 
    })