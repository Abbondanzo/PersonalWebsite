<template>
  <div class="content">
    <section>
      <div class="left">
        <div class="project-list valign">
          <ul>
            <h2>Recent Projects</h2>
            <li
              v-for="(project, index) in projects"
              v-bind:key="index"
              v-bind:index="index"
              v-bind:class="isActive(index)"
              v-on:mouseover="projectCheck(index)"
              v-on:click="openProject(index)"
            >
              <span>0{{ index + 1 }}</span>
              <h3>{{ project.title }}</h3>
            </li>
          </ul>
        </div>
        <div class="popup info-block">
          <p>
            Want to see the code behind these projects? Check out my Github profile at
            <a
              class="under"
              target="_blank"
              title="Github Profile"
              href="https://github.com/Abbondanzo"
            >this link</a>.
          </p>
        </div>
      </div>
      <div class="right">
        <img
          v-bind:class="preview"
          v-bind:height="previewHeight"
          v-bind:src="img"
          v-on:click="openProject(activeProject)"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'projects',
  data() {
    return {
      img: require('@assets/img/magic-mover.jpg'),
      activeProject: 0,
      windowHeight: 0,
      preview: '',
      previewHeight: 0,
      projects: [
        {
          title: 'Magic Mover',
          source: 'magic-mover',
          image: 'magic-mover.jpg'
        },
        {
          title: 'Replay Viewer',
          source: 'replay-viewer',
          image: 'replay-viewer.jpg'
        },
        { title: 'Flipster', source: 'flipster', image: 'flipster.jpg' },
        { title: 'Bonne Vie Cafe', source: 'bvc', image: 'bvc.jpg' },
        { title: 'Rogue', source: 'rogue', image: 'rogue.jpg' },
        { title: 'FeedShare', source: 'feedshare', image: 'feedshare.jpg' },
        { title: 'Sthacks', source: 'sthacks', image: 'sth.jpg' },
        { title: 'Modern MyNEU', source: 'myneu', image: 'myneu.jpg' }
      ]
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowHeight)
      this.getWindowHeight()
    })
  },
  methods: {
    projectCheck(arg) {
      this.activeProject = arg
      let newImg = require('@assets/img/' + this.projects[arg].image)
      this.$nextTick(function() {
        this.img = newImg
      })
    },
    isActive(arg) {
      if (arg === this.activeProject) {
        return {
          active: 'active'
        }
      }
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight
      let left = document.querySelector('.left')
      if (left) {
        let leftHeight = left.clientHeight
        if (this.windowHeight < leftHeight) {
          this.preview = 'contract'
          this.previewHeight = leftHeight
        } else {
          this.preview = 'expand'
        }
      }
    },
    openProject(arg) {
      this.$router.replace({
        path: '/projects/' + this.projects[arg].source
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@assets/sass/variables';
.project-return {
  display: none;
}
.content {
  height: 100vh;
}
section {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: table;
  table-layout: fixed;
  .left,
  .right {
    position: relative;
    display: table-cell;
    font-size: 0;
  }
  .left {
    background: $bgcolor2;
    height: 100%;
    margin-right: $padding;
    margin-left: -$padding;
    padding-top: $navbarheight;
    z-index: 2;
    .project-list {
      margin-right: -$padding;
      margin-left: $padding * 2;
      ul {
        list-style: none;
        padding: $padding;
        background: #fff;
        li {
          cursor: pointer;
          margin-bottom: 24px;
          line-height: 36px;
          margin-left: $padding / 2;
          h3,
          span {
            display: inline-block;
            vertical-align: bottom;
          }
          h3 {
            font-size: 24px;
            font-weight: 600;
            color: $textcolor2;
            transition: all $anim / 2 $ease-out-quint;
          }
          span {
            color: $primary;
            font-size: 14px;
            line-height: 36px;
          }
          &:hover,
          &.active {
            h3 {
              font-size: 32px;
              color: $primary;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .right {
    z-index: 1;
    img {
      cursor: pointer;
      min-width: 100%;
      &.expand {
        height: 100vh;
      }
    }
  }
  .info-block {
    background: $primary;
    padding: $padding / 2;
    position: absolute;
    bottom: $padding / 2;
    left: 90%;
    min-width: 200px;
    width: 320px;
    p {
      color: #fff;
      font-size: 14px;
    }
    .under {
      color: #fff;
      &::before {
        background: #fff;
      }
      &::after {
        background: $primary;
      }
    }
  }
  @media screen and (max-width: 960px) {
    .left,
    .right {
      width: 100%;
      display: block;
    }
    .left {
      margin: 0;
      background: transparent;
      .project-list {
        margin: $padding;
        margin-top: 0;
      }
    }
    .right {
      position: fixed;
      top: 0;
    }
    .info-block {
      right: $padding / 2;
      left: inherit;
      bottom: 10px;
    }
  }
  @media screen and (max-width: 768px) {
    .left {
      .project-list {
        margin: 0 ($padding / 2);
        ul {
          padding: $padding / 2;
          text-align: center;
          li {
            margin-left: 0;
            span {
              width: 100%;
            }
          }
        }
      }
      .info-block {
        position: relative;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }
  }
}
</style>
