<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>



<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Peter V. Abbondanzo`
      : 'Peter V. Abbondanzo'
  },
  description:
    "I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made.",
})
</script>
