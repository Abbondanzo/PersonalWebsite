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
                            v-on:mouseover="projectCheck(index)">
                        {{ project.title }}
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
            img: require('../assets/img/bg.png'),
            projects: [
                 { title: 'Title 1' },
                 { title: 'Title 2' },
                 { title: 'Title 3' },
                 { title: 'Title 4' },
                 { title: 'Title 5' }
            ]
        }
    },
    methods: {
        projectCheck (arg) {
            const images =
                ['bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png']
            console.log(arg)
            this.img = require('../assets/img/' + images[arg])
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
    height: 100%;
    overflow: hidden;
    .left, .right {
        margin-right: $padding;
        margin-left: -$padding;
        position: relative;
    }
    .left {
        background: $bgcolor2;
        height: 100%;
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
                    margin-bottom: 1.5em;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    .right {
        z-index: 1;
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
