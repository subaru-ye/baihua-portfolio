import type { VercelRequest, VercelResponse } from '@vercel/node'

import {
  type ContactResponse,
  handleContactRequest,
} from '../server/contact-service'

function sendJson(
  response: VercelResponse,
  statusCode: number,
  payload: ContactResponse,
) {
  return response.status(statusCode).json(payload)
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, {
      ok: false,
      message: 'Method Not Allowed',
    })
  }

  const result = await handleContactRequest({
    body: request.body,
    headers: request.headers,
  })

  return sendJson(response, result.statusCode, result.payload)
}
