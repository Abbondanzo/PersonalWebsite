<template>
    <nav class="nav" v-once>
        <div class="container">
            <div class="nav-logo"></div>
            <div class="nav-links">
                <ul>
                    <li><a class="underline" href="/about">About</a></li>
                    <li><a class="underline" href="/projects">Projects</a></li>
                    <li><a class="underline" href="#">Contact</a></li>
                </ul>
            </div>
            <div class="mobile-links">
                <i class="fa fa-bars" aria-hidden="true"></i>
                <div>
                    <ul>
                        <li><a class="underline" href="/about">About</a></li>
                        <li><a class="underline" href="/projects">Projects</a></li>
                        <li><a class="underline" href="#">Contact</a></li>
                        <i class="fa fa-times menu-close" aria-hidden="true"></i>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar'
}
</script>
