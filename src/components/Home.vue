<template>
    <div class="content valign">
		<div class="container">
			<div class="hello-text">
				<h1>Hello,</h1>
				<h1>You've found me.</h1>
			</div>
			<router-link :to="{ path: 'about' }">
				<button class="btn btn-white">About</button>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        animHello (index) {
            var $html = document.querySelectorAll('.hello-text h1')[index]
            var content = $html.textContent
            if (content !== undefined) {
                var length = content.length
                // document.querySelector('span.blink').remove()
                $html.className += 'active-text'
                this.showWord(content, length, 1, $html)
            }
        },
        showWord (word, length, count, $html) {
            $html.innerHtml = '<span>' + word.slice(0, count) + '</span>' + word.slice(count, length) + '<span class="blink">|</span>'
            // var margin = document.querySelector('.active-text span').offsetWidth
            var width = $html.offsetWidth
            console.log(width)
            // document.querySelector('.blink').css('margin-left', margin - width + 27)
            if (count < length) {
                setTimeout(function () {
                    // this.showWord(word, length, count + 1, $html)
                    console.log(word.slice(0, count))
                }, 80)
            } else {
                setTimeout(function () {
                    $html.classList.remove('active-text')
                    this.animHello($html.index() + 1)
                }, 1000)
            }
        }
    },
    mounted () {
        this.animHello(0)
    }
}
</script>

<style lang="scss" scoped>
body {
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
