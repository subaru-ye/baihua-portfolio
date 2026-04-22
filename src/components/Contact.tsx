import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'

import { siteContent } from '../data/content'
import { profile } from '../data/profile'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const { contact } = siteContent

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      website: String(formData.get('website') ?? '').trim(),
    }

    setSubmitStatus('submitting')
    setFeedbackMessage(contact.submittingMessage)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as {
        ok?: boolean
        message?: string
      }

      if (!response.ok || !result.ok) {
        setSubmitStatus('error')
        setFeedbackMessage(result.message ?? contact.errorMessage)
        return
      }

      setSubmitStatus('success')
      setFeedbackMessage(result.message ?? contact.successMessage)
      form.reset()
    } catch {
      setSubmitStatus('error')
      setFeedbackMessage(contact.errorMessage)
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[11px] uppercase tracking-[0.42em] text-accent">
            {contact.label}
          </p>
          <h2 className="font-display mt-4 text-4xl text-foreground sm:text-5xl">
            {contact.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-muted">
            {contact.summary}
          </p>

          <div className="mt-10 space-y-5 border-t border-line/70 pt-6">
            {profile.socialLinks.map((link) => {
              const isEmail = link.href.startsWith('mailto:')

              if (isEmail) {
                return (
                  <div
                    key={link.label}
                    className="flex items-center justify-between gap-4 border-b border-line/70 pb-4 text-sm"
                  >
                    <span className="text-muted">{link.label}</span>
                    <span className="text-right text-foreground">{link.value}</span>
                  </div>
                )
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="flex items-center justify-between gap-4 border-b border-line/70 pb-4 text-sm transition hover:text-accent"
                >
                  <span className="text-muted">{link.label}</span>
                  <span className="text-right text-foreground">{link.value}</span>
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="border border-line/70 bg-white/[0.02] p-6 sm:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <label className="grid gap-2 text-sm text-muted-strong">
              {contact.companyOrNameLabel}
              <input
                type="text"
                name="name"
                required
                placeholder={contact.companyOrNamePlaceholder}
                className="border border-line/80 bg-black/20 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
              />
            </label>

            <label className="grid gap-2 text-sm text-muted-strong">
              {contact.emailLabel}
              <input
                type="email"
                name="email"
                required
                placeholder={contact.emailPlaceholder}
                className="border border-line/80 bg-black/20 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
              />
            </label>

            <label className="grid gap-2 text-sm text-muted-strong">
              {contact.messageLabel}
              <textarea
                name="message"
                required
                rows={6}
                placeholder={contact.messagePlaceholder}
                className="border border-line/80 bg-black/20 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
              />
            </label>

            <div className="flex justify-center border-t border-line/70 pt-5">
              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitStatus === 'submitting'
                  ? contact.submittingLabel
                  : contact.submitLabel}
              </button>
            </div>

            {submitStatus !== 'idle' ? (
              <p
                className={`px-4 py-3 text-sm ${
                  submitStatus === 'success'
                    ? 'border border-accent/40 bg-accent/10 text-accent'
                    : submitStatus === 'error'
                      ? 'border border-red-500/40 bg-red-500/10 text-red-200'
                      : 'border border-line/80 bg-white/[0.03] text-muted-strong'
                }`}
                aria-live="polite"
              >
                {feedbackMessage}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
