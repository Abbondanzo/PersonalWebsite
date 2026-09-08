/**
 * Bindings available to the mail Worker.
 *
 * The four secrets are set with `wrangler secret put <NAME>` and mirrored in a
 * local, gitignored `.dev.vars` file. The rest are plain vars declared in
 * wrangler.jsonc.
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
  /** Comma-separated origins allowed to POST to this Worker. */
  ALLOWED_ORIGINS: string
  /** Comma-separated hostnames a Turnstile token is allowed to come from. */
  TURNSTILE_HOSTNAMES: string
  /** "development" unlocks the /preview route. */
  ENVIRONMENT: string
}
