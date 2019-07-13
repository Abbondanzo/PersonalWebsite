<template>
  <div class="content project">
    <div class="p-heading">
      <div class="p-title">
        <h1>Replay Viewer</h1>
        <h4>A Rocket League replay viewer in the browser</h4>
      </div>
    </div>
    <div id="text" class="p-text">
      <h2 id="introduction">Introduction</h2>
      <p>
        If you're like most people and
        <i>haven't</i> heard of the game Rocket League, let me give you the short version:
        <b>soccer, but with cars</b>. It's a little more nuanced than that; there is a massive distribution of players of all skill levels who have mastered the game's mechanics. Twice a year, hundreds of thousands of people gather to
        <a
          class="under"
          href="https://liquipedia.net/rocketleague/Rocket_League_Championship_Series"
          target="_blank"
        >watch the world's greatest players</a> go head-to-head in a three-day extravaganza.
      </p>
      <img src="@assets/img/replay-viewer/rv5.jpg" />
      <span>Yes, they built an arena</span>

      <p>Needless to say, there's a huge interest in this game. Unlike a modern first-person shooter or generic sports game, Rocket League is heavily dependent on teamwork. Teams of 2 or 3 rely on their teammates to communicate, rotate, pass, and work together to win. Hence, large communities have spawned as a result. Everything from national Collegiate Rocket League tournaments to local brackets where players like myself can compete.</p>
      <p>
        One of these local communities went by the name of
        <a
          href="https://www.rlbot.org/"
          target="_blank"
          class="under"
        >RLBot</a>, a few programming enthusiasts who wanted to see if they could write bot players who could compete with one another, using these same mechanical skills and tactics that real players exercised. The RLBot team gained a following, receiving shoutouts from large content creators who played the game.
      </p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/z1sQnomEWiI"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <span>SunlessKhan, a YouTuber who covered an early version of RLBot</span>

      <h2 id="calculated">Calculated.gg</h2>
      <p>
        I was curious about building my own bot so I joined up and began poking around what other creators had built. One bot went by the name of
        <a
          class="under"
          href="https://github.com/SaltieRL/Saltie"
          target="_blank"
        >Saltie</a>, a deep reinforcement learning bot training on replays that the creators fed to it. Little did I know,
        <a
          class="under"
          href="https://github.com/Sciguymjm"
          target="_blank"
        >one of the creators</a> went to the same university I did, Northeastern, so I had to meet up.
      </p>
      <p>
        He introduced me to the whole project and how the biggest difficulty they were facing was that they couldn't simulate enough games fast enough to produce a viable bot. So instead they launched
        <a
          class="under"
          href="https://calculated.gg/"
          target="_blank"
        >calculated.gg</a>, a website primarily aimed at collecting user-submitted replays from the game and performing analysis to discover what tactics and actions that top-tier players performed.
      </p>
      <p>Calculated houses a wide number of statistics, predictions, and player analysis. At nearly 2.5 million replays to date, they are unmatched by any other community. They include information about your overall playstyles and how you perform individual matches. But I digress; let the site speak for itself.</p>
      <img src="@assets/img/replay-viewer/rv2.png" />
      <span>The homepage of calculated.gg</span>
      <img src="@assets/img/replay-viewer/rv6.png" />
      <span>My play style</span>
      <img src="@assets/img/replay-viewer/rv7.png" />
      <span>Just one of the many tabs of information about a single replay of mine</span>

      <h2 id="the-viewer-v1">The Viewer V1</h2>
      <p>I had very little game developer experience prior to this project, much less with Three.js. I initially began work on this project during a 12-hour hackathon with a few other members at a laboratory tucked away in a corner of Northeastern's library. We were able to get a very rough prototype displaying some crudely design cars, an object that represented the ball, and a basic field and set of goals.</p>
      <img src="@assets/img/replay-viewer/rv9.gif" />
      <span>A very early version of the replay viewer</span>
      <p>Since the site was early in development at this time, we spent more of our efforts on the backend side of things, getting a viable set of data to return to the frontend for parsing. I worked on two important systems during this time: an FPS Clock that allowed forward and reverse scrolling over frame data and an animation interpolation system.</p>
      <p>The quick version about 3D animation in Three.js is that animations are made up of keyframes composited into a clip, linked together by a mixer, and run by an action. Each frame contains relevant information about every parameter of every object in the scene, including position and rotation&mdash;the two most important pieces of information in a replay.</p>
      <p>Most 3D design software lets you easily build these animations and export them into a system like Three's for consumption. But that was not the case for us, since we parsed replay data from the game into JSON and then had to animate it manually ourselves.</p>
      <img src="@assets/img/replay-viewer/rv8.png" />
      <span>Each of those little diamonds are keyframes and software like this (blender) interpolates it for you</span>
      <p>The second piece of the equation was a global clock for tracking time. There's another issue with rolling data from one game engine into another: how do you represent time? In replay files from Rocket League, each frame of the game contained a plethora of information about each player's location, rotation, and state (like boosting or demolished). This frame also contains a delta, which is the amount of time that this frame existed for before transitioning to the next frame.</p>
      <p>A delta is often a very small measure of time, something like 0.03605506s or 0.03618125s. As you may have noticed, these are not even fractions of time. We cannot rely on iterating over each frame on a fixed interval since the end result is a choppy mess that speeds up and slows down noticeably. Or if we missed a few frames and the delta is a large number, the animation would skip haphazardly.</p>
      <p>Luckily, the browser keeps track of the time since the user loaded the page down to the nanosecond with a function called `performance.now()`. Since we have one global game state, our one global clock can keep track of an "elapsed time" or the amount of time that has progressed in the replay animation. Given these deltas from each frame, we can convert them to represent an elapsed time by simply adding them up.</p>

      <p>
        <iframe
          height="253"
          style="width: 100%;"
          scrolling="no"
          title="Frames Elapsed"
          src="//codepen.io/abbondanzo/embed/wLbzqx/?height=253&theme-id=dark&default-tab=result"
          frameborder="no"
          allowtransparency="true"
          allowfullscreen="true"
        >
          See the Pen
          <a href="https://codepen.io/abbondanzo/pen/wLbzqx/">Frames Elapsed</a> by Peter Abbondanzo
          (
          <a href="https://codepen.io/abbondanzo">@abbondanzo</a>) on
          <a href="https://codepen.io">CodePen</a>.
        </iframe>
      </p>
      <span style="margin-top: -48px;">Run an example of converting deltas to elapsed frames</span>

      <p>But this is just the easy part. The issue is that we have to convert between the browser time and the "elapsed frame" time, including differences, when telling the state to update. This means that in order to support pausing/playing and reverse scrubbing behavior, we have to keep track of our own delta. A delta of deltas if you will.</p>
      <p>When playing the game, we can just set the delta of deltas, the "last delta", to the current browser time with a call to performance.now(). Each time we fire a frame update using the browser's built-in `setInterval` function, the subscribers of a frame update call to the clock's `getDelta` function. Tihs returns the difference between the last delta and the current time, computes if we have elapsed any more frames, and sets the "last delta" to that current time.</p>
      <p>There's one last piece of the puzzle: setting a frame. In order to do this, we have to have a notion of what the current frame is and the difference of time between that current frame and the frame we want to go to. We use this difference and push it onto a "delta queue". Since the browser is still animating during this time, we want to ensure that setting frames does not interfere with the computation between last frame and next frame. The queue is used to combine all operations that might have occurred between the last frame and the next frame and applies them at once. It reduces the overhead of recomputing if we rapidly change the frame and ensures that there are no side effects when playing or pausing the game.</p>
      <p>
        That was certainly a mouthful, but if you'd like to get a closer look as to how this clock operates, check out
        <a
          class="under"
          href="https://raw.githubusercontent.com/SaltieRL/WebReplayViewer/045fd0e9b88b6181ad8546615ea3aecd0e2d3afd/src/utils/FPSClock.ts"
          target="_blank"
        >this link</a> to see the source code.
      </p>

      <h2 id="the-viewer-v2">The Viewer V2</h2>
      <p>Some time elasped between the hackathon and the next time the project was picked up (for classes) but I picked it back up in the Spring of 2019. The goal was get the project into a presentable state, which meant using better models and controls that actually warranted getting added to the Calculated.gg website.</p>
      <p>I was able to extract models from the game, including the ball, the field, and the most popular car in the game: the Octane. With the help of the community, we cleaned up the materials for these objects. The field and vehicles started to take shape. We began customizing them, mostly to optimize for web performance, but adding our own Calculated.gg flavor.</p>
      <image-slider autoScroll="true" :delay="2000" :images="imageArray"></image-slider>
      <span>Extracted model assets</span>

      <p>Performance wasn't amazing, so it warranted writing the most optimized set of managers I could come up with. I threw together a step-by-step loading system that lazily loaded assets (since there were over 26MB of them!), constructed the scene, configured the sizes of the objects, and initialized a handful of managers which each claimed their own responsibility.</p>
      <p>To make the pieces as pluggable as possible, I moved everything to an event bus that dispatched and subscribed various managers with events that contained updates to cameras, game time progression, user interaction, and more. This optimization made the viewer performant enough to open for beta testing and we've had great success with testers.</p>

      <p>We announced the viewer just in time for RLCS Season 7, showing it off to a number of professional players and game casters who were all excited to use it. By moving the viewer to its own NPM package, we can move quicker with updates and changes without being locked down by the rest of the constantly changing calculated.gg website. You can view the NPM package below.</p>

      <img src="@assets/img/replay-viewer/rv1.png" />
      <span>Above-goal view of the replay viewer</span>
      <img src="@assets/img/replay-viewer/rv3.jpg" />
      <span>Orthographic view of the replay viewer</span>

      <a href="https://github.com/SaltieRL/WebReplayViewer">
        <button class="btn">View Project</button>
      </a>
      <a href="https://www.npmjs.com/package/replay-viewer">
        <button class="btn">View NPM Package</button>
      </a>
    </div>
  </div>
</template>

<script>
import ImageSlider from '../ImageSlider'

export default {
  name: 'replay-viewer',
  data: function() {
    return {
      imageArray: [
        require('@assets/img/replay-viewer/rv10.png'),
        require('@assets/img/replay-viewer/rv11.png'),
        require('@assets/img/replay-viewer/rv12.png'),
        require('@assets/img/replay-viewer/rv13.png'),
        require('@assets/img/replay-viewer/rv14.png')
      ]
    }
  },
  components: {
    'image-slider': ImageSlider
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/sass/variables';
.project {
  .p-heading {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url('~@assets/img/replay-viewer/rv4.jpg') no-repeat;
  }
}
</style>
