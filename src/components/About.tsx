import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'

function About() {
  return (
    <section
      id="about"
      className="grid gap-6 rounded-[2rem] border border-line bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-accent">
            About
          </p>
          <h2 className="text-3xl font-semibold text-foreground">关于我</h2>
          <p className="leading-8 text-muted">
            这是按 PRD 初始化的基础内容结构。当前文案与项目数据均为可运行占位内容，后续只需要改
            `src/data/` 下的数据文件即可完成内容替换。
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-ink-soft p-5">
          <p className="text-sm font-medium text-foreground">教育背景</p>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p>{profile.education.school}</p>
            <p>{profile.education.major}</p>
            <p>{profile.education.grade}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-ink-soft p-5">
          <p className="text-sm font-medium text-foreground">职业目标</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            聚焦 Java 后端工程实践，同时持续完善前端表达、工程化和多语言能力，构建完整的个人技术品牌。
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {skillGroups.map((group) => (
          <article
            key={group.category}
            className="rounded-3xl border border-line bg-ink-soft p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-foreground">
                {group.category}
              </h3>
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                {group.items.length} 项
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {group.items.map((item) => (
                <span
                  key={item.name}
                  className="rounded-full border border-line px-3 py-2 text-sm text-muted-strong"
                >
                  {item.name} · {item.level}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default About
