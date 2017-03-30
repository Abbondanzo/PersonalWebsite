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
                    <transition appear v-on:after-appear="afterEnter">
                        <ul>
                            <li v-for="(skill, index) in skills"
                                v-bind:index="index">
                                <h3>{{ skill.name }}</h3>
                                <h4>{{ skill.quality }}</h4>
                                <span class="exp-bar"><div v-bind:style="{ width: baseWidths[index].width + '%' }" class="exp-width"></div></span>
                            </li>
    					</ul>
                    </transition>
				</div>
			</div><div class="right background-2">
				<div class="info-block">
					<h2>A little bit about me...</h2>
					<p>
						Hi! I’m Peter Abbondanzo, {{ getAge() }}-year-old UI/UX designer of web and mobile applications. Currently, I am studying at <a href="http://www.northeastern.edu/" class="under" title="Northeastern">Northeastern University</a> up in Boston, Massachusetts. I’ve got a passion for creating, innovating, and coffee. I also run this small company called <a class="under" href="http://titusdesign.org/" title="Titus Design">Titus&nbsp;Design</a> out of my dorm room.
					</p>
					<a href="http://abbondanzo.com/content/resume.pdf">
						<button title="View PDF resume" class="btn">Résumé</button>
					</a>
				</div>
			</div>
		</section>
		<section class="about-more">
			<div class="left">
                <div class="more-info-block">
                    <h2>... and what to expect</h2>
                    <p>
                        I’ve been creating art before I could even walk on two feet. Since then, I have been designing graphics and developing websites for clients across the globe. When I could still count my age on two hands, I fancied myself to endless access of Adobe’s wonderful Photoshop, Illustrator, and InDesign; programs that I continue to use today.
                    </p>
                    <p>
                        My most incredible asset is my ability to work with
                        others to achieve a common goal. I continuously work
                        to develop my leadership skills in the working
                        environment. I strive to create perfection where others
                        do not look.
                    </p>
                </div>
            </div>
			<div class="right"></div>
		</section>
	</div>
</template>

<script>

export default {
    name: 'About',
    data () {
        return {
            skills: [
                { name: 'HTML5, CSS3', quality: 'Expert', pct: '97' },
                { name: 'jQuery/JS', quality: 'Expert', pct: '87' },
                { name: 'Java, Python', quality: 'Advanced', pct: '75' }
            ],
            baseWidths: [
                { width: 0 },
                { width: 0 },
                { width: 0 }
            ]
        }
    },
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
        },
        afterEnter: function () {
            for (var i = 0; i < this.baseWidths.length; i++) {
                this.baseWidths[i].width = this.skills[i].pct
            }
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
        .left, .right {
            vertical-align: top;
            position: relative;
            z-index: 2;
            .valign {
                min-height: 500px;
            }
        }
        .right {
            margin-left: $padding;
            margin-right: -$padding;
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
                font-size: 18px;
                padding-bottom: $padding/2;
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
            bottom: -$padding;
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
        &.about-info {
            .left, .right {
                min-height: 800px;
            }
        }
        &.about-more {
            .left {
                background: #fff;
                color: $primary;
                z-index: 1;
            }
            .right {
                float: right;
            }
            .more-info-block {
                width: $container/2 - $padding;
                float: right;
                clear: both;
                padding: $padding;
                padding-top: $padding*2;
                p {
                    line-height: 1.8;
                    font-size: 18px;
                    padding-bottom: $padding/2;
                    &:last-child {
                        padding-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>
