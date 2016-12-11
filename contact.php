<div class="contact-content">
    <div class="container animate fade-in-up">
        <left>
            <h1>Hello, I'm Peter</h1>
            <span class="underscore-pls"></span>
            <p>I’m glad to hear that you’d like to get to know me further. The most effective means of reaching me is by <span class="responsive-right">using that form to the right</span><span class="responsive-down">scrolling down and using the form below</span>. However, I have, among other things, linked various social profiles below. In case one of those works better, feel free to use it. </p>
            <p>Need me to design your next mobile app or develop a new website? I am available for work.</p>
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
$('.contact-close').on('click',function() {
    $('.contact-form').empty();
    $('body').css('overflow','auto');
    $('.close-menu').css('display','block');
});
</script>
