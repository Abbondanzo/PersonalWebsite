function closeAll() {
    // Reset form container
    $('.contact-form').empty();
    // Allow scrolling on main page
    $('body').css('overflow','auto');
    // Reveal mobile menu close button
    $('.close-menu').css('display','block');
}
// Close when hitting ESC key
$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode 27
        closeAll();
    }
});
// Close "X" button
$('.contact-close').one('click',function() {
    closeAll();
});
// Close when clicking outside of window space
$(document).one('click',function() {
    if(!$(event.target).closest('.item-view').length) {
        closeAll();
    }
});
