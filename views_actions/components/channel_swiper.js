var swiper = new Swiper('.swiper-container', {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: true,
	autoplay: 3000,
	prevButton: '.swiper-button-prev',
	nextButton: '.swiper-button-next',
	pagination: '.index_pagination'
});

$('.index_img_slide .swiper-button-prev').click(function () {
	swiper.swipePrev();
});
$('.index_img_slide .swiper-button-next').click(function () {
	swiper.swipeNext();
});
$('.swiper-container').mouseover(function () {
	$('.index_img_slide .swiper-button-prev,.index_img_slide .swiper-button-next').css({
		'display': 'block'
	})
})

$('.swiper-container').mouseout(function () {
	$('.index_img_slide .swiper-button-prev,.index_img_slide .swiper-button-next').css({
		'display': 'none'
	})
})