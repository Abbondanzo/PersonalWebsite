<template>
    <div class="image-slider" @mousedown="startTrack" @mousemove="track" @mouseup="endTrack" @mouseleave="mouseDown=false">
        <div class="image"
        v-for="(image, index) in images"
        v-bind:index="index"
        v-bind:style="{ 'background-image': 'url(' + images[index] + ')' }">
        </div>
        <i class="fa fa-chevron-left" aria-hidden="true" v-on:click="moveRight"></i>
        <i class="fa fa-chevron-right" aria-hidden="true" v-on:click="moveLeft"></i>
    </div>
</template>

<script>
export default {
    name: 'image-slider',
    data: function () {
        return {
            active: 0,
            cursorPos: 0,
            mouseDown: false,
            imagePos: []
        }
    },
    props: {
        autoScroll: {
            type: String,
            default: true
        },
        delay: {
            type: Number,
            default: 3000
        },
        images: {
            type: Array,
            required: false
        }
    },
    methods: {
        track: function (e) {
            if (this.mouseDown) {
                var sliderWidth = document.querySelector('.image-slider').offsetWidth
                var images = document.querySelectorAll('.image-slider .image')
                var pos = this.imagePos
                var cursor = this.cursorPos
                if (pos.length > 0) {
                    var current = this.active
                    images.forEach(function (img) {
                        var idx = img.getAttribute('index')
                        var transform = parseFloat(pos[idx])
                        // Percentage-based change
                        var change = (100 * (e.clientX - cursor) / sliderWidth)
                        img.style.transform = 'translateX(' + (change + transform) + '%)'
                        // Set further image to proper position
                        var farLeftImage = images[(current - 2 + images.length) % images.length]
                        farLeftImage.style.transform = 'translateX(' + (-200 + change) + '%)'
                        var farRightImage = images[(current + 2) % images.length]
                        farRightImage.style.transform = 'translateX(' + (200 + change) + '%)'
                    })
                }
            }
        },
        startTrack: function (e) {
            e.preventDefault()
            this.cursorPos = e.clientX
            this.setState()
            this.mouseDown = true
        },
        endTrack: function (e) {
            var movement = e.clientX - this.cursorPos
            if (movement < -100) {
                this.moveLeft()
                this.setState()
            } else if (movement > 100) {
                this.moveRight()
                this.setState()
            } else {
                this.shiftPosition()
            }
            this.mouseDown = false
        },
        setState: function () {
            // Stored as percentages
            var positions = []
            var images = document.querySelectorAll('.image-slider .image')
            images.forEach(function (img) {
                var transform
                if (img.style.transform) {
                    transform = img.style.transform.split(/[()]/)[1]
                } else {
                    transform = 0
                }
                positions.push(transform)
            })
            this.imagePos = positions
        },
        shiftPosition: function () {
            var images = document.querySelectorAll('.image-slider .image')
            // "Hide" all images
            images.forEach(function (img) {
                img.style.transform = 'translateX(-200%)'
                img.style.opacity = '0.5'
                img.style.zIndex = '1'
            })
            var left
            var right
            if (this.active === 0) {
                left = images[images.length - 1]
            } else {
                left = images[this.active - 1]
            }
            if (this.active + 1 === images.length) {
                right = images[0]
                right.style.transform = 'translateX(200%)'
            } else {
                right = images[this.active + 1]
            }
            var animatedImages = [images[this.active], left, right]
            this.animated(animatedImages)
            left.style.transform = 'translateX(-100%)'
            images[this.active].style.transform = 'translateX(0%)'
            images[this.active].style.opacity = '1'
            right.style.transform = 'translateX(100%)'
            this.setState()
        },
        moveLeft: function () {
            var newActive = this.active + 1
            if (newActive >= this.images.length) {
                newActive = (newActive + this.images.length) % this.images.length
            }
            this.active = newActive
            this.shiftPosition()
        },
        moveRight: function () {
            var newActive = this.active - 1
            if (newActive < 0) {
                newActive = (newActive + this.images.length) % this.images.length
            }
            this.active = newActive
            this.shiftPosition()
        },
        animated: function (images) {
            // "Hide" all images
            images.forEach(function (img) {
                img.className += ' animated'
                img.style.zIndex = '2'
                setTimeout(function () {
                    img.className = img.className.split(' animated')[0]
                }, 1000)
            })
        }
    },
    mounted () {
        this.shiftPosition()
    }
}
</script>

<style lang="scss">
@import '../assets/styles/global';
body {
    overflow-x: hidden;
}
.image-slider {
    height: 450px;
    cursor: move;
    overflow-x: hidden;
    position: relative;
    .image {
        height: 450px;
        width: 50%;
        margin-left: -25%;
        background-size: cover;
        font-size: 0;
        display: inline-block;
        position: absolute;
        &.animated {
            @include transition(all $anim * 2 $ease-out-quint)
        }
    }
    i {
        position: absolute;
        top: 50%;
        font-size: 36px;
        cursor: pointer;
        z-index: 3;
        @include transform ( translateY(-50%) );
        &.fa-chevron-left {
            left: 12.5%;
        }
        &.fa-chevron-right {
            right: 12.5%;
        }
    }
}
</style>
