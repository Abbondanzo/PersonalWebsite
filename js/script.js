// Animations "Hello, you found me." intro
function animHello() {
    $('.hello-text h1').each(function() {
        var i = 0;
        var content = $(this).html();
        var length = content.length;
        while (i < length) {
            setTimeout(function() {
                $(this).html('<span>'+content.slice(0, i)+'</span>'+content.slice(i, length));
            }, 10000);
            i++;
        }
    })
}
animHello();
