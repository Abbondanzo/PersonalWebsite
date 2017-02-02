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
    $('.blink').css('margin-left', margin - width + 27);
    if(count < length) {
        setTimeout(function() {
            showWord(word, length, count+1, $html);
            //console.log(word,length,count);
        }, 100);
    } else {
        setTimeout(function() {
            $html.removeClass('active-text');
            animHello($html.index()+1);
        }, 1000);
    }
}

setTimeout(function() {
    animHello(0);
}, 1000);
