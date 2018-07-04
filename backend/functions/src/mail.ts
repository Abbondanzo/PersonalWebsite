'use strict'
import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'

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

/**
 * Reads from HTML file via fs
 *
 * @param callback easy way to send error or HTML response
 */
const getFile = (callback: (error: any, html?: string) => void) => {
    console.log('Reading file...')
    fs.readFile(__dirname + '/template.html', 'utf8', (error, html) => {
        if (error) {
            console.error(`File reading error: ${error}`)
            callback(error)
        }
        callback(null, html)
    })
}

/**
 * Generates an HTML template using the given user information for sending via email.
 *
 * @param name Name of the user who filled the contact form
 * @param email Email of the user
 * @param msg Message the user sent
 * @param ip IP Address of the user
 * @param userAgent Browser user agent of the user
 * @returns {Promise} if resolves correctly, returns HTML template. If rejects, returns the message
 */
const getTemplate = (
    name: string,
    email: string,
    msg: string,
    ip: string,
    userAgent: string
): Promise<String> => {
    const data = {
        name: name,
        email: email,
        msg: msg,
        ip: ip,
        userAgent: userAgent
    }
    console.log('Generating HTML template...')
    return new Promise((resolve, reject) => {
        getFile((error: any, html?: string) => {
            if (error) {
                // If we end up rejecting as a failure of building a template, just return the message
                reject(msg)
                return
            }
            const template = Handlebars.compile(html)
            resolve(template(data))
        })
    })
}

/**
 * Dispatches an email, either via template or text, to the recepient set at the top of this file.
 *
 * @param name Name of the contact form user
 * @param email Email of the contact form user
 * @param message Message to be sent
 */
const sendEmail = (name: string, email: string, message: string): Promise<String> => {
    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender address
        to: `${receiverEmail}`, // Receiver address(s)
        subject: 'Contact Form'
    }

    // First, build the template
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:no-unsafe-any
        getTemplate(name, email, message, '', '')
            .then((template: String) => {
                console.log('Successfully generated HTML template')
                mailOptions['html'] = template
            })
            .catch((msg: string) => {
                console.log('Failed to generate HTML template. Defaulting to text')
                mailOptions['text'] = msg
            })
            .finally(() => {
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

export default functions.https.onRequest((request, response) => {
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

    return sendEmail(name, email, message)
        .then((result: any) => {
            return response.status(200).send(result)
        })
        .catch((error: any) => {
            return response.status(403).send(error)
        })
})
