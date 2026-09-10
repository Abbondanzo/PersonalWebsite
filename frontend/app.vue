<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>



<script setup>
// www and the apex both serve the site, so point every page at one canonical
// host. Read from the router rather than useRoute(): outside NuxtPage the
// injected route lags a navigation behind.
const { siteUrl } = useRuntimeConfig().public
const router = useRouter()
const canonical = computed(() => `${siteUrl}${router.currentRoute.value.path}`)

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Peter V. Abbondanzo`
      : 'Peter V. Abbondanzo'
  },
  description:
    "I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made.",
})
</script>
