<template>
    <div class="content">
        <div class="valign">
		<div class="container">
			<div class="hello-text">
				<h1>Peter Abbondanzo</h1>
				<h1>UI/UX Developer</h1>
			</div>
			<router-link :to="{ path: 'about' }">
				<button class="btn btn-white">About</button>
			</router-link>
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

/* function showWord (word, length, count, $html) {
    $html.innerHTML = '<span>' + word.slice(0, count) + '</span>' + word.slice(count, length) + '<span class="blink">|</span>'
    $html.querySelector('span').style.visibility = 'visible'
    // var margin = document.querySelector('.active-text').offsetWidth
    // var width = $html.offsetWidth
    // document.querySelector('.blink').style.marginLeft = margin - width + 27
    if (count < length) {
        setTimeout(function () {
            showWord(word, length, count + 1, $html)
        }, 80)
    } else {
        setTimeout(function () {
            $html.classList.remove('active-text')
            // animHello(1)
            console.log(document.querySelectorAll('.hello-text h1').indexOf($html.outerHTML))
        }, 1000)
    }
}

function animHello (index) {
    var $html = document.querySelectorAll('.hello-text h1')[index]
    var content = $html.textContent
    if (content !== undefined) {
        var length = content.length
        // document.querySelector('span.blink').remove()
        $html.className += 'active-text'
        showWord(content, length, 1, $html)
    }
} */

</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
body {
    height: 100%;
    .content {
        height: 100vh;
    }
    .hello-text {
        padding-bottom: 48px;
        // overflow: auto;
        h1 {
            color: #fff;
            font-size: 96px;
            cursor: default;
            // white-space: nowrap;
        }
    }
    .underbg {
        z-index: -1;
        display: none;
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
