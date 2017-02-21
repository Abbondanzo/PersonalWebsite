// Animations "Hello, you found me." intro
function animHello(index) {
    $html = $('.hello-text h1').eq(index);
    var content = $html.html();
    if(content != undefined) {
        var length = content.length;
        $('span.blink').remove();
        $html.addClass('active-text');
        showWord(content, length, 1, $html);
    }
}

// Animates a given word of given length inside given html section
function showWord(word, length, count, $html) {
    $html.html('<span>'+word.slice(0, count)+'</span>'+word.slice(count, length)+'<span class="blink">|</span>');
    var margin = $('.active-text span').width();
    var width = $html.width();
    console.log(width);
    //$('.blink').css('margin-left', margin - width + 27);
    if(count < length) {
        setTimeout(function() {
            showWord(word, length, count+1, $html);
        }, 80);
    } else {
        setTimeout(function() {
            $html.removeClass('active-text');
            animHello($html.index()+1);
        }, 1000);
    }
}

// Start landing animation
setTimeout(function() {
    animHello(0);
}, 1000);

// Mobile navigation menu click
$('.mobile-links .fa-bars').on('click', function() {
    $(this).next().addClass('active');
})

// Closing mobile navigation menu
function closeAll() {
    $('.mobile-links .active').removeClass('active');
}
$(document).keyup(function(e) {
    var top = parseInt($('body').css('top'), 10);
    if ((e.keyCode == 27) && (top != 0)) { // escape key maps to keycode 27
        e.preventDefault();
        closeAll();
        $(document).off("keyup");
    }
});
$('.menu-close').on('click',function() {
    closeAll();
});

// Animates skill bars
function animateExperience() {
    $('.experience .exp-bar').each(function() {
        var pct = $(this).attr('pct');
        $(this).children('.exp-width').css('width', pct + '%');
    });
}

// Sets waiting time for animation
setTimeout(function() {
    animateExperience();
}, 500);

// Display the active page in navbar
var primary = $('.underline:hover').css('color');
if (window.location.pathname.indexOf('about') != -1) {
    $('nav').find('.underline[href="/about"]').addClass('active');
} else if (window.location.pathname.indexOf('projects') != -1) {
    $('nav').find('.underline[href="/projects"]').addClass('active');
}
