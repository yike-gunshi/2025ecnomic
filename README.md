# 2025年政府工作报告 - 经济政策分析报告

## 项目说明

本项目是一个针对2025年政府工作报告的经济政策分析网站，提供政策解读与经济影响分析。项目已经结构化为适合Vercel部署的形式。

## 项目结构

```
/
├── public/            # 静态资源目录（Vercel部署的主要内容）
│   └── index.html     # 主页面
├── css/               # 样式文件
│   └── styles.css     # 主样式文件
├── js/                # JavaScript文件
│   └── main.js        # 主脚本文件
└── vercel.json        # Vercel配置文件
```

## Vercel部署指南

1. **创建Vercel账号**：如果还没有Vercel账号，前往 [vercel.com](https://vercel.com) 注册一个账号。

2. **安装Vercel CLI**（可选）：
   ```bash
   npm install -g vercel
   ```

3. **部署到Vercel**：

   **方法1：使用Vercel控制台**
   - 登录Vercel控制台
   - 点击"New Project"
   - 导入此Git仓库
   - 配置项目名称和相关设置
   - 点击"Deploy"

   **方法2：使用Vercel CLI**
   ```bash
   # 在项目根目录下运行
   vercel
   ```

4. **确认部署设置**：
   - **Build Command**：留空（静态站点不需要构建）
   - **Output Directory**：`public`
   - **Development Command**：留空或设置为适合本地开发的命令

5. **完成部署**：
   - Vercel将自动部署站点并提供一个URL

## 本地开发

如果需要在本地开发调试，可以使用任何静态网页服务器：

```bash
# 使用Python的http.server模块
python -m http.server

# 或使用Node的http-server包
npx http-server
```

## 自定义域名（可选）

1. 在Vercel控制台中找到已部署的项目
2. 进入"Settings" > "Domains"
3. 添加您的自定义域名并按照提示完成DNS配置

## 注意事项

- 此项目已经针对Vercel部署进行了优化
- `vercel.json`文件定义了部署配置，确保静态文件正确服务
- CSS和JavaScript已分离到单独的文件中，便于维护
