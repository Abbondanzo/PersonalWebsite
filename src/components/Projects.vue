<template>
    <div class="content">
        <section>
            <div class="left">
                <div class="project-list valign">
                    <ul>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
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
