<?php
error_reporting(0);
function time_elapsed($datetime, $full = false) {
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

	$time = $diff->y;
	if ($time == 18 || (80 <= $time && $time <= 89)) {
		$output = "an ".$time;
	} else {
		$output = "a ".$time;
	}
	return $output;
}

if(isset($_POST["submit"])) {
    // Checking For Blank Fields..
    if($_POST["name"]==""||$_POST["email"]==""||$_POST["message"]=="") {
        echo '<div class="success serr">Fill All Fields.</div>';
    } else {
        $name = $_POST["name"];
        // Check if the "Sender's Email" input field is filled out
        $email = $_POST['email'];
        // Sanitize E-mail Address
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        // Validate E-mail Address
        $email= filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$email) {
            echo '<div class="success serr">Invalid Email</div>';
        }
        else {
            $subject = "Contact Form from " . $name . " (IP: " . $_SERVER['REMOTE_ADDR'] . ")";
            $message = $_POST['message'];
            $headers = 'From:'. $email . "\r\n"; // Sender's Email
            $headers .= 'Cc:'. $email . "\r\n"; // Carbon copy to Sender
            // Message lines should not exceed 70 characters (PHP rule), so wrap it
            $message = wordwrap($message, 300);
            // Send Mail By PHP Mail Function
            mail("peter@abbondanzo.com", $subject, $message, $headers);
            echo '<div class="success sdone">Your mail has been sent successfully! We will be in touch soon</div>';
        }
    }
}
?>
<!DOCTYPE HTML>
<html lang="en-us">
<!-- Code solely created by Peter V. Abbondanzo. Copyright 2016. All rights reserved. -->
<!-- Fun facts: This is the third version of my personal website. The second grew old so I chose 1:31am as the proper time to start. -->
<!-- At this very moment, I'm in the middle of a predicament. Do I go for Lucky Charms or Cinnamon Toast Crunch? -->
<head>
	<title>Peter V. Abbondanzo | Web &amp; Mobile Developer</title>
	<meta name="description" content="I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made.">
	<meta name="keywords" content="graphic designer,design,developer,develop,code,css,html,photoshop,peter,abbondanzo,peter abbondanzo,website,photoshop,ui,ui designer,ui developer,graphic,graphics">
	<meta content="text/html; charset=UTF-8" http-equiv="content-type" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="favicon.ico">
	<link rel="stylesheet" href="css/style.css">
	<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
	<script src="js/jquery.c.min.js" type="text/javascript"></script>
	<script src="js/analytics.js" type="text/javascript"></script>
	<script src="js/modernizr.min.js" type="text/javascript"></script>
	<script src="js/packery.min.js" type="text/javascript"></script>
	<script src="js/script.min.js" type="text/javascript"></script>
</head>
<body>
	<nav class="nav resting">
		<div class="container">
			<div class="logo"><a href="#scene"><img height="60" title="Abbondanzo" src="img/logo.png" /></a></div>
			<div class="nav-links">
				<ul>
					<li class="underline menu-home">
						<a href="#scene">Home</a>
					</li>
					<li class="underline">
						<a href="#work">Works</a>
					</li>
					<li class="underline">
						<a class="contact-button">Contact</a>
					</li>
					<li>
						<a href="https://github.com/Abbondanzo"><i class="fa fa-github" aria-hidden="true"></i></a>
					</li>
					<li>
						<a href="https://twitter.com/pabbondanzo"><i class="fa fa-twitter" aria-hidden="true"></i></a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/pabbondanzo"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
					</li>
					<li class="underline">
						<a class="btn btn-white" target="_blank" href="content/resume.pdf">Résumé</a>
					</li>
				</ul>
			</div>
		</div>
        <div class="mobile-head">
            <div class="logo"><a href="#scene"><img style="padding:20px;height:90px;" height="90" title="Abbondanzo" src="img/logo.png" /></a></div>
            <div class="icon">
                <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
        </div>
        <div class="mobile">
            <span><i class="fa fa-times close-menu" aria-hidden="true"></i></span>
            <ul>
                <li>
                    <a href="#work">Works</a>
                </li>
                <li>
                    <a class="contact-button">Contact</a>
                </li>
                <li>
                    <a href="https://github.com/Abbondanzo">Github</a>
                </li>
                <li>
                    <a href="https://twitter.com/pabbondanzo">Twitter</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/pabbondanzo">LinkedIn</a>
                </li>
                <li>
                    <a target="_blank" href="content/resume.pdf">Résumé</a>
                </li>
            </ul>
        </div>
	</nav>
    <div class="contact-form">
    </div>
    <div class="content" id="scene">
        <div class="notice">
            <a href="https://github.com/Abbondanzo/PersonalWebsite/tree/master"><p>Notice: This site is currently outdated. A new page is being constructed to treat all deprecations. </p></a>
        </div>
		<div id="particles-js" class="header layer" data-depth="0.2">
			<div class="container valign-mid">
				<div class="header-content animate fade-in-up layer" data-depth="0.4">
					<h1>Peter V. Abbondanzo</h1>
					<h2>Web &amp; Mobile Developer</h2>
                    <br>
					<a href="#about"><button class="btn btn-large">About Me</button></a>
				</div>
			</div>
		</div>
		<div id="about">
			<div class="container">
				<left class="half-block">
					<img style="margin-bottom:-5px;" src="img/photo.png">
				</left><right class="animated fade-in-up half-block sect-title">
					<h3>About Me</h3>
					<span class="underscore-pls"></span>
					<p>Hi! I’m Peter Abbondanzo, <?php echo time_elapsed('1998-05-21 00:00:00'); ?>-year-old UI/UX designer of web and mobile applications. Currently, I am studying at <a href="http://www.northeastern.edu/" title="Northeastern">Northeastern University</a> up in Boston, Massachusetts. I’ve got a passion for creating, innovating, and coffee. I also run this small company called <a href="http://titusdesign.org/" title="Title Design">Titus&nbsp;Design</a> out of my dorm room. </p>
					<div style="text-align: center;">
						<a target="_blank" href="content/resume.pdf"><button class="btn">Résumé</button></a><span class="button-spacer"></span><button class="btn btn-invert contact-button">Contact</button>
					</div>
				</right>
			</div>
		</div>
		<div id="work" class="info-section">
			<div class="container">
                <div style="padding-bottom:3em;" class="sect-title">
					<h3>Works</h3>
					<span class="underscore-pls"></span>
				</div>
                <div class="grid">
                    <div class="grid-item animated fade-in-up item-cafe">
                        <img src="img/200x200/bvc.png">
                        <div class="grid-info">
                            <h1>Bonne Vie Café</h1>
                        </div>
                    </div>
                    <div class="grid-item animated fade-in-up item-rogue">
                        <img src="img/200x200/rogue.png">
                        <div class="grid-info">
                            <h1>Rogue</h1>
                        </div>
                    </div>
                    <div class="grid-item grid-item--width2 grid-item--height2 animated fade-in-up item-feedshare">
                        <img src="img/420x420/feedshare.png">
                        <div class="grid-info">
                            <h1>FeedShare</h1>
                        </div>
                    </div>
                    <div class="grid-item grid-item--width2 animated fade-in-up item-flipster">
                        <img src="img/420x200/flipster.png">
                        <div class="grid-info">
                            <h1>Flipster</h1>
                        </div>
                    </div>
                    <div class="grid-item grid-item--width2 grid-item--height2 animated fade-in-up item-myneu">
                        <img src="img/420x420/myneu.png">
                        <div class="grid-info">
                            <h1>Modern MyNEU</h1>
                        </div>
                    </div>
                    <div class="grid-item grid-item--width2 grid-item--height2 animated fade-in-up item-sthacks">
                        <img src="img/420x420/sth.png">
                        <div class="grid-info">
                            <h1>Sthacks</h1>
                        </div>
                    </div>
                </div>
			</div>
		</div>
        <div id="cta">
            <div class="container">
                <h1>Let's get in touch</h1>
                <a class="btn btn-white contact-button">Contact Me</a>
            </div>
        </div>
        <div id="footer">
            <div class="container">
                <div style="text-align:center;">
                    <a href="#scene"><img height="60" title="Abbondanzo" src="img/logo.png" /></a>
                </div>
                <div class="footer-social">
                    <ul>
                        <li><a href="https://twitter.com/pabbondanzo">Twitter</a></li>
                        <li><a href="https://github.com/Abbondanzo">Github</a></li>
                        <li><a href="https://www.linkedin.com/in/pabbondanzo">LinkedIn</a></li>
                        <li><a href="https://www.behance.net/narwalshf41cf">Behance</a></li>
                    </ul>
                </div>
                <p>Copyright &copy; <?php echo date("Y"); ?> abbondanzo.com</p>
            </div>
        </div>
    </div>
</body>
<script src="js/particles.min.js" type="text/javascript"></script>
<script src="js/footer.min.js"></script>
</html>
