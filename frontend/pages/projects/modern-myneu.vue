<template>
  <div class="content project">
    <Title>Modern MyNEU</Title>
    <Meta
      name="description"
      content="Full-fledged Chrome extension designed to overhaul the look and flow of Northeastern's student portal."
    />

    <div class="p-heading">
      <div class="p-title">
        <h1>Modern MyNEU</h1>
        <h4>
          Chrome-extension that completely overhauls the deisgn of
          Northeastern's student portal
        </h4>
      </div>
    </div>
    <div id="text" class="p-text">
      <p>
        Modern MyNEU is a fully functional Google Chrome extension, available in
        the webstore, that completely redesigns Northeastern University's
        outdated and ill-designed MyNEU portal. Originally designed as a weekend
        project, this extension has evolved into a widely-used application
        across campus, inspiring both students and administration at
        Northeastern to support the reconstruction of a new, user-friendly
        portal.
      </p>
      <NuxtImg alt="Old login page" src="/myneu/m1.png" format="webp" />
      <span>Old login page</span>
      <NuxtImg
        alt="New login page that cycles 20 different backgrounds from all around
        campus"
        src="/myneu/m1.jpg"
        format="jpg"
      />
      <span
        >New login page that cycles 20 different backgrounds from all around
        campus</span
      >
      <p>
        Large amounts of features and reimplementations of the old site have
        been added to the extension. A freshly designed login portal allows
        users to take advantage of password storage apps where the old site
        would prevent. A search bar that narrows down specific widgets within
        the portal has also been added. Enhanced drop-down menus add to the
        capabilities that the vanilla site is unable to provide.
      </p>
      <NuxtImg alt="Old Self-Service page" src="/myneu/m2.png" format="webp" />
      <span>Old "Self-Service" page</span>
      <NuxtImg alt="New Self-Service page" src="/myneu/m3.png" format="webp" />
      <span>New "Self-Service" page</span>
      <p>
        Since the plugin is still in beta stages, new features are getting added
        that will allow users to customize layouts and themes from within the
        options pop-out. Everything down to the individual colors of elements
        and the ability to export custom preferences will give users the full
        control they desire from MyNEU.
      </p>
      <a
        href="https://chrome.google.com/webstore/detail/modern-myneu/phpjhjbppfdgofldhpecojjdfccboblk"
      >
        <button class="btn">View Extension</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModernMyNEU',
}
</script>

<style lang="scss" scoped>
.project {
  .p-heading {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url('~/assets/img/myneu.jpg') no-repeat;
  }
  .p-text {
    .block-1 {
      width: 40%;
      margin: 80px 20% 0 10%;
    }
    .block-2 {
      width: 60%;
      margin: 100px 0 0 30%;
    }
    p:last-child {
      margin-top: -300px;
    }
  }
}
</style>
