import { useState } from 'react'
import type { FormEvent } from 'react'

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
      className="grid gap-6 rounded-[2rem] border border-line bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]"
    >
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-accent">
          Contact
        </p>
        <h2 className="text-3xl font-semibold text-foreground">联系方式</h2>
        <p className="leading-8 text-muted">
          当前先提供静态表单与联系信息，方便继续扩展到 EmailJS、Formspree 或自建后端接口。
        </p>

        <div className="grid gap-3">
          {profile.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="rounded-3xl border border-line bg-ink-soft px-4 py-4 transition hover:border-accent/40 hover:bg-white/[0.04]"
            >
              <p className="text-sm text-muted">{link.label}</p>
              <p className="mt-1 font-medium text-foreground">{link.value}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-line bg-ink-soft p-5 sm:p-6">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-muted-strong">
            姓名
            <input
              type="text"
              name="name"
              required
              placeholder="请输入你的姓名"
              className="rounded-2xl border border-line bg-black/30 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
            />
          </label>

          <label className="grid gap-2 text-sm text-muted-strong">
            邮箱
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              className="rounded-2xl border border-line bg-black/30 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
            />
          </label>

          <label className="grid gap-2 text-sm text-muted-strong">
            留言内容
            <textarea
              name="message"
              required
              rows={6}
              placeholder="介绍一下你的合作意向或想交流的话题"
              className="rounded-2xl border border-line bg-black/30 px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent"
            />
          </label>

          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-accent to-accent-strong px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
          >
            提交留言
          </button>

          <p className="text-sm leading-7 text-muted">
            提示：当前为前端初始化版本，已具备基础必填与邮箱格式校验。
          </p>

          {submitted ? (
            <p className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
              留言已提交到前端占位流程。下一步可接入真实表单服务或邮件发送能力。
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default Contact
