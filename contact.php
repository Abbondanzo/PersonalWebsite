<div class="contact-content valign-mid">
    <div class="contact-view container animate fade-in-up">
        <left>
            <h1>Hello, I'm Peter</h1>
            <span class="underscore-pls"></span>
            <p>I’m glad to hear that you’d like to get to know me further. The most effective means of reaching me is by <span class="responsive-right">using that form to the right</span><span class="responsive-down">scrolling down and using the form below</span>. However, I have, among other things, linked various social profiles below. In case one of those works better, feel free to use it. </p>
            <p>Need me to design your next mobile app or develop a new website? I am available for work.</p>
            <div class="skills">
                <img src="img/s1.png" title="PHP" alt="PHP"><img src="img/s2.png" title="JavaScript" alt="JavaScript"><img src="img/s3.png" title="CSS3" alt="CSS3"><img src="img/s4.png" title="React Native" alt="React Native">
            </div>
            <span class="underscore-pls underscore-mid"></span>
            <div class="social">
                <a href="https://twitter.com/pabbondanzo"><i class="fa fa-twitter" aria-hidden="true"></i>&nbsp;Twitter</a>
                <a href="https://github.com/Abbondanzo"><i class="fa fa-git" aria-hidden="true"></i>&nbsp;Github</a>
                <a href="https://www.linkedin.com/in/pabbondanzo"><i class="fa fa-linkedin" aria-hidden="true"></i>&nbsp;LinkedIn</a>
                <a href="https://www.behance.net/narwalshf41cf"><i class="fa fa-behance" aria-hidden="true"></i>&nbsp;Behance</a>
            </div>
        </left><right>
            <h1>Let’s get in touch</h1>
            <span class="underscore-pls"></span>
            <form name="form" method="post">
                <h4>Name</h4>
                <input type="text" name="name" class="input" required>
                <h4>Email</h4>
                <input type="email" name="email" class="input" required>
                <h4>Message</h4>
                <textarea type="text" rows="4" name="message" required></textarea>
                <i class="fa fa-times contact-close" aria-hidden="true"></i>
                <button type="submit" name="submit" value="Send Message" class="btn btn-white">Send Message</button>
            </form>
        </right>
    </div>
</div>
<script>
$("[name=name]").val($.cookie('name'));
$("[name=email]").val($.cookie('email'));
$('textarea').html($.cookie('message'));
$('textarea').on('keyup',function(){
    $.cookie('message',$(this).val(),{ expires: 7 });
});

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
    if(!$(event.target).closest('.contact-view').length) {
        closeAll();
    }
});
</script>
