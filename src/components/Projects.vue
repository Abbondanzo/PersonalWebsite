<template>
    <div class="content">
        <section>
            <div class="left">
                <div class="project-list valign">
                    <ul>
                        <li v-bind:index="0" @mouseover="project">Project 1</li>
                        <li v-bind:index="1" @mouseover="project">Project 2</li>
                        <li v-bind:index="2" @mouseover="project">Project 3</li>
                        <li v-bind:index="3" @mouseover="project">Project 4</li>
                        <li v-bind:index="4" @mouseover="project">Project 5</li>
                        <li v-bind:index="5" @mouseover="project">Project 6</li>
                    </ul>
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
        project (event) {
            console.log(event)
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
            }
        }
    }
    .right {
        z-index: 1;
    }
}
</style>
