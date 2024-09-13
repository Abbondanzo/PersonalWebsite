'use strict'

import * as express from 'express'
import { engine } from 'express-handlebars'
import { https, params } from 'firebase-functions'
import { ServerClient } from 'postmark'
import { EmailData, getIp } from './emailData'

// Grab a PostMark API Key and follow these instructions
// https://postmarkapp.com/developer

// Before deploying, set the following environment data by running the following:
// firebase functions:secrets:set EMAILER_API_KEY/SENDER_EMAIL/RECEIVER_EMAIL
const EMAILER_API_KEY = params.defineSecret('EMAILER_API_KEY') //  functions.config().sendgrid.api
const SENDER_EMAIL = params.defineSecret('SENDER_EMAIL')
const RECEIVER_EMAIL = params.defineSecret('RECEIVER_EMAIL')

/**
 * Generates an HTML template using the given user information for sending via email.
 *
 * @param emailData Required data to build HTML form
 * @param response Express response required to render HTML template
 *
 * @returns {Promise} if resolves correctly, returns HTML template. If rejects, returns the message
 */
const buildTemplate = async (
  emailData: EmailData,
  response: express.Response
): Promise<string> => {
  console.log('Generating HTML template...')
  return new Promise((resolve, reject) => {
    response.render('template', emailData, (error, html) => {
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
const sendEmail = async (
  name: string,
  email: string,
  message: string,
  request: https.Request,
  response: express.Response
): Promise<string> => {
  let html: string | undefined
  try {
    const data: EmailData = {
      name,
      email,
      msg: message,
      ip: getIp(request),
      userAgent: request.get('User-Agent')
    }
    html = await buildTemplate(data, response)
    console.log('Successfully generated HTML template')
  } catch (error) {
    console.log('Failed to generate HTML template. Defaulting to text')
  }

  const token = EMAILER_API_KEY.value()
  if (!token) {
    throw new Error(`No token provided for ${EMAILER_API_KEY.name}`)
  }

  const senderEmail = SENDER_EMAIL.value()
  const receiverEmail = RECEIVER_EMAIL.value()
  if (!senderEmail || !receiverEmail) {
    throw new Error('Missing required sender or receiver')
  }

  const client = new ServerClient(token)
  client.editMessageStream
  const sendResponse = await client.sendEmail({
    From: senderEmail,
    To: receiverEmail,
    ReplyTo: `${name} <${email}>`,
    Subject: 'Contact Form',
    HtmlBody: html,
    TextBody: message
  })

  if (sendResponse.ErrorCode) {
    throw new Error(
      `Unable to send mail ${sendResponse.ErrorCode}: ${sendResponse.Message}`
    )
  }

  return `Message sent: ${sendResponse.MessageID}`
}

// Express output
const app = express()
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('trust proxy', true)

app.post('*', async (request: https.Request, response: express.Response) => {
  if (!request.body) {
    return response.status(403).send('Missing request body')
  }

  const name = request.body.name,
    email = request.body.email,
    message = request.body.message

  if (!name || !email || !message) {
    return response
      .status(403)
      .send(
        'Missing required body fields. Please check request: ' +
          JSON.stringify(request.body)
      )
  }

  try {
    const result = await sendEmail(name, email, message, request, response)
    console.log(result)
    return response.status(200).send('Message sent successfully!')
  } catch (error) {
    console.error(error)
    return response.status(403).send('Unable to send message')
  }
})

export default https.onRequest(
  { secrets: [EMAILER_API_KEY, SENDER_EMAIL, RECEIVER_EMAIL] },
  (req, res) => {
    // Hitting the endpoint without a trailing "/" with cause the path to be null. Prepending the
    // trailing "/" lets us match the POST request
    if (!req.path) {
      req.url = `/${req.url}`
    }
    return app(req, res)
  }
)
