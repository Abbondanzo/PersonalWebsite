<template>
    <div class="content">
        <section>
            <div class="left">
                <div class="project-list valign">
                    <ul>
                        <h2>Recent Projects</h2>
                        <li v-for="(project, index) in projects"
                            v-bind:item="project"
                            v-bind:index="index"
                            v-bind:class="isActive(index)"
                            v-on:click="projectCheck(index)">
                            <span>0{{ index + 1 }}</span> <h3>{{ project.title }}</h3>
                        </li>
                    </ul>
                </div>
                <div class="popup info-block">
                    <p>Want to see the code behind these projects? Check out my Github profile at <a class="under" target="_blank" title="Github Profile" href="https://github.com/Abbondanzo">this link</a>.</p>
                </div>
            </div><div class="right">
                <img v-bind:src="img" />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'projects',
    data () {
        return {
            img: require('../assets/img/fullbvc.png'),
            activeProject: 0,
            projects: [
                 { title: 'Bonne Vie Cafe' },
                 { title: 'Rogue' },
                 { title: 'FeedShare' },
                 { title: 'Flipster' },
                 { title: 'Sthacks' },
                 { title: 'Modern MyNEU' },
                 { title: 'Titus Design' }
            ],
            images: [
                'fullbvc.png',
                'fullrogue.png',
                'fullrogue.png',
                'fullflipster.png',
                'fullsth.png',
                'myneu.jpg',
                'myneu.jpg'
            ]
        }
    },
    methods: {
        projectCheck (arg) {
            console.log(arg)
            this.activeProject = arg
            var newImg = require('../assets/img/' + this.images[arg])
            console.log()
            this.$nextTick(function () {
                this.img = newImg
            })
        },
        isActive (arg) {
            if (arg === this.activeProject) {
                return {
                    active: 'active'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
.content {
    height: 100vh;
}
section {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: table;
    table-layout: fixed;
    .left, .right {
        position: relative;
        display: table-cell;
        font-size: 0;
    }
    .left {
        background: $bgcolor2;
        height: 100%;
        margin-right: $padding;
        margin-left: -$padding;
        padding-top: $navbarheight;
        z-index: 2;
        .project-list {
            margin-right: -$padding;
            margin-left: $padding * 2;
            ul {
                list-style: none;
                padding: $padding;
                background: #fff;
                li {
                    cursor: pointer;
                    margin-bottom: 24px;
                    line-height: 36px;
                    margin-left: $padding / 2;
                    h3, span {
                        display: inline-block;
                        vertical-align: bottom;
                    }
                    h3 {
                        font-size: 24px;
                        font-weight: 600;
                        color: $textcolor2;
                        @include transition( all $anim / 2 $ease-out-quint );
                    }
                    span {
                        color: $primary;
                        font-size: 14px;
                        line-height: 36px;
                    }
                    &:hover, &.active {
                        h3 {
                            font-size: 32px;
                            color: $primary;
                        }
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    .right {
        z-index: 1;
	    img {
            height: 100vh;
            @include transition( all $anim $ease-out-quint );
        }
    }
    .info-block {
        background: $primary;
        padding: $padding / 2;
        position: absolute;
        bottom: 10px;
        left: 90%;
        min-width: 200px;
        width: 320px;
        p {
            color: #fff;
            font-size: 14px;
        }
        .under {
            color: #fff;
            &::before {
                background: #fff;
            }
            &::after {
                background: $primary;
            }
        }
    }
}
</style>
