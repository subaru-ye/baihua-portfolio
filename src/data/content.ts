export const siteContent = {
  header: {
    brandName: '\u767d\u6866',
    brandSubline: 'Baihua Portfolio',
    navAriaLabel: '\u4e3b\u5bfc\u822a',
    mobileNavAriaLabel: '\u79fb\u52a8\u7aef\u4e3b\u5bfc\u822a',
    navItems: [
      { label: '\u9996\u9875', href: '#home' },
      { label: '\u5173\u4e8e\u6211', href: '#about' },
      { label: '\u4f5c\u54c1', href: '#projects' },
    ],
    contactCta: '\u53d1\u8d77\u8054\u7cfb',
    openMenuLabel: '\u83dc\u5355',
    closeMenuLabel: '\u5173\u95ed',
  },
  hero: {
    roleLabel: '\u540e\u7aef\u5f00\u53d1',
    primaryCta: '\u67e5\u770b\u4f5c\u54c1',
    secondaryCta: '\u4e86\u89e3\u6211',
    focusTitle: '\u5f53\u524d\u5173\u6ce8',
    positioningTitle: '\u4e2a\u4eba\u5b9a\u4f4d',
    positioningDescription:
      '\u6211\u5e0c\u671b\u7528\u7a33\u5b9a\u7684\u540e\u7aef\u601d\u7ef4\u505a\u5b9e\u73b0\uff0c\u4e5f\u7528\u6e05\u6670\u7684\u524d\u7aef\u8868\u8fbe\u53bb\u8bb2\u6e05\u695a\u9879\u76ee\u4ef7\u503c\u3002',
  },
  about: {
    label: '\u5173\u4e8e',
    title:
      '围绕 Java 后端、AI 工程化与高并发场景持续打磨实现能力。',
    itemSuffix: '\u9879',
  },
  projects: {
    label: '\u4f5c\u54c1',
    title:
      '作品不只展示技术名词，更应该展示我如何把复杂需求落成稳定系统。',
    summary:
      '这里保留两类最能代表当前能力结构的项目：一个偏 AI 网站生成与高并发优化，一个偏图库协同、缓存设计与实时交互。',
    featuredLabel: '\u7cbe\u9009',
    roleLabel: '\u8d1f\u8d23\u5185\u5bb9',
    highlightsLabel: '\u9879\u76ee\u4eae\u70b9',
    repoLinkLabel: '\u67e5\u770b\u4ed3\u5e93',
    previewLinkLabel: '\u5728\u7ebf\u9884\u89c8',
  },
  contact: {
    label: '\u8054\u7cfb',
    title:
      '\u5982\u679c\u4f60\u5728\u627e\u4e00\u4f4d\u65e2\u80fd\u628a\u5b9e\u73b0\u505a\u7a33\uff0c\u4e5f\u80fd\u628a\u9879\u76ee\u8bf4\u6e05\u695a\u7684\u5f00\u53d1\u8005\uff0c\u53ef\u4ee5\u76f4\u63a5\u8054\u7cfb\u6211\u3002',
    summary:
      '\u8fd9\u4e2a\u8868\u5355\u4f1a\u76f4\u63a5\u5c06\u7559\u8a00\u53d1\u9001\u5230\u6211\u7684\u90ae\u7bb1\uff0c\u9002\u5408\u5408\u4f5c\u6c9f\u901a\uff0c\u5c97\u4f4d\u9080\u7ea6\u6216\u9879\u76ee\u4ea4\u6d41\u3002',
    companyOrNameLabel: '\u516c\u53f8 / \u59d3\u540d',
    companyOrNamePlaceholder:
      '\u8bf7\u8f93\u5165\u516c\u53f8\u540d\u79f0\u6216\u4f60\u7684\u59d3\u540d',
    emailLabel: '\u90ae\u7bb1',
    emailPlaceholder: 'name@example.com',
    messageLabel: '\u7559\u8a00\u5185\u5bb9',
    messagePlaceholder:
      '\u4ecb\u7ecd\u4f60\u7684\u5408\u4f5c\u65b9\u5411\uff0c\u5c97\u4f4d\u673a\u4f1a\u6216\u60f3\u4ea4\u6d41\u7684\u8bdd\u9898',
    submitLabel: '\u63d0\u4ea4\u7559\u8a00',
    submittingLabel: '\u53d1\u9001\u4e2d...',
    submittingMessage:
      '\u6b63\u5728\u53d1\u9001\u4f60\u7684\u7559\u8a00\uff0c\u8bf7\u7a0d\u5019\u3002',
    successMessage:
      '\u7559\u8a00\u53d1\u9001\u6210\u529f\uff0c\u6211\u4f1a\u5c3d\u5feb\u67e5\u770b\u5e76\u56de\u590d\u4f60\u3002',
    errorMessage:
      '\u7559\u8a00\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff0c\u6216\u76f4\u63a5\u901a\u8fc7\u90ae\u7bb1\u8054\u7cfb\u6211\u3002',
  },
  footer: {
    builtWith:
      '\u57fa\u4e8e React\u3001TypeScript\u3001Vite \u4e0e Tailwind CSS \u6784\u5efa\u3002',
  },
} as const
