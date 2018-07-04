'use strict'
import * as functions from 'firebase-functions'
import * as express from 'express'
import * as exphbs from 'express-handlebars'
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

// Nodemailer transporter with required credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
})

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
const buildTemplate = (emailData: EmailData, response: functions.Response): Promise<String> => {
    console.log('Generating HTML template...')
    return new Promise((resolve, reject) => {
        response.render('template', emailData, (error: any, html: string) => {
            if (error) {
                console.error('Error building HTML template', error)
                reject(emailData.msg)
                return
            }
            resolve(html)
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
        ip = request.headers['x-forwarded-for'].length
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
                // Send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error)
                        reject(`Error with sendmailer: ${error}`)
                    }
                    console.log('Message sent: %s', info.messageId)
                    resolve(`Message sent: ${info.messageId}`)
                })
            })
            .catch((error: any) => {
                reject(`Error with template: ${error}`)
            })
    })
}

// Express output
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.post('/', (request: functions.Request, response: functions.Response) => {
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
            return response.status(200).send(result)
        })
        .catch((error: any) => {
            return response.status(403).send(error)
        })
})

export default functions.https.onRequest(app)
