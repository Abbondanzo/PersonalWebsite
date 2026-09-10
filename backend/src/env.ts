/**
 * Bindings the contact form handler needs from the Worker that hosts it.
 *
 * The four secrets are set with `wrangler secret put <NAME> --name abbondanzo`
 * and mirrored in a local, gitignored `frontend/.dev.vars`. TURNSTILE_HOSTNAMES
 * and ENVIRONMENT are plain vars in frontend/wrangler.jsonc.
 */
export interface Env {
  /** Postmark server token. */
  EMAILER_API_KEY: string
  /** Verified Postmark sender address. */
  SENDER_EMAIL: string
  /** Where contact form submissions are delivered. */
  RECEIVER_EMAIL: string
  /** Turnstile secret key, paired with the site key baked into the frontend. */
  TURNSTILE_SECRET_KEY: string
  /** Comma-separated hostnames a Turnstile token is allowed to come from. */
  TURNSTILE_HOSTNAMES: string
  /** "development" unlocks the local-only /preview route. */
  ENVIRONMENT: string
}
