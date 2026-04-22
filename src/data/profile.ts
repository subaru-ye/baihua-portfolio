export type SocialLink = {
  label: string
  value: string
  href: string
  external?: boolean
}

type Profile = {
  name: string
  englishName: string
  role: string
  headline: string
  summary: string
  email: string
  education: {
    school: string
    major: string
    grade: string
  }
  bio: string[]
  focusAreas: string[]
  highlights: Array<{
    label: string
    value: string
  }>
  socialLinks: SocialLink[]
}

export const profile: Profile = {
  name: '\u767d\u6866',
  englishName: 'Baihua',
  role: 'Java \u540e\u7aef\u5f00\u53d1',
  headline:
    '\u4e3b\u653b Java \u540e\u7aef\u5f00\u53d1\uff0c\u4e5f\u5728\u6301\u7eed\u6253\u78e8\u524d\u7aef\u5b9e\u73b0\u3001\u5de5\u7a0b\u5316\u80fd\u529b\u4e0e\u9879\u76ee\u8868\u8fbe\u3002',
  summary:
    '\u6211\u5e0c\u671b\u8fd9\u4efd\u4f5c\u54c1\u96c6\u4e0d\u53ea\u662f\u5c55\u793a\u6280\u672f\u6808\uff0c\u800c\u662f\u5c55\u793a\u6211\u5982\u4f55\u7406\u89e3\u9700\u6c42\uff0c\u62c6\u89e3\u95ee\u9898\uff0c\u5b9e\u73b0\u529f\u80fd\uff0c\u5e76\u628a\u6210\u679c\u6e05\u6670\u5730\u8bb2\u51fa\u6765\u3002',
  email: '838184610@qq.com',
  education: {
    school: '华东交通大学 · 软件工程本科',
    major:
      '主线技能集中在 Java 后端、数据库与缓存、消息通信以及 AI 应用工程化实践',
    grade:
      '具备 CET-6 能力，当前以实习求职导向持续打磨代表项目与工程表达',
  },
  bio: [
    '我目前是华东交通大学软件工程本科在读，主线聚焦 Java 后端开发，关注接口设计、并发处理、数据存储与系统稳定性。',
    '在项目实践里，我持续使用 Spring Boot、MyBatis、MySQL、Redis、RabbitMQ、WebSocket 等技术栈推进完整业务链路落地，也在补强 PostgreSQL、Elasticsearch 与向量检索相关能力。',
    '相比只停留在功能实现，我更关注性能优化、架构解耦与工程可维护性，希望把项目做成既能运行、也能经得住扩展和表达的作品。',
  ],
  focusAreas: [
    'Java 核心、并发编程、Spring Boot / Spring MVC / MyBatis 后端开发实践',
    'MySQL、PostgreSQL（pgvector）、Redis、Elasticsearch 的数据存储与检索能力',
    'Spring AI / LangChain4j、RAG、工具调用、WebSocket、RabbitMQ 等 AI 与实时交互工程化落地',
  ],
  highlights: [
    {
      label: '\u65b9\u5411',
      value: 'Java 后端 / AI 工程化 / 实时协同',
    },
    {
      label: '\u5f53\u524d',
      value: '围绕高并发、缓存、检索、消息通信与 AI 应用场景持续做项目沉淀',
    },
    {
      label: '\u76ee\u6807',
      value: '让招聘方快速看到我的后端基本功、工程思维与把复杂需求落到代码中的能力',
    },
  ],
  socialLinks: [
    {
      label: '\u90ae\u7bb1',
      value: '838184610@qq.com',
      href: 'mailto:838184610@qq.com',
    },
    {
      label: 'GitHub',
      value: 'github.com/subaru-ye',
      href: 'https://github.com/subaru-ye',
      external: true,
    },
    {
      label: '\u4f5c\u54c1\u4ed3\u5e93',
      value: 'baihua-portfolio',
      href: 'https://github.com/subaru-ye/baihua-portfolio',
      external: true,
    },
  ],
}
