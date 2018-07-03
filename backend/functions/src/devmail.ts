'use strict'
import * as functions from 'firebase-functions'
const cors = require('cors')({ origin: true })

export default functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const responseBody = 'Received request ' + JSON.stringify(request.body)
        return response.status(200).send(responseBody)
    })
})
