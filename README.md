# Junjie Zhao · GitHub Pages 个人主页

面向 CS 大四本科生申请硕士／博士的个人主页。学术内容依据用户提供的 **CV - Junjie Zhao - Sep 2026.pdf** 整理：University of Rochester、本科身份、预计 May 2027 毕业、XR 系统、HCI、人本 AI、研究项目、两篇预印本／工作论文、教育荣誉与教学经历。

这是已选定的第一版（学术编辑风）：白底、衬线姓名、两栏介绍和清晰的研究列表。

**可直接部署到 GitHub Pages 的纯静态网站**，使用 HTML / CSS / 少量原生 JavaScript，无服务器、数据库、安装依赖或构建步骤。动画在浏览器中运行。解压后打开 `index.html` 即可预览。

## 还需补充

- **头像**：当前为 JZ 字母图，请换为自己的照片。
- **摄影作品**：当前 3 张图片是已注明作者的 Unsplash 参考照片，不是 Junjie 的作品。页面已明确标注，替换自己的照片后再移除占位说明。
- **GitHub / Google Scholar**：CV 未提供个人主页链接，目前没有显示服务首页或猜测链接。可在`index.html` 的 `.hero-links` 中添加确认后的地址。
- CV 原件已放入 `assets/Junjie-Zhao-CV.pdf`，供下载；它未被修改。

## 目录

```text
academic-homepage/
├── index.html                    # 正式首页（第一版：学术编辑风）
├── .nojekyll                     # GitHub Pages 静态部署
├── README.md                     # 中文使用指南
├── DESIGN-NOTES.md               # 参考与设计说明
├── PHOTO-CREDITS.md              # 图片来源
└── assets/
    ├── Junjie-Zhao-CV.pdf        # 未修改的原始 CV
    ├── css/variants.css          # 样式与手机适配
    ├── js/main.js               # 导航、邮箱与 BibTeX 复制
    ├── js/variants.js           # 动画开关和滚动入场
    └── images/                  # 头像占位与三张参考照片
```

## 本地预览

解压后双击 `index.html` 即可查看。内容、图片、CV 和原生折叠控件都可以离线使用。部分浏览器限制本地文件剪贴板操作，可手动选中文本复制。

如已安装 Python，也可以在网站目录运行 `python3 -m http.server 8000`，然后打开 `http://localhost:8000`。

## GitHub Pages 发布

1. 新建公开仓库，个人主页推荐命名为 `你的用户名.github.io`，用户名使用小写。
2. 上传网站文件夹的**全部内容**到 `main` 分支根目录，让 `index.html` 直接位于根目录，不要再套一层文件夹。保留 `.nojekyll`，它可能被操作系统隐藏。
3. 打开仓库 **Settings → Pages → Build and deployment**。
4. 选择 **Deploy from a branch**，选 `main` 和 `/(root)`，点击 **Save**。
5. 部署完成后，在 Pages 设置中点击 **Visit site**。

也可使用普通仓库名，此时网站路径是 `https://你的用户名.github.io/仓库名/`。本网站的本地资源使用相对路径，兼容这两种方式。

官方说明：[创建 GitHub Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [设置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。步骤于 2026-09-09 核对。本交付未代为创建或发布 GitHub 仓库。

## 修改内容

| 内容 | 位置 |
| --- | --- |
| 姓名、身份、学校、社交链接 | `index.html` 的 header、hero、hero-links |
| 自我介绍和申请意向 | `index.html` 的 `#about` |
| 研究方向、动态 | `#research`、`#news` |
| AR、HAL、DEVISE 与个人贡献 | `#projects` |
| 论文与 BibTeX | `#publications`，作者顺序和状态须与真实记录一致 |
| 教育、荣誉、资助 | `#education` |
| 教学与实习 | `#experience` |
| 摄影作品、标题、作者 | `#photography`、`assets/images/` 与 `PHOTO-CREDITS.md` |
| 联系邮箱 | 搜索并替换全部 `jzhao58@u.rochester.edu`，包括 mailto 与 data-email |
| CV | 用新版 PDF 替换 `assets/Junjie-Zhao-CV.pdf` |
| 主题 | `variants.css` 中的共享样式及 .editorial 规则 |

替换头像时，同时更新图片 src 和 alt；建议使用 400px 以上正方形 JPG/WebP。摄影区使用本地 JPG，可修改 `.photo img` 的高度与 `object-position` 调整构图。新增论文或项目可复制完整 article，确保 ID 唯一。

如切换成中文网页，应把 `<html lang="en">` 改成 `<html lang="zh-CN">`，再翻译导航、正文和按钮。当前 CV 内容是英文，因此页面也以英文为主。

## 静态网站与动画

页面由 GitHub Pages 直接提供静态文件；浏览器负责折叠内容、复制按钮、导航高亮、入场和悬停动效。无需后端。页面主要内容、图片、CV 和原生折叠在禁用 JavaScript 时仍可访问。

页尾的 Pause motion / Resume motion 可控制动效，同时尊重系统“减少动态效果”偏好。剪贴板功能在 HTTPS / localhost 支持时可用，受限制时提示手动复制。

日后通常只需修改 `index.html`、替换照片或 CV，再提交到 GitHub；GitHub Pages 会更新网站。
