<template>
  <div class="content">
    <section class="about-info">
      <div class="right backgrounding">
        <div class="background-2"></div>
      </div>
      <div class="left">
        <div class="valign">
          <div class="greeting">
            <h1>Hi,</h1>
            <h1>I'm Peter Abbondanzo</h1>
          </div>
        </div>
        <div class="experience block-1">
          <h2>Experience</h2>
          <transition appear @fter-appear="afterEnter">
            <ul>
              <li v-for="(skill, index) in skills" :key="index" :index="index">
                <h3>{{ skill.name }}</h3>
                <h4>{{ skill.skills.join(', ') }}</h4>
              </li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="right">
        <div class="info-block block-2">
          <h2>A little bit about me...</h2>
          <p>
            Hi! I’m Peter Abbondanzo, {{ getAge() }}-year-old UI/UX developer of
            web and mobile applications. I'm an alumni of
            <a
              href="http://www.northeastern.edu/"
              class="under"
              title="Northeastern"
              >Northeastern University</a
            >
            up in Boston, Massachusetts. I’ve got a passion for building weird
            things and drinking lots of coffee. I also work for this fantastic
            company called
            <a class="under" href="https://hubspot.com/" title="HubSpot"
              >HubSpot</a
            >
            over in Cambridge.
          </p>
          <a href="/resume.pdf">
            <button title="View PDF resume" class="btn">Résumé</button>
          </a>
        </div>
      </div>
    </section>
    <section class="about-more">
      <div class="left">
        <div class="more-info-block">
          <h2>... and what I do</h2>
          <p>
            I'm a computer scientist who likes to tinker with VR and web
            development in my spare time. I've helped write code for
            <a href="https://github.com/SaltieRL/DistributedReplays">
              replaying Rocket League games in the browser
            </a>
            and made a
            <a href="https://github.com/NUVR/Magic-Mover">
              small VR rehabilitation game </a
            >. You can check out some of my older projects
            <NuxtLink class="under" :to="{ path: '/projects' }">here</NuxtLink>.
          </p>
          <p>
            I love everything related to web development. But I also love the
            outdoors. If I'm not working on a project, you can find me bicycling
            around the Boston area or refinishing my basement at home.
          </p>
        </div>
      </div>
      <div class="right">
        <div class="valign">
          <div class="contact-cta">
            <h3>Send a message</h3>
            <NuxtLink :to="{ path: '/contact' }">
              <button class="btn">Contact Me</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      skills: [
        {
          name: 'Languages',
          skills: [
            'JavaScript/TypeScript',
            'Java/Kotlin',
            'Python',
            'HTML',
            'CSS (Sass/SCSS & Less)',
            'PHP',
            'Lisp',
            'Racket',
            'Go',
            'C/C++',
            'C#',
            'English',
          ],
        },
        {
          name: 'Frameworks',
          skills: [
            'React',
            'React Native',
            'Angular',
            'Vue',
            'jQuery',
            'Express',
            'ThreeJS',
          ],
        },
        {
          name: 'Tools',
          skills: [
            'Node (Webpack & Babel)',
            'WordPress',
            'MongoDB',
            'Bootstrap',
            'Squarespace (Plugins)',
            'Android Studio',
            'MSCP Certified',
            'Linux (Ubuntu, Fedora)',
            'Azure',
            'Amazon AWS/Lambda',
            'Google Firebase',
            'Heroku',
            'Hammer',
            'Nail gun',
            'Measuring tape',
          ],
        },
      ],
      baseWidths: [{ width: 0 }, { width: 0 }, { width: 0 }],
    }
  },
  methods: {
    getAge: () => {
      const bday = new Date('1998-05-21').getTime()
      const today = new Date().getTime()
      const age = Math.floor((today - bday) / 1000 / 60 / 60 / 24 / 365.25)
      if (age === 18 || (age >= 80 && age <= 89)) {
        return 'an ' + age
      } else {
        return 'a ' + age
      }
    },
    afterEnter: () => {
      for (let i = 0; i < this.baseWidths.length; i++) {
        this.baseWidths[i].width = this.skills[i].pct
      }
    },
  },
  head: {
    title: 'About',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          "Experienced full-stack developer with a passion for creating, innovating, and coffee. Well versed in Adobe's Creative Suite",
      },
    ],
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

#app {
  .content {
    overflow-x: hidden;
  }
  .underbg {
    display: block !important;
  }
  section {
    position: relative;
    .left,
    .right {
      vertical-align: top;
      position: relative;
      .valign {
        min-height: 600px;
      }
    }
    .right {
      margin-left: $padding;
      margin-right: -$padding;
    }
    &.about-info {
      min-height: 800px;
      z-index: 2;
      .greeting {
        margin-top: $navbarheight + $padding;
        right: -$padding * 2;
        h1 {
          font-size: 60px;
          margin-right: $padding * 2;
        }
      }
      .info-block {
        background: #fff;
        position: absolute;
        margin-top: $navbarheight;
        margin-left: -$padding;
        padding: $padding;
        width: math.div($container, 2);
        p {
          line-height: 1.8;
          font-size: 18px;
          padding-bottom: math.div($padding, 2);
        }
      }
      .backgrounding {
        position: absolute;
        right: 0;
        left: 50%;
        top: 0;
        bottom: 0;
      }
      .left,
      .right {
        min-height: 800px;
      }
      .greeting,
      .experience {
        width: math.div($container, 2) + $padding;
        position: absolute;
      }
      .experience {
        right: -$padding;
        background: $primary;
        bottom: -$padding * 2.5;
        margin-right: -$padding;
        color: #fff;
        padding: $padding;
        ul {
          list-style: none;
          li {
            overflow: auto;
            position: relative;
            margin-bottom: 24px;
            padding-bottom: 18px;
            &:last-child {
              margin-bottom: 0;
            }
            h3 {
              font-size: 20px;
              font-weight: 300;
            }
            h4 {
              font-size: 16px;
              opacity: 0.8;
            }
          }
        }
      }
      .background-2 {
        height: 100%;
        width: 100%;
        display: block;
        position: absolute;
        z-index: -1;
      }
    }
    &.about-more {
      z-index: 1;
      .left {
        background: #fff;
        color: $primary;
        z-index: 1;
      }
      .right {
        height: 100%;
        margin-left: 0;
      }
      .more-info-block,
      .contact-cta {
        width: math.div($container, 2) - $padding;
        padding: $padding;
        p {
          line-height: 1.8;
          font-size: 18px;
          padding-bottom: math.div($padding, 2);
          &:last-child {
            padding-bottom: 0;
          }
        }
        h3 {
          color: #fff;
          font-size: 48px;
        }
      }
      .contact-cta {
        margin: 0 auto;
        text-align: center;
      }
      .more-info-block {
        float: right;
        clear: both;
        padding-top: $padding * 2;
      }
    }
  }
  @media screen and (max-width: 1320px) {
    section {
      &.about-info .greeting {
        width: 80%;
        right: $padding;
        h1 {
          font-size: 60px;
          margin-right: 0px;
        }
      }
      .right {
        margin-left: 0;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    section {
      width: 100vw;
      .left,
      .right {
        width: 100%;
        display: block;
        margin-left: 0;
        margin-right: 0;
        min-height: 0 !important;
        .valign {
          min-height: 0 !important;
        }
      }
      &.about-info {
        .info-block,
        .experience,
        .greeting {
          width: 100%;
          display: block;
          position: relative;
        }
        .greeting {
          right: 0;
          margin-top: $navbarheight;
          h1 {
            text-align: center;
            font-size: 72px;
          }
        }
        .info-block {
          margin-left: 0;
          margin-top: 0;
        }
        .experience {
          bottom: 0;
          right: 0;
          float: none;
        }
        .left .valign {
          height: 400px;
        }
        .block-1,
        .block-2 {
          transform: translateY(0) !important;
        }
        .background-2 {
          display: none;
        }
      }
      &.about-more {
        .more-info-block,
        .contact-cta {
          padding-top: $padding;
          width: 100%;
        }
        .more-info-block {
          background: $bgcolor2;
          float: none;
          clear: none;
          .under::after {
            background: $bgcolor2;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    section {
      &.about-info,
      &.about-more {
        .info-block,
        .more-info-block,
        .contact-cta,
        .experience {
          padding: 15%;
        }
        .greeting h1 {
          font-size: 48px;
        }
      }
    }
  }
}
</style>
