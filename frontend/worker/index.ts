import { handleMail } from '@abbondanzo/mail'
import type { Env as MailEnv } from '@abbondanzo/mail/env'

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

    return env.ASSETS.fetch(request)
  }
} satisfies ExportedHandler<Env>
