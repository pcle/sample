$(function(){


  $('.js-chara-ss').slick({
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });

  $('.build dd span').on({
    'click':function(){
      $(this).parent().find('ul').slideToggle();
    }
  });
});