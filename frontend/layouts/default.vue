<template>
  <div id="app">
    <Navbar />
    <transition name="slide" mode="out-in" :duration="500">
      <Nuxt />
    </transition>
    <ProjectsFooter />
    <img class="underbg" src="~/assets/img/bg.jpg" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  watch: {
    $route() {
      this.parallax()
      this.backgroundHeight()
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.parallax)
    window.addEventListener('resize', this.parallax)
    window.addEventListener('resize', this.backgroundHeight)
  },
  mounted() {
    setTimeout(() => this.backgroundHeight(), 0)
    this.parallax()
  },
  methods: {
    parallax() {
      const bodyHeight = document.body.offsetHeight
      const scrollTop =
        (window.pageYOffset || document.scrollTop || 0) -
        (document.clientTop || 0)
      // "Percent" of page that has been scrolled through
      const down = scrollTop / (bodyHeight - window.innerHeight)
      // Parallax for background
      let img = document.querySelector('.underbg')
      if (!img) return
      let imgHeight = img.offsetHeight - window.innerHeight
      // Make sure background isn't being modified in a projects environment
      if (this.$route.path.includes('about')) {
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
      const block1 = document.querySelectorAll('.block-1')
      for (let i = 0; i < block1.length; i++) {
        const block1Height = block1[i].offsetHeight / 4
        block1[i].style.transform = 'translateY(-' + block1Height * down + 'px)'
      }
      // Z2 elements
      const block2 = document.querySelectorAll('.block-2')
      for (let idx = 0; idx < block2.length; idx++) {
        const block2Height = block2[idx].offsetHeight / 2
        block2[idx].style.transform =
          'translateY(-' + block2Height * down + 'px)'
      }
    },
    backgroundHeight() {
      // Get the height of the user's window
      const windowHeight =
        'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.offsetHeight
      const windowWidth =
        document.body.offsetWidth || document.documentElement.offsetWidth // Using window's width ignores scrollbar
      // Select image
      const img = document.querySelector('.underbg')
      if (!img) return
      // Maintain aspect ratio
      if (img.offsetWidth < windowWidth && img.offsetWidth !== 0) {
        // If the image width should ever exist less than document width
        img.style.width = '100%'
        img.style.height = 'auto'
      } else if (img.offsetHeight < windowHeight && img.offsetHeight !== 0) {
        // If the width of the image is smaller than the window's
        img.style.width = 'auto'
        img.style.height = '100%'
      }
    },
  },
}
</script>

<style lang="scss">
body {
  background: url('~@/assets/img/bg.jpg') top left no-repeat;
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
