import { motion, useScroll, useTransform } from 'framer-motion'

import { siteContent } from '../data/content'
import { profile } from '../data/profile'

function Hero() {
  const { scrollY } = useScroll()
  const orbY = useTransform(scrollY, [0, 500], [0, 120])
  const orbitRotate = useTransform(scrollY, [0, 800], [0, 24])
  const { hero } = siteContent

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-line/70"
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:82px_82px]" />

      <motion.div
        className="pointer-events-none absolute -right-24 top-20 hidden h-[620px] w-[620px] rounded-full border border-accent/20 bg-[radial-gradient(circle,rgba(64,194,255,0.22)_0%,rgba(64,194,255,0.08)_28%,rgba(64,194,255,0)_66%)] blur-2xl lg:block"
        style={{ y: orbY, rotate: orbitRotate }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[18%] hidden h-[460px] w-[460px] rounded-full border border-white/10 lg:block"
        style={{ rotate: orbitRotate }}
      />

      <div className="mx-auto grid min-h-[calc(100svh-73px)] w-full max-w-[1400px] items-end gap-12 px-4 pb-12 pt-24 sm:px-6 sm:pb-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.8fr)] lg:px-8 lg:pb-16 lg:pt-28">
        <div className="relative z-10 max-w-3xl">
          <motion.p
            className="mb-5 text-[11px] uppercase tracking-[0.48em] text-accent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {profile.name} · Java {hero.roleLabel}
          </motion.p>

          <motion.h1
            className="font-display text-6xl leading-[0.9] text-foreground sm:text-7xl lg:text-[8.5rem]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-xl leading-8 text-foreground/90 sm:text-2xl sm:leading-9"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
          >
            {profile.headline}
          </motion.p>

          <motion.p
            className="mt-5 max-w-lg text-base leading-8 text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
          >
            {profile.summary}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: 'easeOut' }}
          >
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-strong"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#about"
              className="rounded-full border border-line px-6 py-3 text-sm text-foreground transition hover:border-accent hover:text-accent"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 border-t border-line/70 pt-6 sm:grid-cols-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
          >
            {profile.highlights.map((highlight) => (
              <div key={highlight.label}>
                <p className="text-[11px] uppercase tracking-[0.35em] text-muted">
                  {highlight.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-strong">
                  {highlight.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 hidden min-h-[560px] lg:block">
          <motion.div
            className="absolute inset-y-14 right-0 w-[78%] rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] shadow-[0_40px_120px_rgba(0,0,0,0.38)]"
            initial={{ opacity: 0, x: 36, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 10 }}
            transition={{ duration: 0.9, delay: 0.18, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute left-0 top-10 w-[58%] border-t border-line/80 pt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted">
              {hero.focusTitle}
            </p>
            <div className="mt-5 space-y-5">
              {profile.focusAreas.map((item, index) => (
                <div key={item} className="flex items-baseline gap-4">
                  <span className="font-display text-2xl text-accent/70">
                    0{index + 1}
                  </span>
                  <p className="max-w-xs text-sm leading-7 text-foreground/90">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-0 max-w-[320px] border-t border-line/70 pt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: 'easeOut' }}
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-muted">
              {hero.positioningTitle}
            </p>
            <p className="mt-3 text-lg leading-8 text-foreground">
              {profile.role}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              {hero.positioningDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
