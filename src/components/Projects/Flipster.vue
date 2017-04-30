<template>
    <div class="content project">
        <div class="p-heading">
            <div class="p-title">
                <h1>Flipster</h1>
                <h4>A social platform for safe, location-based item exchanges</h4>
            </div>
        </div>
        <div id="text" class="p-text">
            <p>Flipster came to be when I was contacted by a client out in Australia, Nihkil, looking to innovate the trading market. I was tasked with creating page-by-page mockups from the landing screen to the confirmation of a trade.</p>
            <img src="../../assets/img/flipster/f1.jpg">
            <span>Screenshot from the PSD mockup of the landing page</span>
            <p>His idea was a cross between Craiglist and eBay, where users could select to negotiate trades via the online interface and then meet in person to exchange. Users maintained rankings through their reputation, and all sales and purchases were handled by a proximity search.</p>
            <p>In order to design the concepts, I utilized Adobe’s Photoshop and Illustrator to deliver what Nihkil was looking for. Photoshop allowed me to make small tweaks without having to change code. Illustrator gave me the power to design various visual elements from mockups to the logo itself. Each page of the project was extensively designed to match a given color scheme specificed by Nihkil. Every page was well documented in addition to the design to describe how the platform was to be built to accompany the design.</p>
            <img src="../../assets/img/flipster/f2.jpg">
            <img class="block-1" src="../../assets/img/flipster/f3.jpg">
            <img class="block-2" src="../../assets/img/flipster/f4.jpg">
            <p style="margin-top: -280px;">You can view the full suite of screenshots by following the button below. Each shot features the full-size mock-up of the pages commissioned for the project.</p>
            <a title="View on Behance" href="https://www.behance.net/gallery/46252871/Flipster-Website-Design">
                <button class="btn">View Concept</button>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'flipster'
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.content {
    .p-heading {
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('../../assets/img/flipster.jpg') no-repeat;
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
