# Personal Website

This site is built using [Vue](https://vuejs.org/). Once upon a time, many years ago, I started this project and I will continue to maintain it until the day JavaScript is outlawed. Hence, it's always in progress even when my last commit was 12+ months ago. There's not much else to add besides head on over to https://abbondanzo.com and check it out.

## Env Information

Inside this folder, there is an `.env.example` file. This must be _copied_ and named as `.env` with your correct Google Analytics tracking IDs. The IDs may be left blank, but the build warns if they are missing.

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
