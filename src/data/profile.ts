export type SocialLink = {
  label: string
  value: string
  href: string
  external?: boolean
}

type Profile = {
  name: string
  englishName: string
  title: string
  summary: string
  email: string
  education: {
    school: string
    major: string
    grade: string
  }
  highlights: Array<{
    label: string
    value: string
  }>
  socialLinks: SocialLink[]
}

export const profile: Profile = {
  name: '白桦',
  englishName: 'Baihua',
  title: '主攻 Java 后端开发，持续学习前端、多语言与工程化能力。',
  summary:
    '这是一个基于 React + TypeScript + Vite + Tailwind CSS 初始化的个人作品集项目，默认采用深色主题，并为关于我、作品展示、联系方式等核心模块预留了清晰的数据与组件结构。',
  email: 'your-email@example.com',
  education: {
    school: '你的学校名称',
    major: '你的专业信息',
    grade: '你的年级 / 当前状态',
  },
  highlights: [
    { label: '目标方向', value: 'Java 后端开发 / 全栈进阶' },
    { label: '站点定位', value: '个人品牌展示与求职入口' },
    { label: '扩展预留', value: '博客、多语言、深色模式、项目详情页' },
  ],
  socialLinks: [
    {
      label: '邮箱',
      value: 'your-email@example.com',
      href: 'mailto:your-email@example.com',
    },
    {
      label: 'GitHub',
      value: 'github.com/your-name',
      href: 'https://github.com/your-name',
      external: true,
    },
    {
      label: 'Gitee',
      value: 'gitee.com/your-name',
      href: 'https://gitee.com/your-name',
      external: true,
    },
    {
      label: '技术社区',
      value: 'CSDN / 掘金 / 博客园',
      href: 'https://juejin.cn/',
      external: true,
    },
  ],
}
