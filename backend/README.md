# Mail

The contact form handler for [abbondanzo.com](https://abbondanzo.com). It verifies a
[Turnstile](https://developers.cloudflare.com/turnstile/) token, renders the
submission into an HTML email, and hands it to
[Postmark](https://postmarkapp.com/developer).

This package does not deploy on its own. `handleMail` is imported by the site Worker
in [frontend/worker](../frontend/worker), which serves `POST /mail` on the live site.

It uses only web-standard APIs (`fetch`, `Response`, `URLSearchParams`,
`AbortSignal`), so it typechecks against `lib.dom` rather than Workers types and can
be imported from either a Worker or a Nuxt build without dragging in globals that
only exist in one of them.

No runtime dependencies. Postmark and Turnstile are both plain `fetch` calls.

## Configuration

Secrets (`wrangler secret put <NAME>`):

| Name | Description |
| --- | --- |
| `EMAILER_API_KEY` | Postmark server token |
| `SENDER_EMAIL` | Verified Postmark sender |
| `RECEIVER_EMAIL` | Where submissions are delivered |
| `TURNSTILE_SECRET_KEY` | Pairs with the site key baked into the frontend |

`TURNSTILE_HOSTNAMES` (which hostnames a token may come from) is a plain var in
[frontend/wrangler.jsonc](../frontend/wrangler.jsonc). It is comma-separated, and an
empty value rejects every request rather than accepting tokens from anywhere.

## Local development

Run the site Worker, which serves the site and this handler together:

```bash
cd frontend && npx wrangler dev
```

Create `frontend/.dev.vars` with the four secrets. Use Postmark's
`POSTMARK_API_TEST` token to accept messages without delivering them, and Turnstile's
always-passes test secret `1x0000000000000000000000000000000AA`. Note that
`wrangler dev` does **not** hot-reload `.dev.vars`, so restart it after editing.

## A note on escaping

Every field rendered into the email comes from a public form. The handlebars
templates this replaced escaped by default; template literals do not. Anything
interpolated in [src/template.ts](src/template.ts) must go through `escapeHtml`.
