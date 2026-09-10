const POSTMARK_URL = 'https://api.postmarkapp.com/email'
const TIMEOUT_MS = 10_000

interface PostmarkResponse {
  ErrorCode?: number
  Message?: string
  MessageID?: string
}

export interface SendEmailOptions {
  /** Postmark server token */
  token: string
  from: string
  to: string
  replyTo: string
  subject: string
  htmlBody: string
  textBody: string
}

/**
 * Sends a message through Postmark's REST API. Uses the account's default
 * ("outbound") message stream, matching what the Firebase function sent.
 *
 * @returns the Postmark message ID
 * @throws if Postmark rejects the message; the error carries provider detail
 *   for the logs and must not be shown to the client
 */
export const sendEmail = async (options: SendEmailOptions): Promise<string> => {
  const response = await fetch(POSTMARK_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': options.token
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({
      From: options.from,
      To: options.to,
      ReplyTo: options.replyTo,
      Subject: options.subject,
      HtmlBody: options.htmlBody,
      TextBody: options.textBody
    })
  })

  const result = await response
    .json<PostmarkResponse>()
    .catch(() => ({}) as PostmarkResponse)

  if (!response.ok || result.ErrorCode) {
    const code = result.ErrorCode ?? 'none'
    const detail = result.Message ?? 'no detail'
    throw new Error(
      `Postmark rejected the message (HTTP ${response.status}, code ${code}): ${detail}`
    )
  }

  return result.MessageID ?? 'unknown'
}
