<template>
    <div class="content">
        <section>
            <div class="left">
                <div class="project-list valign">
                    <ul>
                        <li @mouseover="project(1)">Project 1</li>
                        <li @mouseover="project(2)">Project 2</li>
                        <li @mouseover="project(3)">Project 3</li>
                        <li @mouseover="project(4)">Project 4</li>
                        <li @mouseover="project(5)">Project 5</li>
                        <li @mouseover="project(6)">Project 6</li>
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
            img: require('../assets/img/bg.png')
        }
    },
    methods: {
        project (arg) {
            const images =
                ['bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png']
            this.img = require('../assets/img/' + images[arg - 1])
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
