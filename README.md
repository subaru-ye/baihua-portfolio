# Baihua Portfolio

个人作品集网站，使用 `React + TypeScript + Vite + Tailwind CSS` 构建，并通过 `Vercel` 部署。

## 开发命令

```bash
npm install
npm run dev
npm run build
npm run lint
```

## 联系表单邮件发送

联系表单已接入 `Vercel Function`，服务端通过 `QQ SMTP` 把访客留言发送到你的邮箱。

1. 复制 `.env.example` 为 `.env.local`
2. 配置以下环境变量：

```bash
SMTP_USER=你的QQ邮箱
SMTP_PASS=QQ邮箱SMTP授权码
CONTACT_TO_EMAIL=用于接收联系表单的邮箱
```

说明：
- `SMTP_PASS` 必须使用 QQ 邮箱开启 SMTP 后生成的授权码，不能直接填写邮箱登录密码。
- `CONTACT_TO_EMAIL` 可以和 `SMTP_USER` 相同，也可以拆分为另一个接收邮箱。
- 这些变量只应存在于本地 `.env.local` 和 Vercel Project Settings 中，不要写进前端代码。

## 本地联调

前端 `npm run dev` 只会启动 Vite。若要在本地同时调试 `/api/contact`，请使用 `Vercel CLI`：

```bash
npx vercel dev
```

这样可以同时运行前端页面和 `api/contact.ts`。

## Vercel 部署

在 `Vercel` 项目设置中添加同名环境变量：

- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`

环境变量更新后，需要重新部署项目，线上站点才会使用新值。
