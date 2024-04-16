<template>
  <nav class="nav">
    <div class="container">
      <NuxtLink class="nav-logo-container" to="/">
        <img
          alt="Logo"
          class="nav-logo"
          src="~/assets/img/logo.svg"
          :class="[
            { 'logo-black': lightBackground, hidden: !showNavLogo },
            { home: homeScreen },
          ]"
          @load="onNavLogoLoad"
        />
      </NuxtLink>
      <div class="nav-links">
        <ul>
          <li>
            <NuxtLink class="underline" to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink class="underline" to="/projects">Projects</NuxtLink>
          </li>
          <li>
            <NuxtLink class="underline" to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </div>
      <div id="mobile-links" class="mobile-links" :class="{ active: show }">
        <div @keyup.esc="escapeMenu">
          <i
            class="fa fa-bars"
            aria-hidden="true"
            :class="{ 'logo-black': lightBackground }"
            @click="showMenu"
          />
          <ul :class="{ active: show }">
            <li>
              <NuxtLink class="underline" to="/">
                <span @click="showMenu">Home</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="underline" to="/about">
                <span @click="showMenu">About</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="underline" to="/projects">
                <span @click="showMenu">Projects</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="underline" to="/contact">
                <span @click="showMenu">Contact</span>
              </NuxtLink>
            </li>
            <i
              class="fa fa-times menu-close"
              aria-hidden="true"
              @click="showMenu"
            />
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      show: false,
      showNavLogo: true,
      lightBackground: false,
      homeScreen: false,
    }
  },
  watch: {
    $route() {
      this.updateLogo()
      this.isHome()
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.updateLogo)
  },
  mounted() {
    this.updateLogo()
    this.isHome()
  },
  methods: {
    showMenu() {
      this.show = !this.show
    },
    escapeMenu() {
      if (this.show) {
        this.show = !this.show
      }
    },
    onNavLogoLoad() {
      this.showNavLogo = true
    },
    updateLogo() {
      const width = document.body.offsetWidth
      const splitProjects = this.$route.path === '/projects' && width > 960
      const isContact = this.$route.path === '/contact'
      this.lightBackground = splitProjects || isContact
    },
    isHome() {
      this.homeScreen = this.$route.path === '/'
    },
  },
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
  .nav-logo-container {
    width: $container;
    height: auto;
    max-height: 100%;
    margin: 0 auto;
    position: absolute;
    overflow: hidden;
  }
  .nav-logo {
    width: 80px;
    height: $navbarheight * 0.8;
    float: left;
    transition: all $anim * 4;
    pointer-events: all;
    left: 0;
    top: 0;
    &.hidden {
      display: none;
    }
    &.home {
      pointer-events: none;
      width: 100%;
      max-width: $container;
      opacity: 0.1;
      background-size: contain;
      height: 100%;
      padding: 10%;
    }
  }
  .logo-black {
    filter: invert(1);
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
        color: inherit !important;
      }
      &.router-link-exact-active {
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
  }
}
</style>
