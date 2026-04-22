import type { IncomingMessage, ServerResponse } from 'node:http'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { handleContactRequest } from './server/contact-service'

async function readJsonBody(request: IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')

  if (!rawBody) {
    return {}
  }

  return JSON.parse(rawBody) as unknown
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: unknown,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'contact-api-dev-middleware',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (request, response) => {
          if (request.method !== 'POST') {
            response.setHeader('Allow', 'POST')
            sendJson(response, 405, {
              ok: false,
              message: 'Method Not Allowed',
            })
            return
          }

          try {
            const body = await readJsonBody(request)
            const result = await handleContactRequest({
              body,
              headers: request.headers,
            })

            sendJson(response, result.statusCode, result.payload)
          } catch (error) {
            console.error('Failed to handle /api/contact in Vite dev server:', error)
            sendJson(response, 500, {
              ok: false,
              message:
                '\u90ae\u4ef6\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff0c\u6216\u76f4\u63a5\u901a\u8fc7\u90ae\u7bb1\u8054\u7cfb\u6211\u3002',
            })
          }
        })
      },
    },
  ],
})
