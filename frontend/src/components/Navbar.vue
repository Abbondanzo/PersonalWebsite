<template>
  <nav class="nav">
    <div class="container">
      <router-link class="underline" :to="{ path: '/' }">
        <img
          class="nav-logo"
          src="@/assets/img/logo.svg"
          v-bind:class="[
            { 'logo-black': lightBackground },
            { home: homeScreen }
          ]"
        />
      </router-link>
      <div class="nav-links">
        <ul>
          <li>
            <router-link class="underline" :to="{ path: '/about' }">
              About
            </router-link>
          </li>
          <li>
            <router-link class="underline" :to="{ path: '/projects' }">
              Projects
            </router-link>
          </li>
          <li>
            <router-link class="underline" :to="{ path: '/contact' }">
              Contact
            </router-link>
          </li>
        </ul>
      </div>
      <div
        id="mobile-links"
        class="mobile-links"
        v-bind:class="{ active: show }"
      >
        <div @keyup.esc="escapeMenu">
          <i
            @click="showMenu"
            class="fa fa-bars"
            aria-hidden="true"
            v-bind:class="{ 'logo-black': lightBackground }"
          />
          <ul v-bind:class="{ active: show }">
            <li v-if="mobile">
              <router-link class="underline" :to="{ path: '/' }">
                <span @click="showMenu">Home</span>
              </router-link>
            </li>
            <li>
              <router-link class="underline" :to="{ path: '/about' }">
                <span @click="showMenu">About</span>
              </router-link>
            </li>
            <li>
              <router-link class="underline" :to="{ path: '/projects' }">
                <span @click="showMenu">Projects</span>
              </router-link>
            </li>
            <li>
              <router-link class="underline" :to="{ path: '/contact' }">
                <span @click="showMenu">Contact</span>
              </router-link>
            </li>
            <i
              @click="showMenu"
              class="fa fa-times menu-close"
              aria-hidden="true"
            />
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      show: false,
      lightBackground: false,
      homeScreen: false,
      mobile: false
    }
  },
  created: function () {
    this.updateLogo()
    this.isHome()
    window.addEventListener('resize', this.updateLogo)
    window.addEventListener('resize', this.mobileCheck)
  },
  mounted: function () {
    this.mobileCheck()
  },
  methods: {
    mobileCheck: function () {
      const width = document.body.offsetWidth
      this.mobile = width <= 960
    },
    showMenu: function () {
      this.show = !this.show
    },
    escapeMenu: function () {
      if (this.show) {
        this.show = !this.show
      }
    },
    colorBackground: function () {
      this.lightBackground = !this.lightBackground
    },
    updateLogo: function () {
      const width = document.body.offsetWidth
      const isMobile = width <= 960
      const splitProjects = this.$route.path === '/projects' && width > 960
      const isContact = this.$route.path === '/contact'
      this.lightBackground = splitProjects || isContact
    },
    isHome: function () {
      this.homeScreen = this.$route.path === '/'
    }
  },
  watch: {
    $route() {
      this.updateLogo()
      this.isHome()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;
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
    filter: invert(1);
    fill: #fff;
    width: 80px;
    height: $navbarheight * 0.8;
    float: left;
    transition: all $anim * 4;
    pointer-events: all;
    &.home {
      position: fixed;
      pointer-events: none;
      left: 10%;
      top: 10%;
      width: 80%;
      opacity: 0.1;
      background-size: contain;
      height: 80%;
    }
  }
  .logo-black {
    filter: invert(0);
  }
  .nav-links {
    float: right;
    height: $navbarheight;
    overflow: hidden;
    pointer-events: all;
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
    line-height: $navbarheight;
    vertical-align: middle;
    color: #fff;
    pointer-events: all;
    i {
      cursor: pointer;
      padding: 1em;
      font-size: 28px;
    }
    ul {
      position: fixed;
      padding: 0;
      margin: 0;
      top: 0;
      bottom: 0px;
      width: 100vw;
      left: 100%;
      transition: all $anim * 2 $ease-out-quint;
      background: $primary;
      text-align: center;
      font-size: 28px;
      z-index: 99999;
      list-style: none;
      li {
        &:first-child {
          margin-top: 10vh;
        }
        .underline {
          font-size: 28px;
        }
      }

      &.active {
        left: 0;
        display: block;
      }
    }
    a {
      &.router-link-active {
        color: #222 !important;
      }
      &:hover {
        color: inherit;
        opacity: 0.5;
      }
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
    .logo-black {
      color: #000;
    }
  }
}
</style>
