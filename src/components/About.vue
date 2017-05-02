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
                <div class="experience block-1">
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
            </div><div class="right">
                <div class="info-block block-2">
                    <h2>A little bit about me...</h2>
                    <p>
                        Hi! I’m Peter Abbondanzo, {{ getAge() }}-year-old UI/UX designer of web and mobile applications. Currently, I am studying at <a href="http://www.northeastern.edu/" class="under" title="Northeastern">Northeastern University</a> up in Boston, Massachusetts. I’ve got a passion for creating, innovating, and coffee. I also run this small company called <a class="under" href="http://titusdesign.org/" title="Titus Design">Titus&nbsp;Design</a> out of my dorm room.
                        </p>
                    <a href="http://abbondanzo.com/content/resume.pdf">
                        <button title="View PDF resume" class="btn">Résumé</button>
                    </a>
                </div>
                <div class="background-2"></div>
            </div>
		</section>
		<section class="about-more">
			<div class="left">
                <div class="more-info-block">
                    <h2>... and what I do</h2>
                    <p>
                        I have experience with Adobe's Creative Suite, most commonly Photoshop, Illustrator, and InDesign. I utilize these programs in tandem with my background in computer science to build a wide variety of web and mobile applications (as those that can be seen <router-link class="under" :to="{ path: '/projects' }">here</router-link>).
                    </p>
                    <p>
                        I'm a full-stack developer, building applications from the ground, up. I strive to create perfection where others do not look.
                    </p>
                </div>
            </div><div class="right">
                <div class="valign">
                    <div class="contact-cta">
                        <h3>Send a message</h3>
                         <router-link :to="{ path: '/contact' }"><button class="btn">Contact Me</button></router-link>
                    </div>
                </div>
            </div>
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
                { name: 'Java, Python, PHP, Lisp', quality: 'Advanced', pct: '75' }
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
        position: relative;
        .left, .right {
            vertical-align: top;
            position: relative;
            .valign {
                min-height: 600px;
            }
        }
        .right {
            margin-left: $padding;
            margin-right: -$padding;
        }
        &.about-info {
            min-height: 800px;
            z-index: 2;
            .greeting {
                margin-top: $navbarheight + $padding;
                right: -$padding * 2;
            }
            .info-block {
                background: #fff;
                z-index: 3;
                position: absolute;
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
            .left, .right {
                min-height: 800px;
            }
            .greeting, .experience {
                width: $container/2 + $padding;
                position: absolute;
            }
            .experience {
                right: -$padding;
                background: $primary;
                z-index: 2;
                bottom: -$padding * 2;
                margin-right: -$padding;
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
            .background-2 {
                height: 100%;
                width: 100%;
                display: block;
                position: absolute;
                z-index: 0;
            }
        }
        &.about-more {
            z-index: 1;
            .left {
                background: #fff;
                color: $primary;
                z-index: 1;
            }
            .right {
                height: 100%;
            }
            .more-info-block, .contact-cta {
                width: $container/2 - $padding;
                padding: $padding;
                p {
                    line-height: 1.8;
                    font-size: 18px;
                    padding-bottom: $padding/2;
                    &:last-child {
                        padding-bottom: 0;
                    }
                }
                h3 {
                    color: #fff;
                    font-size: 48px;
                }
            }
            .contact-cta {
                margin: 0 auto;
                text-align: center;
            }
            .more-info-block {
                float: right;
                clear: both;
                padding-top: $padding*2;
            }
        }
    }
    @media screen and (max-width: 1440px) {
        section {
            &.about-info {
                .greeting, .experience, .info-block {
                    // width: 50%;
                }
                .greeting {
                    // padding-left: $padding;
                }
            }
        }
    }
    @media screen and (max-width: 1320px) {
            section {
                &.about-info .greeting {
                    right: 0;
                }
                .right {
                    margin-left: 0;
                }
            }
    }
    @media screen and (max-width: 1024px) {
        section {
            width: 100vw;
            .left, .right {
                width: 100%;
                display: block;
                margin-left: 0;
                margin-right: 0;
                min-height: 0!important;
                .valign {
                    min-height: 0!important;
                }
            }
            &.about-info {
                .info-block, .experience, .greeting {
                    width: 100%;
                    display: block;
                    position: relative;
                }
                .greeting {
                    margin-top: $navbarheight;
                    h1 {
                        text-align: center;
                    }
                }
                .info-block {
                    margin-left: 0;
                    margin-top: 0;
                }
                .experience {
                    bottom: 0;
                    right: 0;
                    float: none;
                }
                .left .valign {
                    height: 400px;
                }
                .block-1, .block-2 {
                    transform: translateY(0)!important;
                }
                .background-2 {
                    display: none;
                }
            }
            &.about-more {
                .more-info-block, .contact-cta {
                    padding-top: $padding;
                    width: 100%;
                }
                .more-info-block {
                    background: $bgcolor2;
                    float: none;
                    clear: none;
                    .under::after {
                        background: $bgcolor2;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        section {
            &.about-info, &.about-more {
                .info-block, .more-info-block, .contact-cta, .experience {
                    padding: 15%;
                }
                h1 {
                    font-size: 48px;
                }
            }
            &.about-more {

            }
        }
    }
}
</style>
