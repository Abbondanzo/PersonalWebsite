<template>
  <div id="app">
    <navbar></navbar>
    <transition name="slide" mode="out-in" :duration="500">
      <router-view></router-view>
    </transition>
    <img class="underbg" src="@assets/img/bg.jpg" />
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: { Navbar },
  name: 'app',
  methods: {
    parallax() {
      let bodyHeight = document.body.offsetHeight
      let scrollTop =
        (window.pageYOffset || document.scrollTop || 0) -
        (document.clientTop || 0)
      // "Percent" of page that has been scrolled through
      let down = scrollTop / (bodyHeight - window.innerHeight)
      // Parallax for background
      let img = document.querySelector('.underbg')
      let imgHeight = img.offsetHeight - window.innerHeight
      // Make sure background isn't being modified in a projects environment
      if (this.$route.path.indexOf('about') !== -1) {
        // Display parallax image
        img.style.display = 'block'
        // Vertical scroll
        img.style.transform = 'translateY(-' + imgHeight * down + 'px)'
      } else {
        // Hide parallax image
        img.style.display = 'none'
        // Run on 'project' pages
        img = document.querySelectorAll('.p-heading')[0]
        if (img) {
          // Prevent modifications if there is no heading
          imgHeight = img.offsetHeight
          img.style.backgroundPositionY = imgHeight * down + 'px'
        }
      }
      // Z1 elements
      let block1 = document.querySelectorAll('.block-1')
      for (let i = 0; i < block1.length; i++) {
        let block1Height = block1[i].offsetHeight / 4
        block1[i].style.transform = 'translateY(-' + block1Height * down + 'px)'
      }
      // Z2 elements
      let block2 = document.querySelectorAll('.block-2')
      for (let idx = 0; idx < block2.length; idx++) {
        let block2Height = block2[idx].offsetHeight / 2
        block2[idx].style.transform =
          'translateY(-' + block2Height * down + 'px)'
      }
    },
    backgroundHeight() {
      // Get the height of the user's window
      let windowHeight =
        'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.offsetHeight
      let windowWidth =
        document.body.offsetWidth || document.documentElement.offsetWidth // Using window's width ignores scrollbar
      // Select image
      let img = document.querySelector('.underbg')
      // Maintain aspect ratio
      // TODO: Fix bug where img initializes with height 0
      if (img.offsetWidth < windowWidth) {
        // If the image width should ever exist less than document width
        img.style.width = '100%'
        img.style.height = 'auto'
      } else {
        // If the image height should ever exist less than document height
        if (img.offsetHeight < windowHeight && img.offsetHeight !== 0) {
          // If the width of the image is smaller than the window's
          img.style.width = 'auto'
          img.style.height = '100%'
        }
      }
    },
    metaData() {
      let title = this.$route.name + ' | Peter V. Abbondanzo'
      document.title = title
      let desc = this.$route.meta.description
      let docSelector = document.querySelector('meta[name=description]')
      if (!docSelector) {
        return
      }
      if (!desc) {
        docSelector.content =
          "I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made."
      } else {
        docSelector.content = desc
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.parallax)
    window.addEventListener('resize', this.parallax)
    window.addEventListener('resize', this.backgroundHeight)
  },
  mounted() {
    this.parallax()
    this.backgroundHeight()
    this.metaData()
  },
  watch: {
    $route: function() {
      this.metaData()
      this.parallax()
    }
  }
}
</script>

<style lang="scss">
@import '~@assets/sass/app';
body {
  background: url('~@assets/img/bg.jpg') top left no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow-y: scroll;
  .underbg {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>
