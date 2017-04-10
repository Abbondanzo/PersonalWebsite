<template>
    <div class="content">
        <section id="contact" class="about-contact">
			<div class="left">
                <div class="text-block">
                    <h2>Let's Chat!</h2>
                    <p>
                        Fill out that beautiful form to the right and we'll get in touch! Or, if email is too outdated for you to use, I've linked several social media profiles below. I love posting about my projects on Twitter, and I keep the LinkedIn fresh with all sorts of content. Use whatever floats your boat.
                    </p>
                    <a v-for="(social, index) in socials" v-bind:index="index" v-bind:href="social.url" target="_blank">
                        <button class="btn btn-square"><i class="fa" v-bind:class="social.icon" aria-hidden="true"></i></button>
                    </a>
                </div>
            </div><div class="right">
                <div class="contact-form">
                    <h2>Contact Me</h2>
                    <form>
                        <h4>Name</h4>
                        <input type="text" name="name" class="input" required>
                        <h4>Email</h4>
                        <input type="email" name="email" class="input" required>
                        <h4>Message</h4>
                        <textarea type="text" rows="4" name="message" required></textarea>
                        <button type="submit" name="submit" value="Send Message" class="btn btn-white">Send Message</button>
                    </form>
                </div>
            </div>
		</section>
    </div>
</template>

<script>
export default {
    name: 'contact',
    data () {
        return {
            socials: [
                { name: 'Twitter', url: 'https://twitter.com/PAbbondanzo', icon: 'fa-twitter' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pabbondanzo', icon: 'fa-linkedin' },
                { name: 'Github', url: 'https://github.com/Abbondanzo', icon: 'fa-github' }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
#app {
    .content {
        overflow-x: hidden;
    }
    section {
        height: 100vh;
        .left, .right {
            min-height: 800px;
            vertical-align: top;
            position: relative;
            z-index: 2;
            .valign {
                min-height: 500px;
            }
        }
        .left {
            height: 100%;
            min-height: 800 + $padding;
        }
        .right {
            margin-bottom: $padding;
        }
        &.about-contact {
            .left {
                background: #fff;
                color: $primary;
                z-index: 1;
            }
            .text-block {
                width: $container/2;
                float: right;
                clear: both;
                padding: $padding;
                padding-top: $padding*2;
                padding-right: $padding*2;
                p {
                    line-height: 1.8;
                    font-size: 18px;
                    padding-bottom: $padding/2;
                    &:last-child {
                        padding-bottom: 0;
                    }
                }
                a {
                    margin-right: 0.5em;
                    i {
                        font-size: 28px;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            .contact-form {
                width: $container/2 - $padding;
                padding: $padding;
                margin-top: $navbarheight;
                background: $primary;
                position: absolute;
                left: -$padding;
                h4 {
                    color: #fff;
                }
                input, textarea {
                    width: 100%;
                    padding-top: 40px;
                    margin-bottom: 20px;
                	background: transparent;
                	border: 0;
                	border-bottom: 3px solid #fff;
                	width: 100%;
                	font-size: 18px;
                    font-family: 'Montserrat', sans-serif;
                    color: #fff;
                    -webkit-box-shadow: 0 0 0px 1000px $primary inset;
                	-webkit-text-fill-color: white !important;
                }
                textarea {
                    resize: vertical;
                }
            }
        }
    }
    @media screen and (max-width: 1440px) {
        section {
            &.about-contact {
                .text-block {
                    width: 100%;
                    padding-right: $padding;
                    background: #fff;
                }
                .contact-form {
                    width: 100%;
                    left: 0;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        section {
            .left, .right {
                width: 100%;
                min-height: inherit;
            }
        }
    }
}
</style>
