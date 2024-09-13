import * as express from 'express'
import { engine } from 'express-handlebars'
import { https } from 'firebase-functions'
import { EmailData, getIp } from './emailData'

const app = express()
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('trust proxy', true)

app.get('/', (req: https.Request, res: express.Response) => {
  const data: EmailData = {
    name: req.body.name || 'NAME',
    email: req.body.name || 'EMAIL',
    msg: req.body.msg || 'Sample message from user',
    ip: getIp(req),
    userAgent: req.body.userAgent || req.get('User-Agent') || 'Unknown'
  }
  console.log('Rendering template...', data)
  return res.render('template', data, (err, html) => {
    if (err) {
      console.error(err)
      res.status(500).send('An error has occurred')
    } else {
      console.log('Rendering template')
      res.status(200).send(html)
    }
  })
})

// Export everything
export default https.onRequest(app)
