<template>
    <div class="content">
        <div class="valign">
    		<div class="container">
    			<div class="hello-text">
    				<h1>Peter Abbondanzo</h1>
    				<h2>UI/UX Developer</h2>
                    <router-link :to="{ path: 'about' }">
                        <button class="btn btn-white">About</button>
                    </router-link>
    			</div>
    		</div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'Home',
    mounted () {
        console.log('Mounted Home component')
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
#app {
    .content {
        height: 100vh;
        a {
            text-align: center;
        }
        .hello-text {
            text-align: center;
            // overflow: auto;
            h1, h2 {
                color: #fff;
                cursor: default;
                pointer-events: none;
            }
            h1 {
                font-size: 96px;
                // white-space: nowrap;
            }
            h2 {
                font-weight: 300;
                font-size: 40px;
                padding-bottom: 48px;
            }
        }
    }
    @media screen and (max-width: 1360px) {
        .content {
            .hello-text {
                    h1 {
                        font-size: 40px;
                        white-space: normal;
                    }
                    h2 {
                        font-size: 20px;
                        padding-bottom: 24px;
                    }
            }
        }
    }
}
</style>
