const Dotenv = require('dotenv-webpack')

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/sass/variables"; @import "~@/assets/sass/app";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Peter V. Abbondanzo'
      return args
    })
  },
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './.env', // load this now instead of the ones in '.env'
        safe: './.env.example', // load '.env.example' to verify the '.env' variables are all set
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: false // hide any errors
      })
    ]
  }
}
