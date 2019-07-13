<template>
  <div class="content project">
    <div class="p-heading">
      <div class="p-title">
        <h1>Magic Mover</h1>
        <h4>Rehabilitation research using a simple AR game</h4>
      </div>
    </div>
    <div id="text" class="p-text">
      <p>AR technologies have been rapidly evolving only recently, and therefore have not been applied yet to the medical fields as much as VR has. However, AR seems to be promising in particular for home-based rehab because, unlike VR, AR overlaps virtual images onto the real world environments during simulation, thus possibly limiting the discomfort in patients. Recent evolutions of AR, like Hololens and Magic Leap One, by tracking the environmental structure where they are in, allow to literally place virtual objects in specific 3D positions, thus opening interesting perspectives for novel iteractive forms of rehabilitation.</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/1GWoU7wo64c?controls=0"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <span>A short demo of image overlays in the environment</span>
      <p>
        During MIT's Reality Virtually hackathon, we had chosen to investigate how AR could help in the most impactful way. We discovered that AR had
        <a
          class="under"
          href="https://ieeexplore.ieee.org/document/5567156"
        >a place in post-stroke treatments</a>, helping and empowering patients to exercise their motor skills and fully recover. In particular, this become important in the later stages of the rehab process or when patients no longer need hospital treatments, since they may want to work on their skills at home to get back to normal mobility and function.
      </p>

      <h2>What it does</h2>
      <p>We decided to build an AR game involving interacting with (i.e. moving and stacking) virtual objects. The user would move/stack them by looking at the object and placing it on a virtual mat (both of them anchored in the real space). Over time, the levels will get harder, requiring the user to move around the real space with increasing the complexity and magnitude of movements.</p>
      <img src="@assets/img/magic-mover/mm1.jpg" />
      <span>Taha Vasowalla trying out the Hololens</span>
      <img src="@assets/img/magic-mover/mm2.jpg" />
      <span>Taha and I setting up the Hololens for the first time</span>
      <p>The project has been developed with Unity 3D and targeted to Microsoft Hololens. The interface is simple: to limit initially required mobility, all the user has to do is look at an object. Each object they look at glows and when they look long enough, a timer displays. When this timer is full, the virtual object is picked up and it is displayed in front of the user.</p>
      <p>Then the user can move it onto the mat, which would also bring up a timer and at the end of the timer, drop the object where you put it (the timer would allow positioning). We programmed each of these actions in Unity, and used the Unity Spacial Mapping Toolkit to randomly generate objects in the desired section of the room.</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/LHEMDmz2UgE?controls=0"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <span>Looking at the play button in the menu</span>
      <p>Working with the Hololens was a challenge because in the present version it is not possible to integrate or track hand movement in a way that wouldn't be too difficult for the patient (some of us even had trouble doing the pinching motion required for the Hololens). We adapted our project to moving things visually, which instead requires our patients to walk around more and get used to their houses again.</p>

      <h2>What's next for Magic Mover</h2>
      <p>From a purely technical point of view, we hope to integrate the Leap Motion controller or the Magic Leap to include hand tracking among the several forms of possible input. This will allow a more natural interaction with virtual objects, easing the picking up virtual objects in the earlier levels, and better grasping and moving them in advanced ones.</p>
      <p>We also hope to develop more levels to require more movement around the room, more challenging stacking patterns, and even bimanual activities, pronosupination and fine movement.</p>

      <h2>Learn More</h2>
      <p>We built this project in span of a single weekend but we made it open to everyone if they want to try it out or make their own version. You can check out the project below for an even more in-depth description of what it can do, including a small demo of the full game.</p>

      <a href="https://github.com/NUVR/Magic-Mover">
        <button class="btn">View Project</button>
      </a>
      <a href="https://devpost.com/software/magic-mover-bl3e7p">
        <button class="btn">View Devpost</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'magicmover'
}
</script>

<style lang="scss" scoped>
@import '~@assets/sass/variables';
.project {
  .p-heading {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url('~@assets/img/magic-mover.jpg') no-repeat;
  }
}
</style>
