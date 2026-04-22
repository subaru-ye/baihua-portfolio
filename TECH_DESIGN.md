# 技术设计

## 技术方案说明
当前阶段以“尽快完成一个可上线、易维护的个人作品集网站”为目标，因此技术方案尽量轻量，不引入数据库、后台管理系统或独立后端服务。

## 技术栈
- React + TypeScript + Vite
- Tailwind CSS
- React Router（如果采用多页面路由）
- Framer Motion（用于基础动画效果）

## 项目结构

```text
src/
  components/
    Header.tsx
    Hero.tsx
    About.tsx
    Projects.tsx
    Contact.tsx
    Footer.tsx
  data/
    projects.ts
    skills.ts
    profile.ts
  assets/
    images/
  App.tsx
  main.tsx
```

## 模块说明
- `Header.tsx`：顶部导航，包含页面跳转入口。
- `Hero.tsx`：首页首屏，展示欢迎语、个人定位和主要按钮。
- `About.tsx`：展示个人简介、照片、技能标签。
- `Projects.tsx`：展示项目列表，支持分类和外链跳转。
- `Contact.tsx`：展示联系方式、社交链接和联系表单。
- `Footer.tsx`：页脚信息。

## 数据管理
- 项目数据、技能数据、个人信息数据统一放在 `src/data/` 下。
- 使用 TypeScript 文件存储，方便直接维护和类型约束。
- 数据结构以数组和对象为主，方便后续新增项目和技能。

示例：

```ts
export const projects = [
  {
    title: "个人博客系统",
    description: "基于 React 和 Spring Boot 的全栈博客项目",
    techStack: ["React", "TypeScript", "Spring Boot", "MySQL"],
    category: "fullstack",
    githubUrl: "",
    demoUrl: "",
  },
];
```

## 页面组织方式
- 如果采用单页作品集形式，可在 `App.tsx` 中按模块顺序组织页面内容。
- 如果采用多页面形式，可使用 `React Router` 拆分为：
  - `/` 首页
  - `/about` 关于我
  - `/projects` 作品展示
  - `/contact` 联系方式

## 样式方案
- 使用 Tailwind CSS 进行页面样式开发。
- 颜色、间距、字体大小保持统一，避免页面风格不一致。
- 优先保证响应式布局，适配手机、平板和桌面端。

## 动画方案
- 使用 Framer Motion 实现基础过渡动画。
- 动画主要用于：
  - 首屏内容进入
  - 项目卡片出现
  - 页面滚动时的轻量交互

原则：
- 动画以简洁自然为主，不影响页面加载和阅读。

## 响应式设计
- 手机端优先保证导航、项目卡片、表单输入的可用性。
- 平板端优化内容间距和布局。
- 桌面端展示更完整的视觉层次。

## 部署方案
- 推荐部署到 Vercel 或 Netlify。
- 项目代码托管在 GitHub。
- 每次提交后可自动触发构建和部署。

## 后续扩展
- 增加博客模块
- 增加深色模式
- 增加多语言支持
- 后续如果需要复杂表单或后台管理，再考虑接入独立后端服务
