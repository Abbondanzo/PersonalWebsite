<template>
    <div class="content project">
        <div class="p-heading">
            <div class="p-title">
                <h1>FeedShare</h1>
                <h4>Mobile food sharing app design, mockup</h4>
            </div>
        </div>
        <div id="text" class="p-text">
            <p>FeedShare began as a collaborative project between two other Northeastern students and myself. My responsibility was to design a new interface and implement said interface as an application built with React Native.</p>
            <img src="~@assets/img/feedshare/f1.png">
            <span>Detail view, home view, and new item view respectively. Taken directly from the app</span>
            <p>The project is ongoing and under continuous development. These screenshots are all from my new design as part of Feedshare 2.0. Everything you see here is being tweaked and fine-tuned inside the application build. The beta version leading up to Feedshare 2.0 is functional and features much of the design displayed here. Since the new version has not been released publically, these views only exist here.</p>
            <img src="~@assets/img/feedshare/f2.png">
            <span>Login page prototype on Android device</span>
            <p>Every design element of the application was met with heavy testing and as a result, showcases the best of what we created. Every view was built as a wireframe, then brought into Photoshop for color tweaking. Eventually, I built a protoyped version; first in  InVision, then in Sketch. From there, the design was implemented using a mixture of React Native, Swift, and Java.</p>
            <a href="http://feedshare.org/">
                <button class="btn">View App</button>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'feedshare'
}
</script>

<style lang="scss" scoped>
@import '~@assets/sass/variables';
.project {
    .p-heading {
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('~@assets/img/feedshare.jpg') no-repeat;
    }
    .p-text {
        .block-1 {
            width: 40%;
            margin: 80px 20% 0 10%;
        }
        .block-2 {
            width: 60%;
            margin: 100px 0 0 30%;
        }
        p:last-child {
            margin-top: -300px;
        }
    }
}
</style>
