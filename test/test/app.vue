<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  transition: all 0.4s;
}
</style>


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
