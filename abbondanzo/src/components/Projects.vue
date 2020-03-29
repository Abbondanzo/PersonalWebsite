<template>
  <div>
    <router-view transition="slide" mode="out-in" :duration="500" />
    <div v-if="notRoot" class="project-return">
      <router-link class="btn btn-white" to="/projects"
        >Return to projects</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateRoute',
  data() {
    return {
      notRoot: false
    }
  },
  methods: {
    checkRoot: function() {
      this.notRoot = !(this.$route.name === 'Projects')
    }
  },
  mounted() {
    this.checkRoot()
  },
  watch: {
    $route: function() {
      this.checkRoot()
    }
  }
}
</script>
