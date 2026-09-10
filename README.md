# Personal Website

The current entirety of my personal website (in progress/under construction). Deployable website located at [abbondanzo.com](https://abbondanzo.com). Each directory has README instructions on how to get set up and started.

## Layout

A [pnpm workspace](pnpm-workspace.yaml) with two packages:

| Package | Directory | What it is |
| --- | --- | --- |
| `@abbondanzo/frontend` | [frontend](/frontend) | The [Nuxt](https://nuxt.com/) site, and the Worker that serves it |
| `@abbondanzo/mail` | [backend](/backend) | The contact form handler, shared by both Workers |

```bash
pnpm install      # install everything, from the root
pnpm dev          # run the site at localhost:3000
pnpm dev:mail     # run the mail Worker on its own at localhost:8787
pnpm typecheck    # typecheck both packages
```

## Deploy

The site and the contact form ship together as one Worker:

```bash
cd frontend && pnpm deploy    # nuxt generate && wrangler deploy
```

That builds the static site into `.output/public`, uploads it as Worker assets, and serves `abbondanzo.com` and `www.abbondanzo.com`. Static files are served without invoking the Worker; only `POST /mail` runs code.

Deploying needs [Wrangler](https://developers.cloudflare.com/workers/wrangler/), which is installed as a workspace dependency. Run `npx wrangler login` once.

The Worker reads four secrets, set with `wrangler secret put <NAME> --name abbondanzo`: `EMAILER_API_KEY`, `SENDER_EMAIL`, `RECEIVER_EMAIL` and `TURNSTILE_SECRET_KEY`. See the [backend README](/backend) for what each does.
