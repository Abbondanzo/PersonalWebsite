const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const MAX_TOKEN_LENGTH = 2048
const TIMEOUT_MS = 10_000

interface SiteverifyResponse {
  success: boolean
  hostname?: string
  'error-codes'?: string[]
}

/**
 * Validates a Turnstile token against Cloudflare's siteverify endpoint.
 *
 * Tokens are single-use, so the frontend must reset its widget after every
 * submission attempt. Anything unexpected counts as a failure: a bad token, a
 * timeout, or a hostname we do not recognise. This never throws.
 *
 * @param token The `cf-turnstile-response` value sent by the widget
 * @param remoteIp Client IP, from CF-Connecting-IP
 * @param secret Turnstile secret key
 * @param allowedHostnames Hostnames the token is allowed to originate from
 */
export const verifyTurnstile = async (
  token: unknown,
  remoteIp: string,
  secret: string,
  allowedHostnames: string[]
): Promise<boolean> => {
  if (
    typeof token !== 'string' ||
    token.length === 0 ||
    token.length > MAX_TOKEN_LENGTH
  ) {
    return false
  }

  // An empty allowlist would otherwise accept tokens from any hostname.
  if (allowedHostnames.length === 0) {
    console.error('TURNSTILE_HOSTNAMES is empty; refusing to verify')
    return false
  }

  let result: SiteverifyResponse
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: remoteIp
      })
    })
    if (!response.ok) {
      throw new Error(`siteverify responded ${response.status}`)
    }
    result = await response.json<SiteverifyResponse>()
  } catch (error) {
    console.error('Turnstile verification failed', error)
    return false
  }

  if (!result.success) {
    console.warn('Turnstile rejected token', result['error-codes'])
    return false
  }

  if (!result.hostname || !allowedHostnames.includes(result.hostname)) {
    console.warn('Turnstile hostname not allowed', result.hostname)
    return false
  }

  return true
}
