# Baihua Portfolio

个人作品集网站，使用 `React + TypeScript + Vite + Tailwind CSS` 构建，并通过 `Vercel` 部署。

## 项目简介

该项目用于展示个人简介、技能栈、代表项目与联系方式。

当前线上地址：

- 默认域名：[https://baihua.vercel.app/](https://baihua.vercel.app/)


## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Vercel Functions
- Nodemailer

## 开发命令

```bash
npm install
npm run dev
npm run build
npm run lint
```

## 本地开发

本项目目前支持两种本地调试方式：

### 1. 仅调试前端页面

```bash
npm run dev
```

默认访问地址：

- [http://localhost:5173/](http://localhost:5173/)

当前已在 `Vite dev server` 中接入本地 `/api/contact` 中间件，因此在 `5173` 下也可以直接测试联系表单提交通道。

### 2. 使用 Vercel CLI 调试

```bash
npx vercel dev
```

该方式更接近线上运行环境，适合联调 `Vercel Function` 行为。

## 联系表单邮件发送

联系表单已接入真实邮件发送流程，服务端通过 `QQ SMTP` 将访客留言发送到你的邮箱。

### 本地环境变量

复制 `.env.example` 为 `.env.local`，并填写以下内容：

```bash
SMTP_USER=你的QQ邮箱
SMTP_PASS=QQ邮箱SMTP授权码
CONTACT_TO_EMAIL=用于接收联系表单的邮箱
```

说明：

- `SMTP_PASS` 必须使用 QQ 邮箱开启 SMTP 后生成的授权码，不能直接填写邮箱登录密码。
- `CONTACT_TO_EMAIL` 可以与 `SMTP_USER` 相同，也可以配置为另一个接收邮箱。
- `.env.local` 属于本地敏感配置文件，不应提交到 Git 仓库。

## Vercel 部署

项目已连接 GitHub 仓库，推送到 `main` 分支后会自动触发生产部署。

### 需要配置的环境变量

在 `Vercel Project Settings` -> `Environment Variables` 中添加：

- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`

建议同时配置到：

- Production
- Preview
- Development

### 部署注意事项

- 修改环境变量后，需要重新部署项目，线上站点才会读取新值。
- 如果线上表单报错，优先检查环境变量是否配置完整，以及最新提交是否已成功部署。

## 仓库说明

项目仓库地址：

- [https://github.com/subaru-ye/baihua-portfolio](https://github.com/subaru-ye/baihua-portfolio)

## 当前状态

- 页面内容已根据简历重写“了解我”和“作品”模块
- 联系表单已支持真实邮件发送
- 本地 `5173` 与线上 `Vercel` 部署均支持提交表单
