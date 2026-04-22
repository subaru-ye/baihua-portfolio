export type Project = {
  title: string
  slug: string
  summary: string
  category: 'backend' | 'frontend' | 'fullstack' | 'learning' | 'competition'
  categoryLabel: string
  techStack: string[]
  role: string
  highlights: string[]
  repoUrl?: string
  demoUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: '白桦网站秒搭',
    slug: 'ye-ai-web-factory',
    summary:
      '基于 Spring Boot + LangChain4j 的 AI 网站生成平台，支持用户通过自然语言实时生成可运行的网站工程，并提供流式生成、一键部署与代码下载能力。',
    category: 'backend',
    categoryLabel: '\u540e\u7aef\u9879\u76ee',
    techStack: [
      'Java',
      'Spring Boot',
      'LangChain4j',
      'Redis',
      'Nacos',
      'SSE',
    ],
    role:
      '负责 AI 生成链路设计、生成模式解耦、对话上下文管理、安全护轨与性能优化。',
    highlights: [
      '基于声明式 AI Service 与精细化 Prompt 工程实现从自然语言到可运行网站工程的生成流程。',
      '针对对话历史查询采用游标分页替代传统 offset 分页，将深分页复杂度从 O(n) 降到 O(1)，实现毫秒级稳定加载。',
      '利用 Nacos 实现敏感词与注入规则热更新，并结合 TokenStream + SSE 支持前端实时渲染 AI 生成过程。',
    ],
    repoUrl: 'https://github.com/subaru-ye/ye-ai-web-factory',
    featured: true,
  },
  {
    title: '白桦图享工坊',
    slug: 'ye-picture',
    summary:
      '基于 Spring Boot + Vue 的云端图库协作系统，结合腾讯云 COS 与 WebSocket，支持图片上传、多维检索、AI 标注、私有空间管理与团队协同编辑。',
    category: 'fullstack',
    categoryLabel: '\u5168\u6808\u9879\u76ee',
    techStack: [
      'Spring Boot',
      'Vue',
      'COS',
      'WebSocket',
      'RabbitMQ',
      'Redis',
      'Caffeine',
    ],
    role:
      '负责资源存储链路、缓存设计、实时协同机制与异步消息可靠性优化。',
    highlights: [
      '通过对象存储承接海量图片资源，并实现上传自动压缩与缩略图生成，降低带宽成本并提升首屏加载速度。',
      '围绕热点图库高并发读场景引入 Caffeine + Redis 多级缓存，命中率提升至 99.9%，平均响应时间降至 50ms 以内。',
      '基于 WebSocket 实现多端毫秒级同步与冲突规避，并通过 RabbitMQ 死信队列与邮件降级机制提升消息可靠性。',
    ],
    repoUrl: 'https://github.com/subaru-ye/ye-picture',
    featured: true,
  },
]
