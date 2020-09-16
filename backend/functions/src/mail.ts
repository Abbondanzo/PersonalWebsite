'use strict'

import * as express from 'express'
import * as exphbs from 'express-handlebars'
import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'

// Configure the email transport using the default SMTP transport and a gmail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/

// TODO: Before deploying, set the following environment data by running the following:
// firebase functions:config:set gmail.email="EMAIL USERNAME" gmail.password="EMAIL PASSWORD"
//      contact.receiver="YOUR_EMAIL_ADDRESS@DOMAIN.COM"
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const receiverEmail = functions.config().contact.receiver

interface EmailData {
  name: string
  email: string
  msg: string
  ip: string
  userAgent: string
}

/**
 * Generates an HTML template using the given user information for sending via email.
 *
 * @param emailData Required data to build HTML form
 * @param response Express response required to render HTML template
 *
 * @returns {Promise} if resolves correctly, returns HTML template. If rejects, returns the message
 */
const buildTemplate = (
  emailData: EmailData,
  response: functions.Response
): Promise<String> => {
  console.log('Generating HTML template...')
  return new Promise((resolve, reject) => {
    response.render('template', emailData, (error: any, html: string) => {
      if (error) {
        console.error('Error building HTML template', error)
        reject(emailData.msg)
      }
      resolve(html)
      return
    })
  })
}

/**
 * Construct a node mailer with the config login credentials
 *
 * @returns {Mail} mail transporter
 */
const buildTransporter = (): nodemailer.Transporter => {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailEmail,
        pass: gmailPassword
      }
    })
  } catch (error) {
    const message = `Unable to create transporter: ${error}`
    console.error(message)
    throw new Error(message)
  }
}

/**
 * Dispatches an email, either via template or text, to the recepient set at the top of this file.
 *
 * @param name Name of the contact form user
 * @param email Email of the contact form user
 * @param message Message to be sent
 * @param ip IP Address of the user
 * @param userAgent Browser user agent of the user
 *
 * @returns {Promise} if resolves correctly, returns email message ID. If rejects, returns error
 */
const sendEmail = (
  name: string,
  email: string,
  message: string,
  request: functions.Request,
  response: functions.Response
): Promise<String> => {
  const mailOptions = {
    from: `"${name}" <${email}>`, // Sender address
    to: `${receiverEmail}`, // Receiver address(s)
    subject: 'Contact Form'
  }

  let ip = ''
  if (request.headers['x-forwarded-for']) {
    console.log('Request headers', request.headers['x-forwarded-for'])
    ip = Array.isArray(request.headers['x-forwarded-for'])
      ? request.headers['x-forwarded-for'][0]
      : request.headers['x-forwarded-for'].toString()
  }

  const data: EmailData = {
    name: name,
    email: email,
    msg: message,
    ip: ip,
    userAgent: request.get('User-Agent')
  }

  // First, build the template
  return new Promise((resolve, reject) => {
    buildTemplate(data, response)
      .then((template: String) => {
        console.log('Successfully generated HTML template')
        mailOptions['html'] = template
      })
      .catch((msg: string) => {
        console.log('Failed to generate HTML template. Defaulting to text')
        mailOptions['text'] = msg
      })
      .then(() => {
        console.log('Sending email...')
        const transporter = buildTransporter()
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error)
          } else if (!info) {
            reject(new Error('Unable to send mail'))
          } else {
            resolve(`Message sent: ${info.messageId}`)
          }
        })
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

// Express output
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.post(
  '*',
  async (request: functions.Request, response: functions.Response) => {
    if (!request.body) {
      response.status(403).send('Missing request body')
    }

    const name = request.body.name,
      email = request.body.email,
      message = request.body.message

    if (!name || !email || !message) {
      response
        .status(403)
        .send(
          'Missing required body fields. Please check request: ' +
            JSON.stringify(request.body)
        )
    }

    return sendEmail(name, email, message, request, response)
      .then((result: any) => {
        console.log(result)
        return response.status(200).send('Message sent successfully!')
      })
      .catch((error: any) => {
        console.error(error)
        return response.status(403).send('Unable to send message')
      })
  }
)

export default functions.https.onRequest((req, res) => {
  // Hitting the endpoint without a trailing "/" with cause the path to be null. Prepending the
  // trailing "/" lets us match the POST request
  if (!req.path) {
    req.url = `/${req.url}`
  }
  return app(req, res)
})
