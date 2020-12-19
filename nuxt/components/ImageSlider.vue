<template>
  <div
    class="image-slider"
    @mousedown="startTrack"
    @mousemove="track"
    @mouseup="endTrack"
    @mouseleave="mouseDown = false"
  >
    <div class="image-wrapper">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image"
        :index="index"
        :style="{
          'background-image': 'url(' + images[index] + ')',
          transform: 'translateX(' + index * 100 + '%)',
        }"
      />
    </div>
    <i class="fa fa-chevron-left" aria-hidden="true" @:click="moveRight"></i>
    <i class="fa fa-chevron-right" aria-hidden="true" @:click="moveLeft"></i>
  </div>
</template>

<script>
export default {
  name: 'ImageSlider',
  props: {
    autoScroll: {
      type: String,
      default: 'true',
    },
    delay: {
      type: Number,
      default: 3000,
    },
    images: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      active: 0,
      cursorPos: 0,
      mouseDown: false,
      imagePos: 0,
    }
  },
  mounted() {
    this.updateActive()
  },
  beforeMount() {
    window.addEventListener('resize', this.updateActive())
  },
  methods: {
    track(e) {
      if (this.mouseDown) {
        const sliderWidth = document.querySelector('.image-slider').offsetWidth
        const wrapper = document.querySelector('.image-wrapper')
        const cursor = this.cursorPos
        // Percentage-based change
        const change = (100 * (e.clientX - cursor)) / sliderWidth
        const currentPos = parseFloat(this.imagePos)
        wrapper.style.transform = 'translateX(' + (change + currentPos) + '%)'
      }
    },
    startTrack(e) {
      e.preventDefault()
      this.cursorPos = e.clientX
      this.setState()
      this.mouseDown = true
    },
    endTrack(e) {
      const movement = e.clientX - this.cursorPos
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
    setState() {
      // Stored as percentage
      const wrapper = document.querySelector('.image-wrapper')
      let position = wrapper.style.transform.split(/[(%)]/)[1]
      if (!position) {
        position = 0
      }
      this.imagePos = position
    },
    shiftPosition() {
      this.updateActive()
      const wrapper = document.querySelector('.image-wrapper')
      const imgWidth = document.querySelectorAll('.image-slider .image')[0]
        .offsetWidth
      const offset =
        parseInt(
          (imgWidth / document.querySelector('.image-slider').offsetWidth) * 100
        ) + 1
      wrapper.className = 'image-wrapper animated'
      const shift = -this.active * offset
      // "Hide" all images
      wrapper.style.transform = 'translateX(' + shift + '%)'
      // TODO: Fix timing issue when multiple shifts happen in under 0.5s
      setTimeout(function () {
        wrapper.className = wrapper.className.split(' animated')[0]
      }, 500)
    },
    moveLeft() {
      let newActive = this.active + 1
      if (newActive >= this.images.length) {
        newActive = (newActive + this.images.length) % this.images.length
      }
      this.active = newActive
      this.shiftPosition()
    },
    moveRight() {
      let newActive = this.active - 1
      if (newActive < 0) {
        newActive = (newActive + this.images.length) % this.images.length
      }
      this.active = newActive
      this.shiftPosition()
    },
    updateActive() {
      const images = document.querySelectorAll('.image-slider .image')
      const current = this.active
      images.forEach(function (img) {
        const idx = parseInt(img.getAttribute('index'))
        if (idx === current) {
          img.className = 'image active'
        } else {
          img.className = 'image'
        }
      })
    },
  },
}
</script>

<style lang="scss">
body {
  overflow-x: hidden;
  overflow-y: auto;
}
.image-slider {
  height: 450px;
  cursor: move;
  overflow-x: hidden;
  position: relative;
  .image-wrapper.animated {
    transition: all $anim * 2 $ease-out-quint;
  }
  .image {
    height: 450px;
    width: 50%;
    margin-left: -25%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.5;
    font-size: 0;
    display: inline-block;
    position: absolute;
    transition: opacity $anim * 2 $ease-out-quint;
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
    transform: translateY(-50%);
    &.fa-chevron-left {
      left: 12.5%;
    }
    &.fa-chevron-right {
      right: 12.5%;
    }
  }
}
@media screen and (max-width: 1024px) {
  .image-slider {
    height: 300px;
    .image {
      height: 300px;
    }
  }
}
@media screen and (max-width: 768px) {
  .image-slider {
    height: 250px;
    .image {
      height: 250px;
      margin-left: -45%;
      width: 90%;
    }
  }
}
</style>
