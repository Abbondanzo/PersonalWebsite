# Personal Website Backend (legacy)

This folder contains the original [Firebase Functions](https://firebase.google.com/docs/functions/) contact API. **Production mail now ships as a Cloudflare Pages Function** in [`frontend/functions/mail.ts`](../frontend/functions/mail.ts). Keep this backend only if you still need the old Cloud Functions endpoints during migration.

It's a handful of [Express](https://expressjs.com/) endpoints using [Postmark](https://postmarkapp.com/) for delivery.

## Deploying

To deploy functions, you first need to install Firebase's CLI. It can be done like so:

```bash
# You may need to run this with sudo
npm install -g firebase-tools
```

Next, you'll need to login to your account by running:

```bash
# This will open a browser window.
firebase login
```

Finally, to deploy, just:

```bash
firebase deploy
```

### Partial functions

You can deploy or update a subset of functions very easily by doing the following:

```bash
firebase deploy --only functions:myFunctionName
```

## Function Descriptions

Here's what they do

### `devmail`

A quick-and-easy endpoint to hit that returns a 200 status code and friendly success message. To be used when testing a development build. Local `nuxt dev` still points at this Cloud Function by default.

### `mail`

Sends contact-form email via Postmark. Prefer the Cloudflare Pages `/mail` Function for new deployments.

Before deploying, set secrets:

```bash
firebase functions:secrets:set EMAILER_API_KEY
firebase functions:secrets:set SENDER_EMAIL
firebase functions:secrets:set RECEIVER_EMAIL
```

### `template`

An easy `GET` endpoint to hit to test out what your emailed form looks like with mock data.
