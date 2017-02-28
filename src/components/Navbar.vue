<template>
    <nav class="nav" v-once>
        <div class="container">
            <router-link class="underline" :to="{ path: '/' }"><div class="nav-logo"></div></router-link>
            <div class="nav-links">
                <ul>
                    <li><router-link class="underline" :to="{ path: 'about' }">About</router-link></li>
                    <li><router-link class="underline" :to="{ path: 'projects' }">Projects</router-link></li>
                    <li><router-link class="underline" :to="{ path: 'contact' }">Contact</router-link></li>
                </ul>
            </div>
            <div class="mobile-links">
                <i class="fa fa-bars" aria-hidden="true"></i>
                <div>
                    <ul>
                        <li><router-link class="underline" :to="{ path: 'about' }">About</router-link></li>
                        <li><router-link class="underline" :to="{ path: 'projects' }">Projects</router-link></li>
                        <li><router-link class="underline" :to="{ path: 'contact' }">Contact</router-link></li>
                        <i class="fa fa-times menu-close" aria-hidden="true"></i>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar'
}
</script>

<style lang="scss">
@import '../assets/styles/global';
.nav {
    overflow: auto;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999999;
    a {
        color: #fff;
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
        font-size: 28px;
        color: #fff;
        cursor: pointer;
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
            }
        }
        .active ul {
            left: 0;
            display: block;
        }
        .menu-close {
            position: absolute;
            padding: 1em;
            top: 0;
            right: 0;
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
