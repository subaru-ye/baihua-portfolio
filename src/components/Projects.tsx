import { projects } from '../data/projects'

function Projects() {
  return (
    <section
      id="projects"
      className="rounded-[2rem] border border-line bg-white/[0.03] p-6 sm:p-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-accent">
            Projects
          </p>
          <h2 className="text-3xl font-semibold text-foreground">作品展示</h2>
          <p className="max-w-2xl leading-8 text-muted">
            先按 TECH_DESIGN 的数据结构建立卡片展示。后续可继续扩展分类筛选、项目详情页、弹窗或外部文档链接。
          </p>
        </div>
        <a
          href="#contact"
          className="text-sm font-medium text-accent transition hover:text-accent-strong"
        >
          需要完整项目介绍，可直接联系我
        </a>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="flex h-full flex-col rounded-3xl border border-line bg-ink-soft p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-accent">
                  {project.categoryLabel}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
              </div>
              {project.featured ? (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  精选
                </span>
              ) : null}
            </div>

            <p className="mt-4 flex-1 leading-7 text-muted">{project.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-muted-strong"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-2 text-sm text-muted">
              <p>
                <span className="text-foreground">角色：</span>
                {project.role}
              </p>
              <p>
                <span className="text-foreground">亮点：</span>
                {project.highlights[0]}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/5"
              >
                仓库
              </a>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-white/90"
              >
                预览
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
