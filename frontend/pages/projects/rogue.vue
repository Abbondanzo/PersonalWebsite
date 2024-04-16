<template>
  <div class="content project">
    <Title>Rogue</Title>
    <Meta
      name="description"
      content="Simple one-page site for advertising Counter Strike: Global Offensive software."
    />

    <div class="p-heading">
      <div class="p-title">
        <h1>Rogue</h1>
        <h4>One-page website, advertisement for gaming client</h4>
      </div>
    </div>
    <div id="text" class="p-text">
      <p>
        Rogue was designed as a simple one-page demo of a client-side
        application for the famous Counter Strike: Global Offensive game. The
        client wanted an effective means of showcasing the power of their
        application, so a full-page live video runs above the fold for every
        user that reaches the site.
      </p>
      <p>
        Each user that came across the page could view the primary features of
        the application and request a license with a simple one-click checkout.
        The footer kept track of the hundreds of users who had installed the
        application, and allowed new buyers to email their questions to the
        client.
      </p>
      <ImageSlider auto-scroll="true" :delay="2000" :images="imageArray" />
      <a href="http://demo.abbondanzo.com/rogue/">
        <button class="btn">View Demo</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rogue',
  data() {
    return {
      imageArray: [
        this.$img('/rogue/r1.png', { format: 'webp' }),
        this.$img('/rogue/r2.png', { format: 'webp' }),
        this.$img('/rogue/r3.png', { format: 'webp' }),
        this.$img('/rogue/r4.png', { format: 'webp' }),
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

.project {
  .p-heading {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url('~/assets/img/rogue.jpg') no-repeat;
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
    .image-slider {
      margin-bottom: math.div($padding, 2);
    }
  }
}
</style>
