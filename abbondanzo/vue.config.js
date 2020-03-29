module.exports = {
  //   configureWebpack: config => {
  //     if (process.env.NODE_ENV === 'production') {
  //       // mutate config for production...
  //     } else {
  //       // mutate for development...
  //     }
  //   }
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/sass/variables"; @import "~@/assets/sass/app";`
      }
    }
  }
}
