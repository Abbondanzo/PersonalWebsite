function closeAll() {
    // Reset form container
    $('.contact-form').empty();
    // Allow scrolling on main page
    $('body').css('overflow','auto');
    // Reveal mobile menu close button
    $('.close-menu').css('display','block');
}
$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode 27
        closeAll();
    }
});
$('.contact-close').one('click',function() {
    closeAll();
});
$(document).one('click',function() {
    if(!$(event.target).closest('.item-view').length) {
        closeAll();
    }
});
