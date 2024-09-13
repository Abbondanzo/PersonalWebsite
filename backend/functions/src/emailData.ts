import * as express from 'express'

export interface EmailData {
  name: string
  email: string
  msg: string
  ip: string
  userAgent: string
}

/**
 * Grabs the IP Address of the user who made the request from a really basic heuristic.
 *
 * @returns ip address as a string, or 'Unknown' if one cannot be read
 */
export const getIp = (request: express.Request): string => {
  const maybeHeader = request.headers['x-forwarded-for']
  if (maybeHeader) {
    console.log('Request headers', maybeHeader)
    return Array.isArray(maybeHeader) ? maybeHeader[0] : maybeHeader.toString()
  }
  return (
    request.body.ip ||
    request.socket.remoteAddress ||
    request.ip ||
    request.ips.join(', ') ||
    'Unknown'
  )
}
