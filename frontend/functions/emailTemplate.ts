export interface EmailData {
  name: string
  email: string
  msg: string
  ip: string
  userAgent: string
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/**
 * Builds the contact-form HTML email (ported from the Firebase Handlebars template).
 */
export const buildEmailHtml = (data: EmailData): string => {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const msg = escapeHtml(data.msg).replace(/\n/g, '<br>')
  const ip = escapeHtml(data.ip)
  const userAgent = escapeHtml(data.userAgent)

  return `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <style>
    img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; }
    body {
      background-color: #f6f6f6;
      font-family: sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 14px;
      line-height: 1.4;
      margin: 0;
      padding: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    table { border-collapse: separate; width: 100%; }
    table td { font-family: sans-serif; font-size: 14px; vertical-align: top; }
    .body { background-color: #f6f6f6; width: 100%; }
    .container {
      display: block;
      margin: 0 auto !important;
      max-width: 580px;
      padding: 10px;
      width: 580px;
    }
    .content {
      box-sizing: border-box;
      display: block;
      margin: 0 auto;
      max-width: 580px;
      padding: 10px;
    }
    .main { background: #fff; border-radius: 3px; width: 100%; }
    .wrapper { box-sizing: border-box; padding: 20px; }
    .footer { clear: both; padding-top: 10px; text-align: center; width: 100%; }
    .footer td, .footer p, .footer span, .footer a {
      color: #999999;
      font-size: 12px;
      text-align: center;
    }
    p {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: normal;
      margin: 0 0 15px;
    }
    a { color: #3498db; text-decoration: underline; }
    .preheader {
      color: transparent;
      display: none;
      height: 0;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      visibility: hidden;
      width: 0;
    }
    @media only screen and (max-width: 620px) {
      table[class=body] .container { padding: 0 !important; width: 100% !important; }
      table[class=body] .content { padding: 0 !important; }
      table[class=body] .wrapper { padding: 10px !important; }
      table[class=body] .main { border-radius: 0 !important; }
    }
  </style>
</head>
<body>
  <table border="0" cellpadding="0" cellspacing="0" class="body">
    <tr>
      <td>&nbsp;</td>
      <td class="container">
        <div class="content">
          <span class="preheader">Received Contact Form from abbondanzo.com</span>
          <table class="main">
            <tr>
              <td class="wrapper">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p><b>Sent by:</b></p>
                      <p>${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
                      <p><b>Message Body:</b></p>
                      <p>${msg}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div class="footer">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td class="content-block">
                  <span>Logged user information (for spam protection):</span>
                  <br> IP Address: ${ip} | Email: ${email} | User-Agent: ${userAgent}.
                </td>
              </tr>
              <tr>
                <td class="content-block">
                  Submitted by Contact Form at
                  <a href="https://abbondanzo.com/">abbondanzo.com</a>.
                </td>
              </tr>
            </table>
          </div>
        </div>
      </td>
      <td>&nbsp;</td>
    </tr>
  </table>
</body>
</html>`
}
