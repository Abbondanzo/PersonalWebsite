function closeItem() {
    // Animate exit
    $('.item-content').addClass('fade-out');
    $('.item-view').addClass('fade-out-up');
    // Wait until animations over
    setTimeout(function() {
        // Reset form container
        $('.contact-form').empty();
        // Allow scrolling on main page
        $('body').css('position','relative');
        // Return body
        var top = parseInt($('body').css('top'), 10) * -1;
        $('body').scrollTop(top);
        $('body').css('top', 0);
        // Reveal mobile menu close button
        $('.close-menu').css('display','block');
    }, 250);
}
// Close when hitting ESC key
$(document).keyup(function(e) {
    var top = parseInt($('body').css('top'), 10);
    if ((e.keyCode == 27) && (top != 0)) { // escape key maps to keycode 27
        e.preventDefault();
        closeItem();
        $(document).off("keyup");
    }
});
// Close "X" button
$('.contact-close').one('click',function() {
    closeItem();
});
// Close when clicking outside of window space
$('.item-content').on('click',function() {
    if(!$(event.target).closest('.item-view').length) {
        closeItem();
    }
});
