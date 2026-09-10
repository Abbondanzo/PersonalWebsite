# Personal Website

The current entirety of my personal website (in progress/under construction). Deployable website located at [abbondanzo.com](https://abbondanzo.com). Each directory has README instructions on how to get set up and started.

## Layout

A [pnpm workspace](pnpm-workspace.yaml) with two packages:

| Package | Directory | What it is |
| --- | --- | --- |
| `@abbondanzo/frontend` | [frontend](/frontend) | The [Nuxt](https://nuxt.com/) site, generated as static files |
| `@abbondanzo/mail` | [backend](/backend) | A [Cloudflare Worker](https://developers.cloudflare.com/workers/) behind the contact form |

```bash
pnpm install      # install everything, from the root
pnpm dev          # run the site at localhost:3000
pnpm dev:mail     # run the mail Worker at localhost:8787
pnpm typecheck    # typecheck both packages
```

## Deploy

The mail Worker deploys to Cloudflare:

```bash
pnpm --filter @abbondanzo/mail deploy
```

The site is still on [Firebase Hosting](https://firebase.google.com/docs/hosting/) while it is migrated across:

```bash
cd frontend && pnpm generate && pnpm deploy
```

Deploying the site needs the Firebase CLI (`npm install -g firebase-tools`, then `firebase login`); deploying the Worker needs [Wrangler](https://developers.cloudflare.com/workers/wrangler/), which is installed as a workspace dependency and will prompt you to log in on first use.

## Migration status

Moving off Firebase and onto Cloudflare, in two steps:

- [x] **Mail**: the Firebase Functions (`mail`, `devmail`, `template`) are now a single Worker at `mail.abbondanzo.com`, with [Turnstile](https://developers.cloudflare.com/turnstile/) protecting the contact form.
- [ ] **Site**: the Nuxt build is now served by a Worker with static assets, which also handles `/mail` itself. Deployed and verified on `workers.dev`; `abbondanzo.com` still points at Firebase Hosting until DNS is cut over, after which the standalone mail Worker goes away.
