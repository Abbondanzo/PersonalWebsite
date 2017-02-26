<template>
    <div id="app">
        <navbar></navbar>
        <template src="./views/nav.html"></template>
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
