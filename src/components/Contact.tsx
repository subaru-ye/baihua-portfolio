import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'

import { profile } from '../data/profile'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
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
            {'\u8054\u7cfb'}
          </p>
          <h2 className="font-display mt-4 text-4xl text-foreground sm:text-5xl">
            {
              '\u5982\u679c\u4f60\u5728\u627e\u4e00\u4f4d\u65e2\u80fd\u628a\u5b9e\u73b0\u505a\u7a33\uff0c\u4e5f\u80fd\u628a\u9879\u76ee\u8bf4\u6e05\u695a\u7684\u5f00\u53d1\u8005\uff0c\u53ef\u4ee5\u76f4\u63a5\u8054\u7cfb\u6211\u3002'
            }
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-muted">
            {
              '\u5f53\u524d\u8868\u5355\u4ecd\u662f\u524d\u7aef\u5360\u4f4d\u6d41\u7a0b\uff0c\u4f46\u90ae\u7bb1\u4e0e GitHub \u5df2\u53ef\u76f4\u63a5\u8bbf\u95ee\uff0c\u540e\u7eed\u53ef\u63a5\u5165\u771f\u5b9e\u90ae\u4ef6\u6216\u8868\u5355\u670d\u52a1\u3002'
            }
          </p>

          <div className="mt-10 space-y-5 border-t border-line/70 pt-6">
            {profile.socialLinks.map((link) => (
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
            ))}
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
            <label className="grid gap-2 text-sm text-muted-strong">
              {'\u59d3\u540d'}
              <input
                type="text"
                name="name"
                required
                placeholder={'\u8bf7\u8f93\u5165\u4f60\u7684\u59d3\u540d'}
                className="border border-line/80 bg-black/20 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
              />
            </label>

            <label className="grid gap-2 text-sm text-muted-strong">
              {'\u90ae\u7bb1'}
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                className="border border-line/80 bg-black/20 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
              />
            </label>

            <label className="grid gap-2 text-sm text-muted-strong">
              {'\u7559\u8a00\u5185\u5bb9'}
              <textarea
                name="message"
                required
                rows={6}
                placeholder={
                  '\u4ecb\u7ecd\u4f60\u7684\u5408\u4f5c\u65b9\u5411\uff0c\u5c97\u4f4d\u673a\u4f1a\u6216\u60f3\u4ea4\u6d41\u7684\u8bdd\u9898'
                }
                className="border border-line/80 bg-black/20 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-5">
              <button
                type="submit"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-strong"
              >
                {'\u63d0\u4ea4\u7559\u8a00'}
              </button>
              <p className="text-sm leading-7 text-muted">
                {'\u5185\u7f6e\u57fa\u7840\u5fc5\u586b\u4e0e\u90ae\u7bb1\u683c\u5f0f\u6821\u9a8c\u3002'}
              </p>
            </div>

            {submitted ? (
              <p className="border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                {
                  '\u7559\u8a00\u5df2\u8fdb\u5165\u524d\u7aef\u5360\u4f4d\u6d41\u7a0b\u3002\u4e0b\u4e00\u6b65\u53ef\u63a5\u5165\u771f\u5b9e\u90ae\u4ef6\u53d1\u9001\u6216\u7b2c\u4e09\u65b9\u8868\u5355\u670d\u52a1\u3002'
                }
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
