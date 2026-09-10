import type { Env } from './env'
import { parseList, text } from './http'
import { sendEmail } from './postmark'
import { renderEmailHtml, type EmailData } from './template'
import { verifyTurnstile } from './turnstile'

const MAX_LENGTHS = {
  name: 200,
  email: 320,
  message: 5000
} as const

/**
 * Reads a required string field, returning null if it is absent, the wrong
 * type, blank, or longer than we are willing to accept.
 */
const readField = (
  body: Record<string, unknown>,
  key: string,
  maxLength: number
): string | null => {
  const value = body[key]
  if (typeof value !== 'string') {
    return null
  }
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maxLength) {
    return null
  }
  return trimmed
}

/**
 * Handles a contact form submission: validate, verify the Turnstile token,
 * render the email, hand it to Postmark.
 *
 * Kept free of any routing framework so the site Worker can call it directly
 * once the two are merged. Responses are plain text, which is how the contact
 * form reads them, and never carry provider detail.
 */
export const handleMail = async (
  request: Request,
  env: Env
): Promise<Response> => {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return text('Malformed request body', 400)
  }

  if (typeof body !== 'object' || body === null) {
    return text('Malformed request body', 400)
  }

  const name = readField(body, 'name', MAX_LENGTHS.name)
  const email = readField(body, 'email', MAX_LENGTHS.email)
  const message = readField(body, 'message', MAX_LENGTHS.message)

  if (!name || !email || !message) {
    return text(
      'Missing or invalid required fields: name, email, message',
      400
    )
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? 'Unknown'

  const verified = await verifyTurnstile(
    body.turnstileToken,
    ip,
    env.TURNSTILE_SECRET_KEY,
    parseList(env.TURNSTILE_HOSTNAMES)
  )
  if (!verified) {
    return text('Verification failed. Please try again.', 403)
  }

  const data: EmailData = {
    name,
    email,
    msg: message,
    ip,
    userAgent: request.headers.get('User-Agent') ?? 'Unknown'
  }

  try {
    const messageId = await sendEmail({
      token: env.EMAILER_API_KEY,
      from: env.SENDER_EMAIL,
      to: env.RECEIVER_EMAIL,
      replyTo: `${name} <${email}>`,
      subject: 'Contact Form',
      htmlBody: renderEmailHtml(data),
      textBody: message
    })
    console.log(`Message sent: ${messageId}`)
  } catch (error) {
    console.error('Unable to send message', error)
    return text('Unable to send message', 502)
  }

  return text('Message sent successfully!', 200)
}
