<template>
    <div class="content project">
        <div class="p-heading">
            <div class="p-title">
                <h1>Rogue</h1>
                <h4>One-page website, advertisement for gaming client</h4>
            </div>
        </div>
        <div id="text" class="p-text">
            <p>Rogue was designed as a simple one-page demo of a client-side application for the famous Counter Strike: Global Offensive game. The client wanted an effective means of showcasing the power of their application, so a full-page live video runs above the fold for every user that reaches the site.</p>
            <p>Each user that came across the page could view the primary features of the application and request a license with a simple one-click checkout. The footer kept track of the hundreds of users who had installed the application, and allowed new buyers to email their questions to the client.</p>
            <image-slider autoScroll="true"
            :delay="2000"
            :images="imageArray"></image-slider>
            <a href="http://demo.abbondanzo.com/rogue/">
                <button class="btn">View Demo</button>
            </a>
        </div>
    </div>
</template>

<script>
import ImageSlider from '@/components/ImageSlider'

export default {
    name: 'rogue',
    data: function () {
        return {
            imageArray: [
                require('../../assets/img/bonne/b1.jpg'),
                require('../../assets/img/bonne/b2.jpg'),
                require('../../assets/img/bonne/b3.jpg'),
                require('../../assets/img/bonne/b1.jpg')
            ]
        }
    },
    components: {
        'image-slider': ImageSlider
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.project {
    .p-heading {
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('../../assets/img/rogue.jpg') no-repeat;
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
        .image-slider {
            margin-bottom: $padding / 2;
        }
    }
}
</style>
