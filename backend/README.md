# Mail Worker

A single [Cloudflare Worker](https://developers.cloudflare.com/workers/) behind the
contact form on [abbondanzo.com](https://abbondanzo.com). It verifies a
[Turnstile](https://developers.cloudflare.com/turnstile/) token, renders the
submission into an HTML email, and hands it to
[Postmark](https://postmarkapp.com/developer).

No runtime dependencies. Postmark and Turnstile are both plain `fetch` calls.

## Routes

| Route | Description |
| --- | --- |
| `POST /mail` (or `POST /`) | Contact form submission. Body: `name`, `email`, `message`, `turnstileToken`. Responds in plain text: `200` sent, `400` bad input, `403` failed verification, `502` provider failure. |
| `GET /preview` | Renders the email template with mock data so you can eyeball it. Local only, so it 404s unless `ENVIRONMENT=development`. Any field can be overridden from the query string, e.g. `/preview?name=Bob&msg=Hello`. |
| `OPTIONS *` | CORS preflight, restricted to `ALLOWED_ORIGINS`. |

## Configuration

Secrets (`wrangler secret put <NAME>`):

| Name | Description |
| --- | --- |
| `EMAILER_API_KEY` | Postmark server token |
| `SENDER_EMAIL` | Verified Postmark sender |
| `RECEIVER_EMAIL` | Where submissions are delivered |
| `TURNSTILE_SECRET_KEY` | Pairs with the site key baked into the frontend |

Plain vars live in [wrangler.jsonc](wrangler.jsonc): `ALLOWED_ORIGINS` (who may POST)
and `TURNSTILE_HOSTNAMES` (which hostnames a token may come from). Both are
comma-separated; an empty `TURNSTILE_HOSTNAMES` rejects every request rather
than accepting tokens from anywhere.

## Local development

```bash
cp .dev.vars.example .dev.vars   # already filled in with test credentials
pnpm dev                         # or `pnpm dev:mail` from the repo root
```

The example file uses Postmark's `POSTMARK_API_TEST` token, which accepts
messages without delivering them, and Turnstile's always-passes test secret.
Note that `wrangler dev` does **not** hot-reload `.dev.vars`, so restart it
after editing.

Turnstile test keys:

| Site key | Secret key | Behaviour |
| --- | --- | --- |
| `1x00000000000000000000AA` | `1x0000000000000000000000000000000AA` | always passes |
| `2x00000000000000000000AB` | `2x0000000000000000000000000000000AA` | always blocks |
| `3x00000000000000000000FF` | | forces an interactive challenge |

Tokens minted by the test site key report a hostname of `example.com`, so add
that to `TURNSTILE_HOSTNAMES` when testing with raw `curl`.

## Deploying

```bash
pnpm deploy    # wrangler deploy
pnpm check     # wrangler deploy --dry-run, no upload
pnpm tail      # stream production logs
```

The Worker is served from `mail.abbondanzo.com` as a
[Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/),
so Cloudflare manages its DNS record and certificate.

## A note on escaping

Every field rendered into the email comes from a public form. The handlebars
templates this replaced escaped by default; template literals do not. Anything
interpolated in [src/template.ts](src/template.ts) must go through `escapeHtml`.
