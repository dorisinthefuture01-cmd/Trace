# Cloudflare Pages 部署指南

## 准备工作

1. **创建 Cloudflare 账户**：如果还没有 Cloudflare 账户，先在 [Cloudflare 官网](https://www.cloudflare.com/) 注册一个。

2. **安装 Wrangler CLI**：Cloudflare 的命令行工具，用于部署和管理 Cloudflare Pages 项目。
   ```bash
   npm install -g wrangler
   ```

3. **登录 Wrangler**：
   ```bash
   wrangler login
   ```

## 部署步骤

### 方法 1：通过 Cloudflare Pages 控制台部署

1. **访问 Cloudflare Pages**：
   - 登录 Cloudflare 账户
   - 导航到 "Pages"
   - 点击 "Create a project"

2. **连接 GitHub 仓库**：
   - 选择 "Connect to Git"
   - 选择你的 GitHub 仓库
   - 点击 "Begin setup"

3. **配置构建设置**：
   - **Framework**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: 留空（或设置为项目根目录）

4. **设置环境变量**：
   - 点击 "Environment variables"
   - 添加以下环境变量：
     - `NEXT_PUBLIC_SUPABASE_URL`: 你的 Supabase 项目 URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的 Supabase 匿名密钥

5. **部署**：
   - 点击 "Save and Deploy"
   - 等待部署完成

### 方法 2：通过 Wrangler CLI 部署

1. **创建 wrangler.toml 文件**：
   在项目根目录创建 `wrangler.toml` 文件，内容如下：
   ```toml
   name = "travel-app"
   type = "nextjs"
   
   [build]
   command = "npm run build"
   output_dir = ".next"
   
   [env.production]
   NEXT_PUBLIC_SUPABASE_URL = "你的 Supabase 项目 URL"
   NEXT_PUBLIC_SUPABASE_ANON_KEY = "你的 Supabase 匿名密钥"
   ```

2. **部署**：
   ```bash
   wrangler pages deploy .
   ```

## 注意事项

1. **环境变量**：确保在 Cloudflare Pages 中正确设置环境变量，特别是 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`。

2. **构建配置**：确保构建命令和构建输出目录设置正确。

3. **路由**：Cloudflare Pages 会自动处理 Next.js 的路由，无需额外配置。

4. **域名**：部署完成后，Cloudflare Pages 会提供一个默认域名，你也可以添加自定义域名。

## 故障排除

- **构建失败**：检查构建命令是否正确，确保所有依赖已安装。
- **环境变量问题**：确保环境变量已正确设置，特别是 Supabase 相关的环境变量。
- **路由问题**：检查 Next.js 的路由配置是否正确。

如果遇到问题，可以查看 Cloudflare Pages 的部署日志，获取更详细的错误信息。