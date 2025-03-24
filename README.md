# FuClaude Helper

这是一个使用 Next.js 和 Clerk 身份认证服务的项目，用于连接到 Claude 助手服务。

## 重要：Clerk 配置说明

要使 Clerk 登录按钮正确显示，必须按照以下步骤设置 Clerk：

1. 在 [Clerk 官网](https://clerk.dev) 注册账号并创建新应用
2. 获取 API 密钥（Publishable Key 和 Secret Key）
3. 在 Vercel 中设置以下环境变量，**必须使用您自己的 Clerk API 密钥**：

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_ORIGINAL_WEBSITE=https://sddpljx-fuclaude.hf.space
```

4. 确保您在 Clerk 仪表板中配置了以下重定向 URL：
   - 添加 `https://您的域名.vercel.app` 到允许的重定向 URL 列表中

## 功能特点

- 使用 Clerk 提供安全的用户身份验证
- 登录后自动跳转到原始 Claude 网站
- 使用 Next.js 构建，可部署到 Vercel

## 部署指南

### 1. 创建 Clerk 账号

1. 前往 [Clerk.dev](https://clerk.dev) 注册账号
2. 创建一个新的应用
3. 获取 API 密钥 (Publishable Key 和 Secret Key)
4. 配置重定向 URL

### 2. 设置环境变量

在 Vercel 中设置上述环境变量，**使用您自己的 Clerk API 密钥**。

### 3. 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入该仓库
3. 设置上述环境变量
4. 部署

## 故障排除

如果登录按钮没有出现，请检查：

1. 环境变量是否正确设置
2. 浏览器控制台是否有错误信息
3. 确认 Clerk API 密钥是否有效

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