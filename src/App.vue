<template>
    <div id="app">
        <navbar></navbar>
        <router-view></router-view>
        <img class="underbg" src="static/bg.jpg">
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    components: { Navbar },
    name: 'app',
    props: ['_show'],
    methods: {
        parallax () {
            var bodyHeight = document.body.offsetHeight
            var down = document.body.scrollTop / bodyHeight
            var img = document.querySelector('.underbg')
            var imgHeight = bodyHeight - img.offsetHeight
            console.log(imgHeight * down)
            img.style.transform = 'translateY(-' + (imgHeight * down) + 'px)'
        }
    },
    created () {
        window.addEventListener('scroll', this.parallax)
    }
}
</script>

<style lang="scss" src="./assets/styles/style.scss"></style>
<style lang="scss">
body {
    background: url('./assets/img/bg.jpg') top left no-repeat;
    background-size: cover;
    background-attachment: fixed;
    overflow-y: scroll;
    .underbg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
}
</style>
