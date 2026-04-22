import { motion } from 'framer-motion'

import { projects } from '../data/projects'

function Projects() {
  return (
    <section
      id="projects"
      className="border-y border-line/70 bg-white/[0.02] py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-[11px] uppercase tracking-[0.42em] text-accent">
            {'\u4f5c\u54c1'}
          </p>
          <h2 className="font-display mt-4 text-4xl text-foreground sm:text-5xl">
            {
              '\u4f18\u79c0\u7684\u4f5c\u54c1\u96c6\uff0c\u5e94\u8be5\u5148\u8bc1\u660e\u5224\u65ad\u529b\uff0c\u518d\u8bc1\u660e\u6280\u672f\u6808\u3002'
            }
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-muted">
            {
              '\u8fd9\u91cc\u53ea\u4fdd\u7559\u6700\u80fd\u4ee3\u8868\u5f53\u524d\u80fd\u529b\u7ed3\u6784\u7684\u9879\u76ee\uff1a\u4e00\u4e2a\u504f\u540e\u7aef\u4e1a\u52a1\u5b9e\u8df5\uff0c\u4e00\u4e2a\u504f\u524d\u7aef\u5448\u73b0\uff0c\u4e00\u4e2a\u504f\u5168\u6808\u95ed\u73af\u3002'
            }
          </p>
        </div>

        <div>
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              className="group border-t border-line/70 py-8 first:border-t-0 first:pt-0 last:pb-0"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.48, delay: index * 0.08 }}
            >
              <div className="grid gap-6 md:grid-cols-[90px_1fr]">
                <div className="font-display text-4xl text-foreground/25 transition group-hover:text-accent">
                  0{index + 1}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[11px] uppercase tracking-[0.38em] text-muted">
                      {project.categoryLabel}
                    </p>
                    {project.featured ? (
                      <span className="text-[11px] uppercase tracking-[0.38em] text-accent">
                        {'\u7cbe\u9009'}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-display mt-3 text-3xl text-foreground sm:text-4xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                    {project.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-strong">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-2 text-sm leading-7 text-muted sm:grid-cols-[120px_1fr]">
                    <span className="text-muted">
                      {'\u8d1f\u8d23\u5185\u5bb9'}
                    </span>
                    <span className="text-foreground/92">{project.role}</span>
                    <span className="text-muted">
                      {'\u9879\u76ee\u4eae\u70b9'}
                    </span>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  {project.repoUrl || project.demoUrl ? (
                    <div className="mt-7 flex flex-wrap gap-5 text-sm text-foreground">
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 transition hover:text-accent"
                        >
                          <span>{'\u67e5\u770b\u4ed3\u5e93'}</span>
                          <span aria-hidden="true">-&gt;</span>
                        </a>
                      ) : null}
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 transition hover:text-accent"
                        >
                          <span>{'\u5728\u7ebf\u9884\u89c8'}</span>
                          <span aria-hidden="true">-&gt;</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
