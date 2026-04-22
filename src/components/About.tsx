import { motion } from 'framer-motion'

import { siteContent } from '../data/content'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'

function About() {
  const { about } = siteContent

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-[11px] uppercase tracking-[0.42em] text-accent">
            {about.label}
          </p>
          <h2 className="font-display mt-4 text-4xl text-foreground sm:text-5xl">
            {about.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-8 text-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-line/70 pt-5 text-sm leading-7 text-muted">
            <p>{profile.education.school}</p>
            <p>{profile.education.major}</p>
            <p>{profile.education.grade}</p>
          </div>
        </div>

        <div className="space-y-10">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.category}
              className="border-t border-line/70 pt-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <div className="grid gap-5 sm:grid-cols-[170px_1fr]">
                <div>
                  <p className="font-display text-2xl text-foreground">
                    {group.category}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.35em] text-muted">
                    {group.items.length} {about.itemSuffix}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-3">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-2 text-sm leading-7 text-muted-strong"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{item.name}</span>
                      <span className="text-muted">/ {item.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
