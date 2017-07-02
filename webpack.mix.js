let mix = require('laravel-mix')
let path = require('path')

mix.js('resources/assets/js/app.js', 'public/js')
.sass('resources/assets/sass/app.scss', 'public/css')
.extract(['vue', 'axios'])

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

mix.webpackConfig({
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '@assets': path.resolve(__dirname, './resources/assets')
        }
    }
})

if (mix.inProduction()) {
    mix.version()
}
