# Personal Website

The current entirety of my personal website (in progress/under construction). Deployable website located at [abbondanzo.com](https://abbondanzo.com). Each directory has README instructions on how to get set up and started.

## Deploy

This project is broken up into two folders: [frontend](/frontend) and [backend](/backend). Both live and deploy very easily on Google's [Firebase](https://firebase.google.com/). The frontend is designed to live inside [Firebase Hosting](https://firebase.google.com/docs/hosting/) while the backend is designed to live inside [Firebase functions](https://firebase.google.com/docs/functions/).

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
