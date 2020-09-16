import * as express from 'express'
import * as exphbs from 'express-handlebars'
import * as functions from 'firebase-functions'

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req: functions.Request, res: functions.Response) => {
  const data = {
    name: req.body.name || 'NAME',
    email: req.body.name || 'EMAIL',
    msg: req.body.msg || 'Sample message from user',
    ip: req.body.ip || req.headers['x-forwarded-for'],
    userAgent: req.body.userAgent || req.get('User-Agent')
  }
  console.log('Rendering template...', data)
  res.render('template', data, (err: any, html: string) => {
    console.log('Error', err)
    console.log('HTML', html)
    return
  })
})

// Export everything
export default functions.https.onRequest(app)
