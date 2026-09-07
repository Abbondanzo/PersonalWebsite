import { buildEmailHtml, type EmailData } from './emailTemplate'

interface Env {
  EMAILER_API_KEY: string
  SENDER_EMAIL: string
  RECEIVER_EMAIL: string
}

interface ContactBody {
  name?: string
  email?: string
  message?: string
}

interface PagesContext {
  request: Request
  env: Env
}

const jsonResponse = (body: string, status: number): Response =>
  new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')
  if (!forwarded) {
    return 'Unknown'
  }
  return forwarded.split(',')[0].trim()
}

const sendViaPostmark = async (
  env: Env,
  data: EmailData,
  message: string
): Promise<string> => {
  const html = buildEmailHtml(data)

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': env.EMAILER_API_KEY,
    },
    body: JSON.stringify({
      From: env.SENDER_EMAIL,
      To: env.RECEIVER_EMAIL,
      ReplyTo: `${data.name} <${data.email}>`,
      Subject: 'Contact Form',
      HtmlBody: html,
      TextBody: message,
    }),
  })

  const payload = (await response.json()) as {
    ErrorCode?: number
    Message?: string
    MessageID?: string
  }

  if (!response.ok || payload.ErrorCode) {
    throw new Error(
      `Unable to send mail ${payload.ErrorCode ?? response.status}: ${
        payload.Message ?? response.statusText
      }`
    )
  }

  return `Message sent: ${payload.MessageID ?? 'unknown'}`
}

export const onRequestOptions = async (): Promise<Response> =>
  jsonResponse('', 204)

export const onRequestPost = async (
  context: PagesContext
): Promise<Response> => {
  const { request, env } = context

  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return jsonResponse('Missing request body', 403)
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return jsonResponse(
      'Missing required body fields. Please check request: ' +
        JSON.stringify(body),
      403
    )
  }

  if (!env.EMAILER_API_KEY || !env.SENDER_EMAIL || !env.RECEIVER_EMAIL) {
    console.error('Missing Postmark environment bindings')
    return jsonResponse('Unable to send message', 403)
  }

  const data: EmailData = {
    name,
    email,
    msg: message,
    ip: getClientIp(request),
    userAgent: request.headers.get('User-Agent') || 'Unknown',
  }

  try {
    const result = await sendViaPostmark(env, data, message)
    console.log(result)
    return jsonResponse('Message sent successfully!', 200)
  } catch (error) {
    console.error(error)
    return jsonResponse('Unable to send message', 403)
  }
}
