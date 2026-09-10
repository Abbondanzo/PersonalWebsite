import { handleMail } from '@abbondanzo/mail'
import type { Env as MailEnv } from '@abbondanzo/mail/env'
import { renderEmailHtml } from '@abbondanzo/mail/template'

interface Env extends MailEnv {
  ASSETS: Fetcher
}

/**
 * Serves the generated site and handles the contact form.
 *
 * Static assets are matched before this runs, except for the paths listed in
 * assets.run_worker_first. Anything that reaches the fetch handler without
 * matching a route is handed back to the asset server, which applies
 * not_found_handling and serves the prerendered 404 page.
 *
 * The form posts same-origin here, so unlike the standalone mail Worker there
 * is no CORS handling: a cross-origin POST never gets this far.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'POST' && url.pathname === '/mail') {
      return handleMail(request, env)
    }

    // Local only: eyeball the contact email without sending one. Any field can
    // be overridden from the query string, e.g. /preview?name=Bob&msg=Hello
    if (
      request.method === 'GET' &&
      url.pathname === '/preview' &&
      env.ENVIRONMENT === 'development'
    ) {
      return new Response(
        renderEmailHtml({
          name: url.searchParams.get('name') ?? 'NAME',
          email: url.searchParams.get('email') ?? 'EMAIL',
          msg: url.searchParams.get('msg') ?? 'Sample message from user',
          ip: request.headers.get('CF-Connecting-IP') ?? 'Unknown',
          userAgent: request.headers.get('User-Agent') ?? 'Unknown'
        }),
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      )
    }

    return env.ASSETS.fetch(request)
  }
} satisfies ExportedHandler<Env>
