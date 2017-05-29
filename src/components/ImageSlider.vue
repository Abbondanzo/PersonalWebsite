<template>
    <div class="image-slider" @mousedown="startTrack" @mousemove="track" @mouseup="endTrack" @mouseleave="mouseDown=false">
        <div class="image-wrapper">
            <div class="image"
            v-for="(image, index) in images"
            v-bind:index="index"
            v-bind:style="{ 'background-image': 'url(' + images[index] + ')',
            'transform': 'translateX(' + (index * 100) + '%)' }">
            </div>
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
            imagePos: 0
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
                var wrapper = document.querySelector('.image-wrapper')
                var cursor = this.cursorPos
                // Percentage-based change
                var change = (100 * (e.clientX - cursor) / sliderWidth)
                var currentPos = parseFloat(this.imagePos)
                wrapper.style.transform = 'translateX(' + (change + currentPos) + '%)'
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
            // Stored as percentage
            var wrapper = document.querySelector('.image-wrapper')
            var position = wrapper.style.transform.split(/[(%)]/)[1]
            if (!position) {
                position = 0
            }
            this.imagePos = position
        },
        shiftPosition: function () {
            this.updateActive()
            var wrapper = document.querySelector('.image-wrapper')
            wrapper.className += ' animated'
            var shift = -(this.active / 2) * 100
            // "Hide" all images
            wrapper.style.transform = 'translateX(' + (shift) + '%)'
            // TODO: Fix timing issue when multiple shifts happen in under 0.5s
            setTimeout(function () {
                wrapper.className = wrapper.className.split(' animated')[0]
            }, 500)
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
        updateActive: function () {
            var images = document.querySelectorAll('.image-slider .image')
            var current = this.active
            images.forEach(function (img) {
                var idx = parseInt(img.getAttribute('index'))
                console.log(idx, current)
                if (idx === current) {
                    img.className = 'image active'
                } else {
                    img.className = 'image'
                }
            })
        }
    },
    mounted () {
        this.updateActive()
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
    .image-wrapper.animated {
        @include transition(all $anim * 2 $ease-out-quint)
    }
    .image {
        height: 450px;
        width: 50%;
        margin-left: -25%;
        background-size: cover;
        opacity: 0.5;
        font-size: 0;
        display: inline-block;
        position: absolute;
        @include transition(opacity $anim * 2 $ease-out-quint)
        &.active {
            opacity: 1;
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
