<template>
    <nav class="nav">
        <div class="container">
            <router-link class="underline" :to="{ path: '/' }">
                <div class="nav-logo" v-bind:class="{ 'logo-black': lightBackground }"></div>
            </router-link>
            <div class="nav-links">
                <ul>
                    <li><router-link class="underline" :to="{ path: '/about' }">About</router-link></li>
                    <li><router-link class="underline" :to="{ path: '/projects' }">Projects</router-link></li>
                    <li><router-link class="underline" :to="{ path: '/contact' }">Contact</router-link></li>
                </ul>
            </div>
            <div id="mobile-links" class="mobile-links">
                <div @keyup.esc="escapeMenu">
                    <i @click="showMenu" class="fa fa-bars" aria-hidden="true"></i>
                    <ul v-bind:class="{ active: show }">
                        <li><router-link class="underline" :to="{ path: '/about' }"><span @click="showMenu">About</span></router-link></li>
                        <li><router-link class="underline" :to="{ path: '/projects' }"><span @click="showMenu">Projects</span></router-link></li>
                        <li><router-link class="underline" :to="{ path: '/contact' }"><span @click="showMenu">Contact</span></router-link></li>
                        <i @click="showMenu" class="fa fa-times menu-close" aria-hidden="true"></i>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            show: false,
            lightBackground: false
        }
    },
    created: function () {
        this.updateLogo()
    },
    methods: {
        showMenu: function (event) {
            // this.$set(this, 'show', !this.show)
            this.show = !this.show
        },
        escapeMenu: function (event) {
            console.log('pressed')
            console.log(event)
            if (this.show) {
                this.show = !this.show
            }
        },
        colorBackground: function (event) {
            this.lightBackground = !this.lightBackground
        },
        updateLogo: function () {
            if (this.$route.path === '/projects' || this.$route.path === '/contact') {
                this.lightBackground = true
            } else {
                this.lightBackground = false
            }
        }
    },
    watch: {
        '$route' () {
            this.updateLogo()
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
.nav {
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999999;
    a {
        color: #fff;
        cursor: pointer;
        &.router-link-active {
            color: $primary;
        }
    }
    .nav-logo {
        background: url('../assets/img/logo_small_white.png') center center no-repeat;
        width: 80px;
        height: $navbarheight;
        float: left;
    }
    .logo-black {
        background: url('../assets/img/logo_small_black.png') center center no-repeat;
    }
    .nav-links {
        float: right;
        height: $navbarheight;
        overflow: hidden;
        ul {
            list-style: none;
            display: table;
            height: 100%;
            li {
                display: table-cell;
                vertical-align: middle;
                padding: 2em;
                font-size: 18px;
            }
        }
    }
    .mobile-links {
        display: none;
        float: right;
        height: $navbarheight;
        line-height: $navbarheight;
        vertical-align: middle;
        color: #fff;
        i {
            cursor: pointer;
            padding: 1em;
            font-size: 28px;
        }
        ul {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            left: 100%;
            @include transition( all $anim*2 $ease-out-quint );
            background: $primary;
            text-align: center;
            font-size: 28px;
            z-index: 99999;
            list-style: none;
            overflow: hidden;
            li {
                &:first-child {
                    margin-top: 10vh;
                }
                .underline {
                    font-size: 28px;
                }
            }
        }
        ul.active {
            left: 0;
            display: block;
        }
        a.router-link-active {
            color: #222;
        }
        .menu-close {
            position: absolute;
            padding: 1em;
            top: 0;
            right: 0;
            cursor: pointer;
        }
    }
}
@media screen and (max-width: 960px) {
    .nav {
        .nav-links {
            display: none;
        }
        .mobile-links {
            display: block;
        }
    }
}
</style>
