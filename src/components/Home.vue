<template>
    <div class="content valign">
		<div class="container">
			<div class="hello-text">
				<h1>Hello,</h1>
				<h1>You've found me.</h1>
			</div>
			<a href="/about">
				<button class="btn btn-white">About</button>
			</a>
		</div>
	</div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style lang="scss">
body {
    background: url('../assets/img/bg.jpg') center center no-repeat;
    background-size: cover;
    height: 100%;
    .hello-text {
        padding-bottom: 48px;
        overflow: auto;
        h1 {
            color: #fff;
            font-size: 96px;
            cursor: default;
            visibility: hidden;
            white-space: nowrap;
            float: left;
            clear: left;
            span {
                visibility: visible;
                float: left;
            }
        }
    }
}
@media screen and (max-width: 1360px) {
    .landing {
        .hello-text {
            h1 {
                font-size: 60px;
                white-space: normal;
            }
        }
    }
}
</style>
