<template>
    <div id="app">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    components: { Navbar },
    name: 'app'
}
</script>

<style lang="scss" src="./assets/styles/style.scss"></style>
