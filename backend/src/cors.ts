import type { Env } from './env'
import { parseList } from './http'

/**
 * Returns the request's Origin if it is on the allowlist, otherwise null.
 */
export const allowedOrigin = (request: Request, env: Env): string | null => {
  const origin = request.headers.get('Origin')
  if (!origin) {
    return null
  }
  return parseList(env.ALLOWED_ORIGINS).includes(origin) ? origin : null
}

/**
 * Copies a response, adding the CORS headers for an allowed origin. Requests
 * without an allowed origin (curl, same-origin) get the response untouched.
 */
export const withCors = (response: Response, origin: string | null): Response => {
  if (!origin) {
    return response
  }
  const headers = new Headers(response.headers)
  headers.set('Access-Control-Allow-Origin', origin)
  headers.append('Vary', 'Origin')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

/**
 * Answers the preflight the contact form triggers by sending JSON.
 */
export const preflight = (request: Request, env: Env): Response => {
  const origin = allowedOrigin(request, env)
  if (!origin) {
    return new Response(null, { status: 403 })
  }
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin'
    }
  })
}
