<template>
  <div class="content project">
    <div class="p-heading">
      <div class="p-title">
        <h1>Sthacks</h1>
        <h4>Simple website designed to function as a command-line interface</h4>
      </div>
    </div>
    <div id="text" class="p-text">
      <p>
        Originally designed and developed for our student-led organization
        Sthacks. This webpage was modeled after a standard terminal window and
        allows users to fully interact by typing various commands.
      </p>
      <p>
        The website also includes a multitude of features, such as the ability
        to minimize and maximize the window. Aside from exploring information
        about Sthacks, users can also hunt for little easter eggs planted in the
        terminal. Everything was designed in Photoshop before getting developed
        in HTML5, CSS3, JavaScript/jQuery, and Python.
      </p>
      <image-slider
        autoScroll="true"
        :delay="2000"
        :images="imageArray"
      ></image-slider>
      <span>Vanilla build without Python running</span>
      <a href="https://github.com/Sthacks/sthacksWebsite">
        <button class="btn">View Repo</button>
      </a>
    </div>
  </div>
</template>

<script>
import ImageSlider from '../ImageSlider'

export default {
  name: 'sthacks',
  data: function() {
    return {
      imageArray: [
        require('@/assets/img/sthacks/s5.gif'),
        require('@/assets/img/sthacks/s2.gif'),
        require('@/assets/img/sthacks/s3.gif'),
        require('@/assets/img/sthacks/s4.gif'),
        require('@/assets/img/sthacks/s1.gif')
      ]
    }
  },
  components: {
    'image-slider': ImageSlider
  }
}
</script>

<style lang="scss" scoped>
// @import '~@assets/sass/variables';
.project {
  .p-heading {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url('~@/assets/img/sth.jpg') no-repeat;
  }
  .p-text {
    .block-1 {
      width: 40%;
      margin: 80px 20% 0 10%;
    }
    .block-2 {
      width: 60%;
      margin: 100px 0 0 30%;
    }
    p:last-child {
      margin-top: -300px;
    }
  }
}
</style>
