<template>
  <div class="content project">
    <Title>Bonne Vie Café</Title>
    <Meta
      name="description"
      content="Wireframing and mock-up designs for a mock bakery. Utilizes Zapla API for table reservations and more."
    />

    <div class="p-heading">
      <div class="p-title">
        <h1>Bonne Vie Café</h1>
        <h4>Streamlined cafe web-page mockup.</h4>
      </div>
    </div>
    <div id="text" class="p-text">
      <p>
        Bonne Vie Café began as a mockup design made for a college student. He
        had very little requirements, other than to satisfy a number of
        sections. When he came to me, I knew just how to build the perfect site.
      </p>
      <NuxtImg
        alt="Stylesheet and index side-by-side"
        src="/bonne/b1.jpg"
        format="webp"
      />
      <span>Stylesheet and index side-by-side</span>
      <p>
        I started by designing a wireframe and various slides in Adobe Photoshop
        and InDesign. The customer instantly fell in love and we went from
        there. I built the site from scratch using various amounts of PHP and
        Javascript to handle contact/review forms and table reservations.
        Everything else was made using HTML and CSS.
      </p>
      <NuxtImg
        alt="Preview of the download section"
        src="/bonne/b2.jpg"
        format="webp"
      />
      <NuxtImg
        alt="Preview of the reservation section"
        style="padding: 40px 0"
        src="/bonne/b3.jpg"
        format="webp"
      />
      <p>
        Users can book a reservation in just a few clicks. I utilized Zapla's
        table management API to allow potential restaurant-goers to see what
        number of tables are available. Users could also view a number of
        informative canvases that displayed restaurant location and contact
        details.
      </p>
      <a href="http://cafe.abbondanzo.com/">
        <button class="btn">View Mockup</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bonne',
}
</script>

<style lang="scss" scoped>
.project {
  .p-heading {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url('~/assets/img/bvc.jpg') no-repeat;
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
