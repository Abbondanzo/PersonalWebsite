<template>
  <div v-if="isViewingProject" class="project-return">
    <NuxtLink class="btn btn-white" to="/projects">
      Return to projects
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ProjectsFooter',
  data() {
    return {
      isViewingProject: false,
    }
  },
  computed: {
    // Nuxt resolves this.$route to the route injected by NuxtPage, i.e. the
    // route of the page currently rendered. This component lives in the
    // layout, outside NuxtPage, so with an "out-in" page transition that is
    // still the outgoing page and lags one navigation behind. The router's
    // own currentRoute is always live.
    currentRoute() {
      return this.$router.currentRoute.value
    },
  },
  watch: {
    currentRoute() {
      this.checkRoute()
    },
  },
  mounted() {
    this.checkRoute()
  },
  methods: {
    checkRoute() {
      // name is undefined for unmatched routes, which the live route now
      // surfaces mid-navigation; the stale injected route always had one.
      const name = this.currentRoute.name
      this.isViewingProject =
        typeof name === 'string' &&
        name.startsWith('projects') &&
        name !== 'projects'
    },
  },
}
</script>
