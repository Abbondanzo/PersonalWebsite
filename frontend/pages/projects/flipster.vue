<template>
  <div class="content project">
    <Title>Flipster</Title>
    <Meta
      name="description"
      content="Mock-up designs for an E-Commerce/user trading website. Cross-breed of Craigslist and eBay."
    />

    <div class="p-heading">
      <div class="p-title">
        <h1>Flipster</h1>
        <h4>A social platform for safe, location-based item exchanges</h4>
      </div>
    </div>
    <div id="text" class="p-text">
      <p>
        Flipster came to be when I was contacted by a client out in Australia,
        Nihkil, looking to innovate the trading market. I was tasked with
        creating page-by-page mockups from the landing screen to the
        confirmation of a trade.
      </p>
      <NuxtImg
        alt="Screenshot from the PSD mockup of the landing page"
        src="/flipster/f1.jpg"
        format="webp"
      />
      <span>Screenshot from the PSD mockup of the landing page</span>
      <p>
        His idea was a cross between Craigslist and eBay, where users could
        select to negotiate trades via the online interface and then meet in
        person to exchange. Users maintained rankings through their reputation,
        and all sales and purchases were handled by a proximity search.
      </p>
      <p>
        In order to design the concepts, I utilized Adobe’s Photoshop and
        Illustrator to deliver what Nihkil was looking for. Photoshop allowed me
        to make small tweaks without having to change code. Illustrator gave me
        the power to design various visual elements from mockups to the logo
        itself. Each page of the project was extensively designed to match a
        given color scheme specificed by Nihkil. Every page was well documented
        in addition to the design to describe how the platform was to be built
        to accompany the design.
      </p>
      <NuxtImg
        alt="Wireframe of recent items section"
        src="/flipster/f2.jpg"
        format="webp"
      />
      <NuxtImg
        alt="Rendering of the home page on a laptop"
        class="block-1"
        src="/flipster/f3.jpg"
        format="webp"
      />
      <NuxtImg
        alt="Preview of the buying page"
        class="block-2"
        src="/flipster/f4.jpg"
        format="webp"
      />
      <p>
        You can view the full suite of screenshots by following the button
        below. Each shot features the full-size mock-up of the pages
        commissioned for the project.
      </p>
      <a
        title="View on Behance"
        href="https://www.behance.net/gallery/46252871/Flipster-Website-Design"
      >
        <button class="btn">View Concept</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flipster',
}
</script>

<style lang="scss" scoped>
.project {
  .p-heading {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url('~/assets/img/flipster.jpg') no-repeat;
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
