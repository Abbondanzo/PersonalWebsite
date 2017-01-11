// Adjusts background to be parallax
// Deprecated due to performance hit
//$('#top').mousemove(function( event ) {
//     var magnitudeForeground = 0.075;
//     var magnitudeBackground = 0.025;
//     var wh = $(window).height();
//     var ww = $(window).width();
//     $('.header-content').css('margin-left',(magnitudeForeground*event.pageX*-1));
//     $('.header-content').css('top',(magnitudeForeground*event.pageY*-0.25)+(55)+"%");
//     $('.header').css('background-position',(magnitudeBackground*event.pageX*-1+50)+"% "+(magnitudeBackground*event.pageY*0.25+50)+"%");
//});

particlesJS.load('particles-js', 'js/particles.json');

// Handles background changes
var fromTop = $(window).scrollTop();
function menuHandler(scroll) {
    if (scroll < fromTop && scroll != 0 && !$('.mobile').hasClass('mobile-active')) {
        $('.nav').addClass('in-view');
    } else {
        if (scroll > fromTop) {
            if ($('.nav').hasClass('in-view')) {
                $('.nav').addClass('hiding');
            }
        } else {
            $('.nav').removeClass('hiding');
        }
        setTimeout(function (){
            $('.nav').removeClass('in-view');
            $('.nav').removeClass('hiding');
        }, 250);
    }
    fromTop = scroll;
}
// Reloads animations into view
function checkAnimated(scroll) {
    // Hides elements when out of view
    // Deprecated due to performance hit (and it became annoying)
    /*$('.animate').each(function () {
        var offset = $(this).offset().top; // Distance from top to element
        var height = $(this).height(); // Height of element
        var wow = $(window).height(); // Height of window
        if (scroll > offset+height || scroll+wow <= offset) {
            $(this).addClass('animated');
            $(this).removeClass('animate');
        }
    });*/
    // Animates elements that appear in scroll view
    $('.animated').each(function () {
        var offset = $(this).offset().top;
        var height = $(this).height();
        var wow = $(window).height();
        if (scroll <= offset+(0.8*height) && scroll+wow > offset) {
            $(this).removeClass('animated');
            $(this).addClass('animate');
        }
    });
}

// Start functions
setTimeout(function() {
    checkAnimated($(window).scrollTop());
}, 50);
menuHandler($(window).scrollTop());

// Prevents too much reloading, checks scrolling on 0.1s intervals
var timeoutId;
$(window).on('scroll',function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
        checkAnimated($(this).scrollTop());
        menuHandler($(this).scrollTop());
    }, 100 );
});

// Activates masonry layout
$('.grid').packery({
    itemSelector: '.grid-item',
    gutter: 20
});

// Toggles mobile menu state open/close
$('.close-menu').on('click',function() {
    $('.mobile').removeClass('mobile-active');
});
// Closes mobile menu when a link is clicked
$('.mobile a').on('click',function() {
    $('.mobile').removeClass('mobile-active');
});
// Opens mobile menu
$('.icon').on('click',function() {
    $('.mobile').addClass('mobile-active');
    $('.nav').removeClass('in-view');
});

// Display correction
function bodyFlow() {
    var top = $(window).scrollTop();
    $('body').css('position','fixed');
    $('body').css('top', -top);
    $('.close-menu').css('display','none');
}
// Dynamically load contact script
$('.contact-button').on('click',function() {
    $('.contact-form').load('contact.php');
    bodyFlow();
});

// Dynamically load Portfolio items
$('.grid-item').on('click',function(){
    var contact = $('.contact-form');
    if ($(this).hasClass('item-cafe')) {
        contact.load('cafe.php');
    } else if ($(this).hasClass('item-rogue')) {
        contact.load('rogue.php');
    } else if ($(this).hasClass('item-feedshare')) {
        contact.load('feedshare.php');
    } else if ($(this).hasClass('item-flipster')) {
        contact.load('flipster.php');
    } else if ($(this).hasClass('item-myneu')) {
        contact.load('myneu.php');
    } else if ($(this).hasClass('item-sthacks')) {
        contact.load('sthacks.php');
    }
    bodyFlow();
});

// Slow fade for success message
setTimeout(function() {
    $('.success').fadeOut("slow");
}, 4000);

// Store input values until submitted
$('.contact-form').on('keyup','input','textarea', function(e) {
    if($(this).attr('name') == "name") {
        $.cookie('name',$(this).val(),{ expires: 7 });
    } else if($(this).attr('name') == "email") {
        $.cookie('email',$(this).val(),{ expires: 7 });
    }
});

// Removes cookies
if($('.sdone').length > 0) {
    $.removeCookie("name");
    $.removeCookie("email");
    $.removeCookie("message");
}
