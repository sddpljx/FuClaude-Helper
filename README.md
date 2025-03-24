# FuClaude Helper

这是一个使用 Next.js 和 Clerk 身份认证服务的项目，用于连接到 Claude 助手服务。

## 功能特点

- 使用 Clerk 提供安全的用户身份验证
- 登录后自动跳转到原始 Claude 网站
- 使用 Next.js 构建，可部署到 Vercel

## 部署指南

### 1. 创建 Clerk 账号

1. 前往 [Clerk.dev](https://clerk.dev) 注册账号
2. 创建一个新的应用
3. 获取 API 密钥 (Publishable Key 和 Secret Key)

### 2. 设置环境变量

在 Vercel 中设置以下环境变量：

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
ORIGINAL_WEBSITE=https://sddpljx-fuclaude.hf.space
SESSION_KEY=sk-ant-sid01
```

### 3. 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入该仓库
3. 设置上述环境变量
4. 部署

## 开发指南

```bash
# 本地开发
npm run dev

# 构建项目
npm run build

# 启动生产服务
npm run start
```

## 自定义设置

如需修改 Claude 助手的原始网站地址或 session key，请更新环境变量中的 `ORIGINAL_WEBSITE` 和 `SESSION_KEY`。

## 技术栈

- Next.js
- React
- Clerk 身份认证
- Vercel 部署 