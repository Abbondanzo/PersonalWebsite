<template>
  <div class="content">
    <div class="valign">
      <div class="container">
        <div class="hello-text">
          <h1>Peter Abbondanzo</h1>
          <h2>Software Developer</h2>
          <router-link :to="{ path: 'about' }">
            <button class="btn btn-white">About</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    // Professional state management
    if (!window.hello) {
      window.hello = true
      console.log(
        "Thanks for visiting! I didn't put any easter eggs in here but I'll add one if you file an issue on my GH repository"
      )
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  .content {
    height: 100vh;
    a {
      text-align: center;
    }
    .hello-text {
      text-align: center;
      h1,
      h2 {
        color: #fff;
        cursor: default;
        pointer-events: none;
      }
      h1 {
        font-size: 96px;
      }
      h2 {
        font-weight: 300;
        font-size: 40px;
        padding-bottom: 48px;
      }
    }
  }
  @media screen and (max-width: 1360px) {
    .content {
      .hello-text {
        h1 {
          font-size: 40px;
          white-space: normal;
        }
        h2 {
          font-size: 20px;
          padding-bottom: 24px;
        }
      }
    }
  }
}
</style>
