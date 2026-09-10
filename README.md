# Personal Website

The current entirety of my personal website (in progress/under construction). Deployable website located at [abbondanzo.com](https://abbondanzo.com). Each directory has README instructions on how to get set up and started.

## Layout

A [pnpm workspace](pnpm-workspace.yaml) with two packages:

| Package | Directory | What it is |
| --- | --- | --- |
| `@abbondanzo/frontend` | [frontend](/frontend) | The [Nuxt](https://nuxt.com/) site, and the Worker that serves it |
| `@abbondanzo/mail` | [backend](/backend) | The contact form handler, imported by that Worker |

```bash
pnpm install      # install everything, from the root
pnpm dev          # run the site at localhost:3000
pnpm typecheck    # typecheck both packages
```

Everything ships as a single [Cloudflare Worker](https://developers.cloudflare.com/workers/): the generated site is uploaded as static assets, and `POST /mail` is the only path that runs code.

## Deploy

Pushes to `master` are built and deployed by [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), so a normal merge is all that is needed.

To deploy by hand:

```bash
pnpm run deploy   # nuxt generate && wrangler deploy
```

Note `pnpm run deploy`, not `pnpm deploy`: the latter is a built-in pnpm command for deploying workspace packages and will not run this script.

### Workers Builds settings

Set under **Workers & Pages → abbondanzo → Settings → Build**. The Worker lives in a workspace package, so the commands run from the repository root and target it by filter:

| Setting | Value |
| --- | --- |
| Root directory | *(leave blank, the repository root)* |
| Build command | `pnpm run build` |
| Deploy command | `pnpm --filter @abbondanzo/frontend exec wrangler deploy` |
| Non-production branch deploy command | `pnpm --filter @abbondanzo/frontend exec wrangler versions upload` |

Both deploy commands have to name the package. Wrangler's defaults fail at the
repository root: `npx wrangler deploy` reports "detection logic has been run in the
root of a workspace instead of targeting a specific project", and `npx wrangler
versions upload` reports "Missing entry-point to Worker script or to assets
directory".

Branch builds upload a version and get a preview URL, enabled by `preview_urls` in
[frontend/wrangler.jsonc](frontend/wrangler.jsonc). The contact form will not work on
a preview URL: that hostname is in neither `TURNSTILE_HOSTNAMES` nor the widget's
domain list, so verification fails and no mail is sent. That is deliberate.

`build` runs `nuxt generate`, not `nuxt build`. The Worker serves `.output/public` as
static assets, so a server build is never what is wanted: it selects the
`cloudflare-module` preset, skips the crawler, and prerenders nothing.

`.nvmrc` pins Node for the build image. Two values are baked into the static build and must be set as **Build variables** (they are public, and are not runtime secrets):

| Build variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | [Turnstile](https://developers.cloudflare.com/turnstile/) widget on the contact form |
| `GOOGLE_UA_KEY` | Google Analytics tag; the build only warns if it is missing |

### Runtime secrets

Read by the Worker at runtime, set with `wrangler secret put <NAME> --name abbondanzo` or under **Settings → Variables & Secrets**:

`EMAILER_API_KEY`, `SENDER_EMAIL`, `RECEIVER_EMAIL`, `TURNSTILE_SECRET_KEY`. See the [backend README](/backend) for what each does.
