<template>
    <div class="content">
        <section>
            <div class="left">
                <div class="project-list">
                    <ul>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
                        <li>Project 1</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'projects'
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
.left {
    background: $bgcolor2;
    .project-list {
        background: #fff;
    }
}
</style>
