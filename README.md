# MOORE Site-to-Program Studio v6 — GitHub Pages deployment

学生可访问的建筑研究与方案推敲工具：自由选择研究议题与场地、场地事实/假设登记、建筑单元配置、功能面积表、概念平面与三维体块、文件导出。

## 部署

1. 在 GitHub 新建一个 **Public** 仓库，建议命名 `moore-site-to-program`，创建时勾选 README 或不勾选均可。
2. 上传本目录的所有文件，尤其是 `index.html`、`next-design-studio/index.html` 和 `.github/workflows/deploy.yml`，推送到 `main` 分支。
3. 进入仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
4. 进入 **Actions** 查看 `Deploy MOORE Site-to-Program to GitHub Pages` 工作流是否成功。若本次更新已触发部署而失败，请点击 **Run workflow** 再试一次。
5. 对于用户名 `holly-zz` 且仓库名称 `moore-site-to-program`，网站路径应为 `https://holly-zz.github.io/moore-site-to-program/`，请以 GitHub Pages 实际显示的地址为准，成功发布前勿当作有效网站。

## 功能与边界

- 这是 **静态前端**，无须学生配置 API 密钥，可以运行本地卡片选择、已登记场地研究摘要、建筑单元表、概念平面/体块及 SVG/DXF/OBJ/Markdown/JSON 下载。
- `Kimi` 自动推荐和实时联网的 `/api/*` 接口 **不会**因为部署到 GitHub Pages 就启用。按钮失败时应使用“复制提示词”到学生自己的模型，或另行搭建经授权的 API 服务器。严禁将密钥写进静态网页。
- 研究报告中的历史资料索引**不等于**实时检索；GeoJSON 要由用户导入并核验坐标系与来源。
- 平面与体块是教学概念模型，概念尺寸不是实测用地红线、消防规范或施工参数。
- 学生操作状态主要在浏览器 `localStorage` 中；同一台共享电脑请及时导出项目 JSON，浏览器清理或更换设备可能丢失进度。

## 结构

```
index.html                       # 选择研究方向、选址、研究与建筑单元
next-design-studio/index.html    # 平面推敲与三维体块
.github/workflows/deploy.yml     # Pages 自动部署
.nojekyll                        # 禁用 Jekyll 预处理
```

## 本地预览

在项目目录使用 `python -m http.server 8080`，打开 `http://localhost:8080/`。也可以打开根目录 `index.html`，但托管在 HTTP 服务下更接近生产环境。