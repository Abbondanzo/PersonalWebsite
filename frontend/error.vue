<template>
  <div id="app">
    <div class="content">
      <div class="valign">
        <div class="container">
          <div class="hello-text">
            <div v-if="error.statusCode === 404">
              <h1>404</h1>
              <h2>That's not a page!</h2>
            </div>
            <div v-else class="hello-text">
              <h1>Uh-oh</h1>
              <h2>There was an error loading this page...</h2>
            </div>
            <NuxtLink to="/">
              <button class="btn btn-white">Go Home</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Object,
      default() {},
    },
  },
  beforeMount() {
    useHead({
      title: this.error.statusCode?.toString(),
    })
  },
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
      // overflow: auto;
      h1,
      h2 {
        color: #fff;
        cursor: default;
        pointer-events: none;
      }
      h1 {
        font-size: 96px;
        // white-space: nowrap;
      }
      h2 {
        font-weight: 300;
        font-size: 40px;
        padding-bottom: 48px;
      }
    }
  }
  @media screen and (max-width: 720px) {
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
