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
            var down = document.body.scrollTop / (bodyHeight - window.innerHeight)
            // Parallax for background
            var img = document.querySelector('.underbg')
            var imgHeight = img.offsetHeight - window.innerHeight
            img.style.transform = 'translateY(-' + (imgHeight * down) + 'px)'
            // Z1 elements
            var block1 = document.querySelectorAll('.block-1')
            for (var i = 0; i < block1.length; i++) {
                var block1Height = block1[i].offsetHeight / 4
                block1[i].style.transform = 'translateY(-' + (block1Height * down) + 'px)'
            }
            // Z2 elements
            var block2 = document.querySelectorAll('.block-2')
            for (var idx = 0; idx < block2.length; idx++) {
                var block2Height = block2[idx].offsetHeight / 2
                block2[idx].style.transform = 'translateY(-' + (block2Height * down) + 'px)'
            }
        },
        backgroundHeight () {
            // Get the height of the user's window
            var windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
            // Select image
            var img = document.querySelector('.underbg')
            // Full document body height
            var bodyHeight = document.body.offsetHeight
            var imgHeight = bodyHeight - windowHeight
            // Maintain aspect ratio
            if (img.offsetWidth < document.body.offsetWidth) { // If the image width should ever exist less than document width
                img.style.width = '100%'
                img.style.height = 'auto'
            } else { // If the image height should ever exist less than document height
                if (img.offsetHeight < windowHeight) { // If the height of the image is smaller than the window's
                    img.style.width = 'auto'
                    img.style.height = '100%'
                } else { // If the height of the image is larger than the window's
                    img.style.width = 'auto'
                    img.style.height = (windowHeight + (imgHeight / 2)) + 'px'
                }
            }
        }
    },
    created () {
        window.addEventListener('scroll', this.parallax)
        window.addEventListener('resize', this.parallax)
        window.addEventListener('resize', this.backgroundHeight)
    },
    mounted () {
        this.parallax()
        this.backgroundHeight()
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
