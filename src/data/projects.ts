export type Project = {
  title: string
  slug: string
  summary: string
  category: 'backend' | 'frontend' | 'fullstack' | 'learning' | 'competition'
  categoryLabel: string
  techStack: string[]
  role: string
  highlights: string[]
  repoUrl: string
  demoUrl: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: '校园服务平台',
    slug: 'campus-service-platform',
    summary:
      '一个面向校园场景的后端服务项目，用于沉淀用户、活动与内容管理等核心能力。',
    category: 'backend',
    categoryLabel: '后端项目',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
    role: '后端开发 / 接口设计与模块拆分',
    highlights: ['完成核心业务接口设计，并整理出统一的数据返回与异常处理规范。'],
    repoUrl: 'https://github.com/your-name/campus-service-platform',
    demoUrl: 'https://github.com/your-name/campus-service-platform',
    featured: true,
  },
  {
    title: '个人博客前台',
    slug: 'personal-blog-web',
    summary:
      '使用 React 与 TypeScript 开发的内容展示型前台，用于练习组件拆分、路由组织与响应式布局。',
    category: 'frontend',
    categoryLabel: '前端项目',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    role: '前端开发 / 页面结构与视觉实现',
    highlights: ['建立数据驱动的页面结构，降低后续维护和内容替换成本。'],
    repoUrl: 'https://github.com/your-name/personal-blog-web',
    demoUrl: 'https://your-demo-url.example.com',
    featured: true,
  },
  {
    title: '全栈练手项目',
    slug: 'fullstack-practice-app',
    summary:
      '用于串联前后端联调、接口设计、部署流程与基础工程化的一体化练手项目。',
    category: 'fullstack',
    categoryLabel: '全栈项目',
    techStack: ['React', 'Java', 'Spring Boot', 'MySQL'],
    role: '独立开发 / 前后端联调与部署',
    highlights: ['覆盖从需求拆分、接口约定到部署上线的完整闭环。'],
    repoUrl: 'https://github.com/your-name/fullstack-practice-app',
    demoUrl: 'https://your-demo-url.example.com',
    featured: false,
  },
]
