<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made.">
        <meta name="keywords" content="graphic designer,design,developer,develop,code,css,html,photoshop,peter,abbondanzo,peter abbondanzo,website,photoshop,ui,ui designer,ui developer,graphic,graphics">
        <link rel="icon" href="{{ asset('favicon.ico') }}">
        <title>Peter Abbondanzo</title>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="content">
                <div id="app"></div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="/js/manifest.js"></script>
    <script type="text/javascript" src="/js/vendor.js"></script>
    <script type="text/javascript" src="/js/app.js"></script>
    @if (getenv('APP_ENV') === 'local')
    <script id="__bs_script__">
    //<![CDATA[
        document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.6'><\/script>".replace("HOST", location.hostname));
    //]]>
    </script>
    @endif
</html>
