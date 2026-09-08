/**
 * Splits a comma-separated binding value into trimmed, non-empty entries.
 */
export const parseList = (value: string | undefined): string[] =>
  (value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

/**
 * Plain-text response. The contact form reads responses as text, so every
 * endpoint here answers in kind.
 */
export const text = (body: string, status: number): Response =>
  new Response(body, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
