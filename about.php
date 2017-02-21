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
?>
<!DOCTYPE HTML>
<html lang="en-us">
<!-- Code solely created by Peter V. Abbondanzo. Copyright 2017. All rights reserved. -->
<head>
	<title>About Me | Peter V. Abbondanzo</title>
	<?php require_once 'head.php'; ?>
</head>
<body class="about">
	<?php require_once 'navbar.php'; ?>
	<div class="content">
		<section class="about-info">
			<div class="left">
				<div class="valign">
					<div class="greeting">
						<h1>Hi,</h1>
						<h1>I'm Peter Abbondanzo</h1>
					</div>
				</div>
				<div class="experience">
					<h2>Experience</h2>
					<ul>
						<li>
							<h3>HTML5, CSS3</h3>
							<h4>Expert</h4>
							<span class="exp-bar" pct="97"><div class="exp-width"></div></span>
						</li>
						<li>
							<h3>jQuery</h3>
							<h4>Expert</h4>
							<span class="exp-bar" pct="92"><div class="exp-width"></div></span>
						</li>
						<li>
							<h3>Java, Python</h3>
							<h4>Advanced</h4>
							<span class="exp-bar" pct="82"><div class="exp-width"></div></span>
						</li>
					</ul>
				</div>
			</div><div class="right background-2">
				<div class="info-block">
					<h2>A Little Bit About Me...</h2>
					<p>
						Hi! I’m Peter Abbondanzo, <?php echo time_elapsed('1998-05-21 00:00:00'); ?>-year-old UI/UX designer of web and mobile applications. Currently, I am studying at <a href="http://www.northeastern.edu/" class="under" title="Northeastern">Northeastern University</a> up in Boston, Massachusetts. I’ve got a passion for creating, innovating, and coffee. I also run this small company called <a class="under" href="http://titusdesign.org/" title="Title Design">Titus&nbsp;Design</a> out of my dorm room.
					</p>
					<a href="http://abbondanzo.com/content/resume.pdf">
						<button class="btn">Résumé</button>
					</a>
				</div>
			</div>
		</section>
		<section id="contact" class="about-contact">
			<div class="left"></div>
			<div class="right"></div>
		</section>
	</div>
</body>
</html>
<?php require_once 'footer.php'; ?>
