# Academic Personal Website

一个简洁、al-folio 风格、支持中英双语切换、可部署到 GitHub Pages 的学术个人主页。

---

## 目录结构

```
academic-website/
├── _config.yml            ← 站点全局配置（名字、社交、导航）
├── _layouts/default.html  ← 整体布局
├── _includes/             ← 页眉、页脚、论文条目片段
├── _data/                 ← 数据文件，编辑这些就能更新内容
│   ├── publications.yml   ← 论文列表
│   ├── honors.yml         ← 荣誉奖项
│   ├── experience.yml     ← 教育/科研/服务经历
│   └── hobbies.yml        ← 兴趣爱好
├── assets/
│   ├── css/style.css      ← 全部样式（含浅色 / 深色模式）
│   ├── js/main.js         ← 语言切换 + 深色模式 + 移动菜单
│   └── img/profile.jpg    ← 头像（自行替换）
├── index.html             ← 首页（About + News + 代表作）
├── publications.html      ← 论文页
├── research.html          ← 科研 / 教育 / 服务经历
├── honors.html            ← 荣誉
├── hobbies.html           ← 兴趣
├── Gemfile                ← Ruby 依赖
└── .gitignore
```

---

## 怎么编辑

### 1. 改基本信息
打开 [`_config.yml`](_config.yml)，编辑：
- `title` / `title_zh` —— 站点标题
- `author` —— 姓名、邮箱、单位、办公室
- `social` —— GitHub / Google Scholar / ORCID / LinkedIn / Twitter / Zhihu

### 2. 改首页文字
打开 [`index.html`](index.html)，在“个人简介 / Biography”和“News / 最近动态”部分直接改文字。
每段都用 `<span data-en>...</span><span data-zh>...</span>` 包裹一份英文一份中文。

### 3. 加论文
打开 [`_data/publications.yml`](_data/publications.yml)，按已有格式追加一项。
作者列表里用 `**Your Name**` 包裹自己的名字会自动加粗。

### 4. 加荣誉、加经历、加爱好
分别编辑 `_data/honors.yml`、`_data/experience.yml`、`_data/hobbies.yml`。

### 5. 换头像
把头像图片命名为 `profile.jpg` 放到 `assets/img/`。

---

## 本地预览

需要 **Ruby ≥ 2.7**（macOS 自带的 2.6 太旧）。推荐用 Homebrew 装新版：

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

cd /Users/heyuyang/academic-website
bundle install
bundle exec jekyll serve
```

浏览器打开 <http://localhost:4000>。

> 如果不想装 Jekyll，**直接推到 GitHub Pages 即可**，GitHub 会在云端帮你构建。

---

## 部署到 GitHub Pages（推荐）

1. 在 GitHub 新建一个仓库，**名字必须是** `你的用户名.github.io`（例如 `heyuyang.github.io`）。
2. 在本目录执行：
   ```bash
   cd /Users/heyuyang/academic-website
   git init
   git add .
   git commit -m "Initial commit: academic homepage"
   git branch -M main
   git remote add origin git@github.com:你的用户名/你的用户名.github.io.git
   git push -u origin main
   ```
3. 进入仓库 → **Settings → Pages** → Source 选择 `main` 分支根目录 → Save。
4. 几十秒后访问 `https://你的用户名.github.io` 即可看到站点。

> 如果你不想用 `username.github.io` 这种顶级名字，而是用 `username.github.io/repo` 这种二级路径，请把 [`_config.yml`](_config.yml) 里的 `baseurl` 设置为 `"/repo"`。

---

## 自定义样式

主题色、字体在 [`assets/css/style.css`](assets/css/style.css) 顶部的 `:root` 区域：

```css
--color-accent:  #b1182d;   /* 主题色：默认 al-folio 红 */
--font-sans:     'Inter', ...
--font-serif-zh: 'Noto Serif SC', ...
```

深色模式同样在 CSS 里调整 `body.dark` 下的变量。

---

## 加一篇新论文示例

打开 `_data/publications.yml`，在最上方加：

```yaml
- title:
    en: "Your New Paper Title"
    zh: "你的新论文标题"
  authors: "**Your Name**; Collaborator A"
  venue:
    en: "NeurIPS"
    zh: "NeurIPS"
  year: 2025
  type: conference
  badge: "Spotlight"
  arxiv: "https://arxiv.org/abs/xxxx.xxxxx"
  code: "https://github.com/you/repo"
```

保存即可。GitHub Pages 会在大约 30 秒后重新构建。
