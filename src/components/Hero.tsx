import { profile } from '../data/profile'

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-[2rem] border border-line bg-white/[0.03] px-6 py-14 shadow-2xl shadow-black/30 sm:px-10 lg:px-12"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Java Backend · Portfolio
            </span>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-muted">
                {profile.englishName}
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <p className="max-w-3xl text-lg text-muted-strong sm:text-xl">
                {profile.title}
              </p>
              <p className="max-w-2xl text-base leading-8 text-muted">
                {profile.summary}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-accent to-accent-strong px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              查看作品
            </a>
            <a
              href="#about"
              className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/5"
            >
              了解我
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/5"
            >
              联系方式
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          {profile.highlights.map((highlight) => (
            <article
              key={highlight.label}
              className="rounded-3xl border border-line bg-white/[0.04] p-5"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-muted">
                {highlight.label}
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {highlight.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
