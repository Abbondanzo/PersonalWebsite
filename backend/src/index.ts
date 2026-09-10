import { allowedOrigin, preflight, withCors } from './cors'
import type { Env } from './env'
import { text } from './http'
import { handleMail } from './mail'
import { renderEmailHtml, type EmailData } from './template'

/**
 * Builds the mock data for the /preview route, letting any field be overridden
 * from the query string so the escaping can be exercised by hand.
 */
const previewData = (url: URL, request: Request): EmailData => ({
  name: url.searchParams.get('name') ?? 'NAME',
  email: url.searchParams.get('email') ?? 'EMAIL',
  msg: url.searchParams.get('msg') ?? 'Sample message from user',
  ip: request.headers.get('CF-Connecting-IP') ?? 'Unknown',
  userAgent:
    url.searchParams.get('userAgent') ??
    request.headers.get('User-Agent') ??
    'Unknown'
})

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return preflight(request, env)
    }

    // "/" is accepted alongside "/mail" so the Worker responds the same whether
    // it is reached at mail.abbondanzo.com or, later, at abbondanzo.com/mail.
    if (
      request.method === 'POST' &&
      (url.pathname === '/mail' || url.pathname === '/')
    ) {
      const response = await handleMail(request, env)
      return withCors(response, allowedOrigin(request, env))
    }

    // Local-only: eyeball the email template without sending anything.
    if (
      request.method === 'GET' &&
      url.pathname === '/preview' &&
      env.ENVIRONMENT === 'development'
    ) {
      return new Response(renderEmailHtml(previewData(url, request)), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }

    return text('Not found', 404)
  }
} satisfies ExportedHandler<Env>
