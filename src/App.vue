<template>
    <div id="app">
        <navbar></navbar>
        <transition name="slide" mode="out-in" :duration="500"><router-view></router-view></transition>
        <img class="underbg" src="static/bg.jpg">
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    components: { Navbar },
    name: 'app',
    methods: {
        parallax () {
            var bodyHeight = document.body.offsetHeight
            // "Percent" of page that has been scrolled through
            var down = document.body.scrollTop / bodyHeight
            // Parallax for background
            var img = document.querySelector('.underbg')
            var imgHeight = bodyHeight - img.offsetHeight
            img.style.transform = 'translateY(-' + (imgHeight * down) + 'px)'
            if (img.offsetHeight < bodyHeight) {
                img.style.height = bodyHeight + (imgHeight * down)
                img.style.width = 'auto'
            }
            // Z1 elements
            var block1 = document.querySelectorAll('.block-1')
            for (var i = 0; i < block1.length; i++) {
                var block1Height = block1[i].offsetHeight / 2
                block1[i].style.transform = 'translateY(-' + (block1Height * down) + 'px)'
            }
            // Z2 elements
            var block2 = document.querySelectorAll('.block-2')
            for (var idx = 0; idx < block2.length; idx++) {
                var block2Height = block2[idx].offsetHeight
                block2[idx].style.transform = 'translateY(-' + (block2Height * down) + 'px)'
            }
        }
    },
    created () {
        window.addEventListener('scroll', this.parallax)
    },
    mounted () {
        this.parallax()
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
        z-index: -1;
    }
}
</style>
