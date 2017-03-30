<template>
    <div class="content">
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
    name: 'contact'
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
#app {
    .content {
        overflow-x: hidden;
    }
    section {
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
            min-height: 800 + $padding;
        }
        .right {
            margin-left: $padding;
            margin-right: -$padding;
            margin-bottom: $padding;
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
                textarea {
                    resize: vertical;
                }
            }
        }
    }
}
</style>
