'use strict'
import * as functions from 'firebase-functions'

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

    const responseBody = 'Received request ' + JSON.stringify(request.body)
    return response.status(200).send(responseBody)
})
