# 🚀 GitNexus AI Hub Showcase — 快速啟動指南

> **3 分鐘啟動互動展示模式 — 無需登入或後端**

---

## ⚡ 最快啟動方式

```bash
# 1. 進入 gitnexus-web 目錄
cd /Users/christianwu/GitNexus/gitnexus-web

# 2. 啟動 Showcase 模式（會自動開啟瀏覽器）
pnpm dev:showcase
```

**完成！** 瀏覽器會自動開啟 `http://localhost:5173/showcase.html`

---

## 🎯 你會看到什麼

### 1. Intro 導覽畫面
- 4 個主要元件的卡片（Dashboard, TaskBoard, TaskDetail, Impact）
- 點擊任一卡片進入對應畫面

### 2. 可互動的元件
- ✅ **Dashboard** — AI Agent 狀態、統計卡片、快速操作
- ✅ **Task Board** — Kanban 看板、篩選側邊欄、任務卡片
- ✅ **Task Detail** — 詳情 Modal、動作按鈕、MCP 日誌
- ✅ **Impact Analysis** — 節點圖、風險評估、影響範圍

### 3. 互動功能
- ✅ 點擊任務卡片 → 彈出詳情
- ✅ 點擊動作按鈕 → 模擬 API 回應
- ✅ 切換 Tab → 不同視圖
- ✅ 篩選側邊欄 → 視覺回饋
- ⏳ 拖拽功能 → 需先安裝 @dnd-kit（見下方）

---

## 🔧 啟用完整互動功能

如果你想體驗拖拽和圖表渲染：

```bash
# 1. 安裝缺少的依賴
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities \
         zustand \
         cytoscape react-cytoscapejs cytoscape-dagre \
         gray-matter

# 2. 重新啟動 Showcase
pnpm dev:showcase
```

**新增功能**:
- ✅ 任務卡片可跨欄拖拽（Kanban）
- ✅ Impact Graph 動態節點圖（Cytoscape）
- ✅ 全域狀態管理（Zustand）

---

## 📱 其他啟動方式

### 方式 2：建置靜態檔案

```bash
# 建置 Showcase（生產模式）
pnpm build:showcase

# 預覽建置結果
pnpm preview:showcase
```

**用途**: 部署到 Vercel/Netlify 等靜態主機

---

### 方式 3：直接開啟 HTML

```bash
# 先建置
pnpm build:showcase

# 在瀏覽器開啟（macOS）
open gitnexus-web/dist/showcase.html

# 或（Linux/Windows）
xdg-open gitnexus-web/dist/showcase.html
start gitnexus-web/dist/showcase.html
```

---

## 🎭 使用場景

### 1. 產品演示（Demo Day）
```bash
pnpm dev:showcase
# 投影到大螢幕展示
```

### 2. 設計審查（Design Review）
```bash
pnpm dev:showcase
# 邀請設計師在瀏覽器中檢視並互動
```

### 3. 使用者測試（User Testing）
```bash
pnpm build:showcase
# 分享 dist/showcase.html 給測試者
```

---

## 🆘 常見問題

### Q: 為什麼有些功能無法使用？
A: Showcase 使用 mock 數據，不連接後端 API。拖拽和圖表需安裝額外依賴（見上方）。

### Q: 如何切換回主應用？
A: 關閉 Showcase，執行 `pnpm dev` 啟動主應用。

### Q: 數據是真實的嗎？
A: 不是，Showcase 使用硬編碼的 mock 數據進行展示。真實數據需等待 Phase 3-5 完成。

### Q: 可以分享給別人嗎？
A: 可以！執行 `pnpm build:showcase`，然後分享 `dist/` 目錄或部署到線上。

---

## 📚 詳細文檔

- [SHOWCASE_GUIDE.md](./SHOWCASE_GUIDE.md) — 完整總結與使用指南
- [DEVELOPMENT_ROADMAP.md](./AI_Docs/DEVELOPMENT_ROADMAP.md) — 開發週期計劃
- [showcase/README.md](./gitnexus-web/src/showcase/README.md) — Showcase 技術文檔

---

## 🚀 立即開始

```bash
cd /Users/christianwu/GitNexus/gitnexus-web
pnpm dev:showcase
```

**享受展示！** 🎉
