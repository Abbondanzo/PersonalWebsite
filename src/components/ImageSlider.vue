<template>
    <div class="image-slider" @mousedown="startTrack" @mousemove="track" @mouseup="endTrack" @mouseleave="mouseDown=false">
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
                        var change = (100 * (e.clientX - cursor) / sliderWidth) + transform
                        img.style.transform = 'translateX(' + change + '%)'
                        // Set further image to proper position
                        if (change >= 50) {
                            var image = images[(current - 2 + images.length) % images.length]
                            image.style.transform = 'translateX(-50%)'
                        }
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
            })
            console.log(this.active)
            var left
            var right
            if (this.active === 0) {
                left = images[images.length - 1]
            } else {
                left = images[this.active - 1]
            }
            if (this.active + 1 === images.length) {
                right = images[0]
            } else {
                right = images[this.active + 1]
            }
            images[this.active].style.transform = 'translateX(0%)'
            left.style.transform = 'translateX(-100%)'
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
        }
    },
    mounted () {
        this.shiftPosition()
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
