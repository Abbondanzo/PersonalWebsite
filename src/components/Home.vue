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

// Animations "Hello, you found me." intro
function animHello (index) {
    var html = $('.hello-text h1').eq(index);
    var content = html.html();
    if(content != undefined) {
        var length = content.length;
        $('span.blink').remove();
        html.addClass('active-text');
        showWord(content, length, 1, $html);
    }
}

// Animates a given word of given length inside given html section
function showWord (word, length, count, $html) {
    $html.html('<span>'+word.slice(0, count)+'</span>'+word.slice(count, length)+'<span class="blink">|</span>');
    var margin = $('.active-text span').width();
    var width = $html.width();
    console.log(width);
    //$('.blink').css('margin-left', margin - width + 27);
    if(count < length) {
        setTimeout(function() {
            showWord(word, length, count+1, $html);
        }, 80);
    } else {
        setTimeout(function() {
            $html.removeClass('active-text');
            animHello($html.index()+1);
        }, 1000);
    }
}

// Start landing animation
setTimeout(function() {
    animHello(0);
}, 1000);
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
