# Personal Website

The current entirety of my personal website (in progress/under construction). Deployable website located at [abbondanzo.com](https://abbondanzo.com). Each directory has README instructions on how to get set up and started.

## Deploy

This project is broken up into two folders: [frontend](/frontend) and [backend](/backend).

- **Frontend** deploys to [Cloudflare Pages](https://developers.cloudflare.com/pages/) (static Nuxt output + a Pages Function for `/mail`).
- **Backend** Firebase Functions remain available as a legacy contact API, but production mail now runs on Cloudflare.

### Frontend (Cloudflare Pages)

1. Create a Cloudflare account and an API token with **Cloudflare Pages → Edit** permission.
2. Add GitHub Actions secrets on this repo:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - Optional: `GOOGLE_UA_KEY` / `GOOGLE_UA_KEY_DEV`
3. In the Cloudflare Pages project `abbondanzo`, set Function secrets for production (and preview if you want contact forms on PR URLs):
   - `EMAILER_API_KEY` (Postmark server token)
   - `SENDER_EMAIL`
   - `RECEIVER_EMAIL`
4. Push to `master` (production) or open a PR (preview deployment). The [Deploy Cloudflare Pages](/.github/workflows/deploy-pages.yml) workflow runs `nuxt generate` and `wrangler pages deploy`.

Local deploy from `frontend/`:

```bash
npm ci
npm run deploy
```

### Backend (legacy Firebase Functions)

Firebase is no longer required for hosting. See [backend/README.md](/backend/README.md) if you still need the old Cloud Functions endpoints.
