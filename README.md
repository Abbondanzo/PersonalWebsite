# Personal Website

The current entirety of my personal website (in progress/under construction). Deployable website located at [abbondanzo.com](https://abbondanzo.com). Each directory has README instructions on how to get set up and started.

## Layout

The repository is a [pnpm workspace](pnpm-workspace.yaml). Dependencies for the site are installed from the repository root:

```bash
pnpm install      # install everything
pnpm dev          # run the site at localhost:3000
pnpm generate     # build the static site
pnpm typecheck    # typecheck the workspace
```

| Package | Directory | What it is |
| --- | --- | --- |
| `@abbondanzo/frontend` | [frontend](/frontend) | The [Nuxt](https://nuxt.com/) site, generated as static files |
| n/a | [backend](/backend) | [Firebase Functions](https://firebase.google.com/docs/functions/) behind the contact form |

## Deploy

Both halves live and deploy on Google's [Firebase](https://firebase.google.com/). The frontend is designed to live inside [Firebase Hosting](https://firebase.google.com/docs/hosting/) while the backend is designed to live inside [Firebase functions](https://firebase.google.com/docs/functions/).

You should create a Firebase project before proceeding. That can be done [here](https://console.firebase.google.com/u/0/).

To install the Firebase CLI, run the following:

```bash
# You may need to run this with sudo
npm install -g firebase-tools
```

Next, you'll need to login to your account by running:

```bash
# This will open a browser window.
firebase login
```

Since I have committed the proper configuration files, there is no need to initialize. Instead, you just need to deploy!

```bash
firebase deploy
```

And that's it!
