# Personal Website

This site is built using [Vue](https://vuejs.org/). Once upon a time, many years ago, I started this project and I will continue to maintain it until the day JavaScript is outlawed. Hence, it's always in progress even when my last commit was 12+ months ago. There's not much else to add besides head on over to https://abbondanzo.com and check it out.

## Env Information

Inside this folder, there is an `.env.example` file. This must be _copied_ and named as `.env` and filled in. The Google Analytics IDs may be left blank, but the build warns if they are missing.

`NUXT_PUBLIC_TURNSTILE_SITE_KEY` is the [Turnstile](https://developers.cloudflare.com/turnstile/)
site key protecting the contact form; `1x00000000000000000000AA` always passes
and is fine for local work. `NUXT_PUBLIC_MAIL_ENDPOINT` points the form at the
[mail Worker](../backend). Leave it blank to use the deployed one, or set it to
`http://localhost:8787/mail` to run against a local `pnpm dev:mail`.

Because this is a static build, both values are baked in at build time rather
than read at runtime.

## Deploying

The site and the contact form ship together as one Cloudflare Worker:

```bash
$ pnpm deploy   # nuxt generate && wrangler deploy
```

The static build is uploaded as Worker assets and served for `abbondanzo.com` and
`www.abbondanzo.com`. Only `POST /mail` invokes Worker code; everything else is
served straight from assets. Both hostnames serve the site, and every page carries a
canonical link pointing at the apex.

## Build Setup

Dependencies are installed from the repository root, since this is a
[pnpm workspace](../pnpm-workspace.yaml).

```bash
# install dependencies (from the repo root)
$ pnpm install

# serve with hot reload at localhost:3000
$ pnpm dev

# typecheck
$ pnpm typecheck

# generate the static site into .output/public
$ pnpm generate
$ pnpm preview
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxt.com/docs).

[You can view the currently live here](http://abbondanzo.com)

## Version Releases

You can check out older versions of the site, or view major updates on the releases tab of this repository or by clicking [here](https://github.com/Abbondanzo/PersonalWebsite/releases).

## Notes

You can follow my Twitter for some random updates as to my progress on the site [here](https://twitter.com/PAbbondanzo)
