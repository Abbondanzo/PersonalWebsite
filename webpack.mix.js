let mix = require('laravel-mix')
let path = require('path')
let CopyWebpackPlugin = require('copy-webpack-plugin')

mix.js('resources/assets/js/app.js', 'public/js')
.sass('resources/assets/sass/app.scss', 'public/css')
.extract(['vue', 'axios']) // Build vendor js with Vue and Axios

// Support for "hot-reloading"
mix.browserSync({
    proxy: 'localhost:8000',
    open: false,
    files: [
        'app/**/*',
        'public/**/*',
        'resources/views/**/*',
        'routes/**/*'
    ]
})

// Webpack configurations
mix.webpackConfig({
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '@assets': path.resolve(__dirname, './resources/assets')
        }
    },
    plugins: [ // Copy resume
         new CopyWebpackPlugin([
             { from: 'resources/assets/content', to: 'content' }
         ])
    ]
})

// Use autoprefixer
mix.options({
    postCss: [
        require('autoprefixer')({
            browsers: ['last 2 versions'],
            cascade: false
        })
    ]
});

// File versioning for production
if (mix.inProduction()) {
    mix.version()
}
