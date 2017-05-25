<template>
    <div class="image-slider" @mousedown="startTrack" @mousemove="track" @mouseup="endTrack" @mouseleave="endTrack">
        <div class="image"
        v-for="(image, index) in images"
        v-bind:index="index"
        v-bind:style="{ 'background-image': 'url(' + images[index] + ')' }">
        </div>
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
                var images = document.querySelectorAll('.image-slider .image')
                var pos = this.imagePos
                var cursor = this.cursorPos
                if (pos.length > 0) {
                    images.forEach(function (img) {
                        var idx = img.getAttribute('index')
                        var transform = parseInt(pos[idx])
                        var change = e.clientX - cursor + transform
                        img.style.transform = 'translateX(' + change + 'px)'
                    })
                }
            }
        },
        startTrack: function (e) {
            this.cursorPos = e.clientX
            this.setPositions()
            this.mouseDown = true
        },
        endTrack: function (e) {
            var movement = e.clientX - this.cursorPos
            if (movement < -100) {
                this.moveLeft()
            }
            this.mouseDown = false
            this.setPositions()
        },
        setPositions: function () {
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
        moveLeft: function () {
            var newActive = this.active - 1
            if (newActive >= this.images.length || newActive < 0) {
                newActive = (newActive + this.images.length) % this.images.length
            }
            this.active = newActive
            console.log(this.active)
        }
    },
    mounted () {
        console.log('image slider')
    }
}
</script>

<style lang="scss">
body {
    overflow-x: hidden;
}
.image-slider {
    height: 450px;
    cursor: move;
    overflow-x: hidden;
    .image {
        height: 450px;
        width: 50%;
        margin-left: -25%;
        background-size: cover;
        font-size: 0;
        display: inline-block;
        position: absolute;
    }
}
</style>
