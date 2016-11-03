$('#top').mousemove(function( event ) {
//     var magnitudeForeground = 0.075;
//     var magnitudeBackground = 0.025;
//     var wh = $(window).height();
//     var ww = $(window).width();
//     $('.header-content').css('margin-left',(magnitudeForeground*event.pageX*-1));
//     $('.header-content').css('top',(magnitudeForeground*event.pageY*-0.25)+(55)+"%");
//     $('.header').css('background-position',(magnitudeBackground*event.pageX*-1+50)+"% "+(magnitudeBackground*event.pageY*0.25+50)+"%");
});

particlesJS.load('particles-js', 'js/particles.json', function() {
    console.log('callback - particles.js config loaded');
});

function checkAnimated(scroll) {
    $('.animate').each(function () {
        var offset = $(this).offset().top;
        var height = $(this).height();
        if (scroll > offset+height) {
            $(this).addClass('animated');
        }
    });
    $('.animated').each(function () {
        var offset = $(this).offset().top;
        var height = $(this).height();
        if (scroll <= offset) {
            $(this).removeClass('animated');
        }
    });
}
$(window).on('scroll',function() {
    checkAnimated($(this).scrollTop());
});
