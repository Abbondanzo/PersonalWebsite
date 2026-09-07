# Personal Website

This site is built using [Vue](https://vuejs.org/) / [Nuxt](https://nuxt.com/). Once upon a time, many years ago, I started this project and I will continue to maintain it until the day JavaScript is outlawed. Hence, it's always in progress even when my last commit was 12+ months ago. There's not much else to add besides head on over to https://abbondanzo.com and check it out.

## Env Information

Inside this folder, there is an `.env.example` file. This must be _copied_ and named as `.env` with your correct Google Analytics tracking IDs. Even if you have no IDs, you should still perform this step or the build will warn.

Optional: set `NUXT_PUBLIC_MAIL_ENDPOINT` to override the contact-form POST URL (defaults to `/mail` in production builds).

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate

# preview the generated site + Pages Functions locally (Wrangler)
$ npm run pages:dev

# generate and deploy to Cloudflare Pages
$ npm run deploy
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxt.com/docs).

### Cloudflare Pages

Hosting is configured via [`wrangler.toml`](./wrangler.toml). Static assets come from `.output/public` after `nuxt generate`. The contact form is handled by the Pages Function in [`functions/mail.ts`](./functions/mail.ts) (Postmark).

GitHub Actions deploys on pushes to `master` and on pull requests (preview URLs). Required repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

[You can view the currently live here](http://abbondanzo.com)

## Version Releases

You can check out older versions of the site, or view major updates on the releases tab of this repository or by clicking [here](https://github.com/Abbondanzo/PersonalWebsite/releases).

## Notes

You can follow my Twitter for some random updates as to my progress on the site [here](https://twitter.com/PAbbondanzo)
