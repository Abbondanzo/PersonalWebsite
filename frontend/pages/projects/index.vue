<template>
  <div class="content">
    <Title>Projects</Title>
    <Meta
      name="description"
      content="Recent projects, both personal and for work. You can only know what's here if you take a look."
    />

    <section>
      <div class="left">
        <div class="project-list valign">
          <ul>
            <h2>Recent Projects</h2>
            <li
              v-for="(project, index) in projects"
              :key="index"
              :index="index"
              :class="isActive(index)"
              @mouseover="projectCheck(index)"
              @click="openProject(index)"
            >
              <span>0{{ index + 1 }}</span>
              <h3>{{ project.title }}</h3>
            </li>
          </ul>
        </div>
        <div class="popup info-block">
          <p>
            Want to see the code behind these projects? Check out my Github
            profile at
            <a
              class="under"
              target="_blank"
              title="Github Profile"
              href="https://github.com/Abbondanzo"
              >this link</a
            >.
          </p>
        </div>
      </div>
      <div class="right">
        <img
          alt="Project preview photo"
          :class="preview"
          :height="previewHeight"
          :src="img"
          @click="openProject(activeProject)"
        />
      </div>
    </section>
  </div>
</template>

<script>
import magicMover from '~/assets/img/magic-mover.jpg'
import replayViewer from '~/assets/img/replay-viewer.jpg'
import flipster from '~/assets/img/flipster.jpg'
import bvc from '~/assets/img/bvc.jpg'
import rogue from '~/assets/img/rogue.jpg'
import feedshare from '~/assets/img/feedshare.jpg'
import sth from '~/assets/img/sth.jpg'
import myneu from '~/assets/img/myneu.jpg'

export default {
  name: 'Projects',
  data() {
    return {
      img: magicMover,
      activeProject: 0,
      windowHeight: 0,
      preview: '',
      previewHeight: 0,
      projects: [
        {
          title: 'Magic Mover',
          source: 'magic-mover',
          image: magicMover,
        },
        {
          title: 'Replay Viewer',
          source: 'replay-viewer',
          image: replayViewer,
        },
        { title: 'Flipster', source: 'flipster', image: flipster },
        { title: 'Bonne Vie Cafe', source: 'bvc', image: bvc },
        { title: 'Rogue', source: 'rogue', image: rogue },
        { title: 'FeedShare', source: 'feedshare', image: feedshare },
        { title: 'Sthacks', source: 'sthacks', image: sth },
        { title: 'Modern MyNEU', source: 'modern-myneu', image: myneu },
      ],
    }
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowHeight)
      this.getWindowHeight()
    })
  },
  methods: {
    async projectCheck(arg) {
      this.activeProject = arg
      this.$nextTick(function () {
        this.img = this.projects[arg].image
      })
    },
    isActive(arg) {
      if (arg === this.activeProject) {
        return {
          active: 'active',
        }
      }
    },
    getWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight
      const left = document.querySelector('.left')
      if (left) {
        const leftHeight = left.clientHeight
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
        path: '/projects/' + this.projects[arg].source,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

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
          margin-left: math.div($padding, 2);
          h3,
          span {
            display: inline-block;
            vertical-align: bottom;
          }
          h3 {
            font-size: 24px;
            font-weight: 600;
            color: $textcolor2;
            transition: all math.div($anim, 2) $ease-out-quint;
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
    padding: math.div($padding, 2);
    position: absolute;
    bottom: math.div($padding, 2);
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
      right: math.div($padding, 2);
      left: inherit;
      bottom: 10px;
    }
  }
  @media screen and (max-width: 768px) {
    .left {
      .project-list {
        margin: 0 (math.div($padding, 2));
        ul {
          padding: math.div($padding, 2);
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
