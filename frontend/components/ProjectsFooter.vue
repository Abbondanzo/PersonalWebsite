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
  watch: {
    $route() {
      this.checkRoute()
    },
  },
  mounted() {
    this.checkRoute()
  },
  methods: {
    checkRoute() {
      this.isViewingProject =
        this.$route.name.startsWith('projects') &&
        this.$route.name !== 'projects'
    },
  },
}
</script>
