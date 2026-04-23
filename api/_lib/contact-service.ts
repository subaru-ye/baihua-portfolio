import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { config as loadDotenv } from 'dotenv'
import nodemailer from 'nodemailer'

export type ContactPayload = {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown
}

export type ContactResponse = {
  ok: boolean
  message: string
}

type RequestLike = {
  body: unknown
  headers: Record<string, string | string[] | undefined>
}

type HandlerResult = {
  statusCode: number
  payload: ContactResponse
}

const SMTP_HOST = 'smtp.qq.com'
const SMTP_PORT = 465
const SMTP_SECURE = true
const NAME_MAX_LENGTH = 80
const EMAIL_MAX_LENGTH = 160
const MESSAGE_MAX_LENGTH = 2000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LOCAL_ENV_PATH = resolve(process.cwd(), '.env.local')

let envLoaded = false

function ensureLocalEnvLoaded() {
  if (envLoaded || process.env.VERCEL || !existsSync(LOCAL_ENV_PATH)) {
    envLoaded = true
    return
  }

  loadDotenv({ path: LOCAL_ENV_PATH, override: false })
  envLoaded = true
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizePayload(body: unknown): ContactPayload {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ContactPayload
    } catch {
      return {}
    }
  }

  if (body && typeof body === 'object') {
    return body as ContactPayload
  }

  return {}
}

function getHeaderValue(
  headers: Record<string, string | string[] | undefined>,
  name: string,
): string | undefined {
  const value = headers[name]

  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

function getSourceSite(headers: Record<string, string | string[] | undefined>) {
  const forwardedHost = getHeaderValue(headers, 'x-forwarded-host')
  const host = getHeaderValue(headers, 'host')
  const origin = getHeaderValue(headers, 'origin')
  const referer = getHeaderValue(headers, 'referer')

  return forwardedHost ?? host ?? origin ?? referer ?? 'unknown'
}

function getSubmittedAt() {
  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Shanghai',
  }).format(new Date())
}

function validatePayload(payload: ContactPayload) {
  if (isNonEmptyString(payload.website)) {
    return {
      ok: false,
      statusCode: 400,
      message: '\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002',
    } as const
  }

  if (!isNonEmptyString(payload.name)) {
    return {
      ok: false,
      statusCode: 400,
      message: '\u8bf7\u586b\u5199\u6709\u6548\u7684\u59d3\u540d\u6216\u516c\u53f8\u540d\u79f0\u3002',
    } as const
  }

  if (!isNonEmptyString(payload.email)) {
    return {
      ok: false,
      statusCode: 400,
      message: '\u8bf7\u586b\u5199\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740\u3002',
    } as const
  }

  if (!isNonEmptyString(payload.message)) {
    return {
      ok: false,
      statusCode: 400,
      message: '\u8bf7\u586b\u5199\u7559\u8a00\u5185\u5bb9\u3002',
    } as const
  }

  const name = payload.name.trim()
  const email = payload.email.trim()
  const message = payload.message.trim()

  if (name.length > NAME_MAX_LENGTH) {
    return {
      ok: false,
      statusCode: 400,
      message:
        '\u59d3\u540d\u6216\u516c\u53f8\u540d\u79f0\u8fc7\u957f\uff0c\u8bf7\u7cbe\u7b80\u540e\u91cd\u8bd5\u3002',
    } as const
  }

  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      statusCode: 400,
      message: '\u8bf7\u586b\u5199\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740\u3002',
    } as const
  }

  if (message.length > MESSAGE_MAX_LENGTH) {
    return {
      ok: false,
      statusCode: 400,
      message:
        '\u7559\u8a00\u5185\u5bb9\u8fc7\u957f\uff0c\u8bf7\u63a7\u5236\u5728 2000 \u5b57\u4ee5\u5185\u3002',
    } as const
  }

  return {
    ok: true,
    value: {
      name,
      email,
      message,
    },
  } as const
}

export async function handleContactRequest(
  request: RequestLike,
): Promise<HandlerResult> {
  ensureLocalEnvLoaded()

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const contactToEmail = process.env.CONTACT_TO_EMAIL ?? smtpUser

  if (!smtpUser || !smtpPass || !contactToEmail) {
    return {
      statusCode: 500,
      payload: {
        ok: false,
        message:
          '\u90ae\u4ef6\u670d\u52a1\u5c1a\u672a\u5b8c\u6210\u914d\u7f6e\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002',
      },
    }
  }

  const payload = normalizePayload(request.body)
  const validationResult = validatePayload(payload)

  if (!validationResult.ok) {
    return {
      statusCode: validationResult.statusCode,
      payload: {
        ok: false,
        message: validationResult.message,
      },
    }
  }

  const { name, email, message } = validationResult.value
  const submittedAt = getSubmittedAt()
  const sourceSite = getSourceSite(request.headers)

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: contactToEmail,
      replyTo: email,
      subject: `[Portfolio Contact] ${name}`,
      text: [
        '\u4f60\u6536\u5230\u4e86\u4e00\u6761\u6765\u81ea\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9\u7684\u65b0\u7559\u8a00\u3002',
        '',
        `\u59d3\u540d / \u516c\u53f8\uff1a${name}`,
        `\u8bbf\u5ba2\u90ae\u7bb1\uff1a${email}`,
        `\u63d0\u4ea4\u65f6\u95f4\uff1a${submittedAt}`,
        `\u6765\u6e90\u7ad9\u70b9\uff1a${sourceSite}`,
        '',
        '\u7559\u8a00\u5185\u5bb9\uff1a',
        message,
      ].join('\n'),
    })

    return {
      statusCode: 200,
      payload: {
        ok: true,
        message:
          '\u7559\u8a00\u53d1\u9001\u6210\u529f\uff0c\u6211\u4f1a\u5c3d\u5feb\u67e5\u770b\u5e76\u56de\u590d\u4f60\u3002',
      },
    }
  } catch (error) {
    console.error('Failed to send contact email:', error)

    return {
      statusCode: 500,
      payload: {
        ok: false,
        message:
          '\u90ae\u4ef6\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff0c\u6216\u76f4\u63a5\u901a\u8fc7\u90ae\u7bb1\u8054\u7cfb\u6211\u3002',
      },
    }
  }
}
