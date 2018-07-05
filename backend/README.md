# Personal Website Backend

It's not really a backend, just a handful of [Express](https://expressjs.com/) endpoints on [Firebase Functions](https://firebase.google.com/docs/functions/). That being said, here's all you need to know to get started.

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

A quick-and-easy endpoint to hit that returns a 200 status code and friendly success message. To be used when testing a development build. The frontend is already equipped to hit a devmail endpoint, so specify your own if you deploy this function.

### `mail`

Here's the bread and butter of sending contact information via email. In order for this to work, you must do the following:

Configure the email transport using the default SMTP transport and a gmail account.
For Gmail, enable these:

1.  https://www.google.com/settings/security/lesssecureapps
2.  https://accounts.google.com/DisplayUnlockCaptcha. For other types of transports such as Sendgrid see https://nodemailer.com/transports/

Set the following environment data by running the following:

```bash
firebase functions:config:set gmail.email="EMAIL USERNAME" gmail.password="EMAIL PASSWORD" contact.receiver="YOUR_EMAIL_ADDRESS@DOMAIN.COM"
```

You can customize the handlebars template or even add your own data. All up to you!

### `template`

An easy `GET` endpoint to hit to test out what your emailed form looks like with mock data.
