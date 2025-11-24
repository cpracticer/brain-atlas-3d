# 🧠 3D脑区图谱 | Brain Atlas 3D

交互式3D人脑解剖图谱，支持脑区搜索、实时交互和中英文对照。

## ✨ 功能特性

- 🎨 **3D可视化**: 使用Three.js渲染逼真的3D脑部模型
- 🔍 **智能搜索**: 按脑区名称或功能关键词快速查找
- 🖱️ **交互操作**: 点击查看详情，拖动旋转，滚轮缩放
- 🌐 **中英双语**: 完整的中英文脑区名称和功能说明
- 📍 **精确定位**: 20个主要脑区的3D空间定位
- 🎯 **高亮显示**: 选中和悬停时的视觉反馈

## 🚀 快速开始

### 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### GitHub Pages 部署

1. **配置仓库**
   - 创建GitHub仓库 `brain-atlas-3d`
   - 推送代码到仓库

2. **启用GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"

3. **创建部署工作流**
   创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. **访问网站**
   - 部署完成后访问: `https://你的用户名.github.io/brain-atlas-3d/`

## 📦 技术栈

- **React 18** - UI框架
- **Three.js** - 3D图形渲染
- **@react-three/fiber** - React Three.js集成
- **@react-three/drei** - Three.js辅助工具
- **Vite** - 构建工具
- **Lucide React** - 图标库

## 🗺️ 包含的脑区

- 额叶系统：额叶、前额叶皮层、运动皮层、布洛卡区
- 顶叶系统：顶叶、体感皮层
- 颞叶系统：颞叶、韦尼克区、海马体、杏仁核
- 枕叶系统：枕叶、初级视觉皮层
- 皮层下结构：丘脑、下丘脑、基底神经节、纹状体
- 其他结构：小脑、脑干、胼胝体、扣带回

## 🎮 使用说明

1. **旋转视图**: 鼠标左键拖动
2. **缩放**: 鼠标滚轮
3. **选择脑区**: 点击3D模型中的彩色球体
4. **搜索**: 在顶部搜索框输入关键词
5. **重置**: 点击"重置视角"按钮

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！
