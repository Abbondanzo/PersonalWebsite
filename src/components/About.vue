<template>
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
						Hi! I’m Peter Abbondanzo, {{ getAge() }}-year-old UI/UX designer of web and mobile applications. Currently, I am studying at <a href="http://www.northeastern.edu/" class="under" title="Northeastern">Northeastern University</a> up in Boston, Massachusetts. I’ve got a passion for creating, innovating, and coffee. I also run this small company called <a class="under" href="http://titusdesign.org/" title="Titus Design">Titus&nbsp;Design</a> out of my dorm room.
					</p>
					<a href="http://abbondanzo.com/content/resume.pdf">
						<button title="View PDF resume" class="btn">Résumé</button>
					</a>
				</div>
			</div>
		</section>
		<section id="contact" class="about-contact">
			<div class="left">
                <div class="contact-form">
                    <h2>Contact Me</h2>
                    <form>
                        <h4>Name</h4>
                        <input type="text" name="name" class="input" required>
                        <h4>Email</h4>
                        <input type="email" name="email" class="input" required>
                        <h4>Message</h4>
                        <textarea type="text" rows="4" name="message" required></textarea>
                        <button type="submit" name="submit" value="Send Message" class="btn">Send Message</button>
                    </form>
                </div>
            </div>
			<div class="right"></div>
		</section>
	</div>
</template>

<script>

export default {
    name: 'About',
    methods: {
        getAge: function () {
            var bday = new Date('1998-05-21').getTime()
            var today = new Date().getTime()
            var age = Math.floor((today - bday) / 1000 / 60 / 60 / 24 / 365.25)
            if (age === 18 || (age >= 80 && age <= 89)) {
                return 'an ' + age
            } else {
                return 'a ' + age
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/global';
#app {
    h1 {
        color: #fff;
        font-size: 72px;
    }
    h2 {
        color: #2a2a2a;
        font-size: 32px;
        padding-bottom: $padding/2;
    }
    h4 {
        font-size: 14px;
        font-weight: 300;
    }
    .content {
        overflow: hidden;
    }
    section {
        .left, .right {
            display: inline-block;
            width: 50%;
            min-height: 800px;
            vertical-align: top;
            position: relative;
            z-index: 2;
            .valign {
                min-height: 500px;
            }
        }
        .left {
            min-height: 800 + $padding;
        }
        .right {
            margin-left: $padding;
            margin-right: -$padding;
            margin-bottom: $padding;
        }
        .greeting {
            margin-top: $navbarheight;
        }
        .info-block {
            background: #fff;
            margin-top: $navbarheight;
            margin-left: -$padding;
            padding: $padding;
            width: $container/2;
            p {
                line-height: 1.8;
                padding-bottom: $padding/2;
            }
            a.under {
                position: relative;
                padding-bottom: 6px;
                &::before, &::after {
                    content: "";
                    position: absolute;
                    background: $primary;
                    left: 0;
                    right: 0;
                    margin-top: 2px;
                    bottom: 0;
                    height: 4px;
                }
                &::after {
                    background: #fff;
                    position: relative;
                    left: -80px;
                    right: 100%;
                }
                &:hover {
                    &::after {
                        position: absolute;
                        pointer-events: none;
                        left: 100%;
                        right: -80px;
                        transition: all $anim*1.5;
                    }
                }
            }
        }
        h1, .experience {
            width: $container/2 + $padding;
            float: right;
            clear: both;
        }
        .experience {
            background: $primary;
            position: absolute;
            bottom: 0;
            right: -$padding;
            color: #fff;
            padding: $padding;
            ul {
                list-style: none;
                li {
                    overflow: auto;
                    position: relative;
                    margin-bottom: 24px;
                    padding-bottom: 18px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    h3 {
                        font-size: 18px;
                        float: left;
                        clear: both;
                        font-weight: 300;
                    }
                    h4 {
                        font-size: 12px;
                        float: right;
                        opacity: 0.8;
                    }
                    span.exp-bar {
                        height: 4px;
                        width: 100%;
                        background: darken($primary, 20);
                        display: block;
                        position: absolute;
                        bottom: 0;
                        .exp-width {
                            transition: width $anim*4;
                            width: 0%;
                            height: 100%;
                            background: #fff;
                        }
                    }
                }
            }
        }
        &.about-contact {
            margin-top: -$padding;
            .left {
                background: #fff;
                color: $primary;
                z-index: 1;
            }
            .right {
                float: right;
            }
            .contact-form {
                width: $container/2 - $padding;
                float: right;
                clear: both;
                padding: $padding;
                padding-top: $padding*2;
                input, textarea {
                    width: 100%;
                    padding-top: 40px;
                    margin-bottom: 20px;
                	background: transparent;
                	border: 0;
                	border-bottom: 3px solid $primary;
                	width: 100%;
                	font-size: 18px;
                }
            }
        }
    }
}
</style>
