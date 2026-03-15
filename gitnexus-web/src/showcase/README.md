# 🎭 GitNexus Web Interactive Demo

> **Graph explorer onboarding showcase** — 無需登入、無需後端、無需匯入 repository，即可直接體驗 GitNexus Web 的核心互動模型

---

## 🚀 快速啟動

### 1. 開發模式（推薦）

```bash
cd /Users/christianwu/GitNexus/gitnexus-web
pnpm dev:showcase
```

開啟瀏覽器：`http://localhost:5173/showcase.html`

### 2. 建置與預覽

```bash
# 建置 Showcase 靜態檔案
pnpm build:showcase

# 預覽建置結果
pnpm preview:showcase
```

---

## 📦 本次展示重點

### ✅ 可直接操作的功能

| 功能 | 說明 |
|------|------|
| **Node hover preview** | 滑過節點可看到 summary / tag / risk 預覽 |
| **Click → inspector** | 點擊節點可開啟右側 inspector sidebar |
| **Right-click context menu** | 右鍵可直接開啟動作選單 |
| **Sidebar pin / unpin** | 可固定檢視內容，不因 deselect 而消失 |
| **Preview mode toggle** | 可開關 hover preview |
| **Field visibility toggle** | 可切換 tags / risk / relations / metadata |
| **Mock impact analysis** | 使用 curated sample graph 顯示 caller / callee / process / risk |
| **Demo / Live mode distinction** | 可切換為未接資料的 live empty state |

---

## 🎨 設計風格

### Flow A — Dark Developer Theme

```
背景: #0a0e1a (極深藍黑)
字體: JetBrains Mono (等寬)
強調: 紫色 (#7c3aed), 粉色 (#ec4899), 琥珀 (#f59e0b)
特色: 終端風格、程式碼美感、開發者導向
```

**包含畫面**:
- Task Board (Dark)
- Task Detail
- Impact Analysis
- Activity Log

### Flow B — Glassmorphism + Swiss Style

```
背景: 點陣網格 + 毛玻璃卡片
字體: Helvetica / Inter (無襯線)
強調: 半透明面板 (backdrop-filter: blur)
特色: 現代感、輕量、專業清晰
```

**包含畫面**:
- Login
- Dashboard
- Task Board (Glass)

---

## 🔧 功能特色

### 1. 完全獨立運行
- ❌ 不需要後端 API
- ❌ 不需要資料庫連線
- ❌ 不需要登入驗證
- ✅ 100% 前端渲染
- ✅ Mock 數據驅動
- ✅ 真實互動體驗

### 2. 互動功能展示

| 功能 | 狀態 | 說明 |
|------|------|------|
| Node hover | ✅ 可用 | 顯示輕量 preview card |
| Node click | ✅ 可用 | 開啟 inspector sidebar |
| Right-click menu | ✅ 可用 | 執行 context actions |
| Sidebar pinning | ✅ 可用 | 固定 inspector 內容 |
| Impact highlight | ✅ 可用 | 顯示 mock blast radius |
| Live-mode empty state | ✅ 可用 | 說明未登入 / 未匯入資料情境 |

### 3. 展示模式特點
- 🎯 導覽面板：快速切換不同元件
- 📊 程式碼檢視器：即時顯示元件資訊
- 🟢 Demo 指示燈：明確標示展示模式
- 🎨 完整設計呈現：所有視覺細節保留

---

## 📂 檔案結構

```
gitnexus-web/
├── showcase.html              ← 獨立入口 HTML
├── src/showcase/
│   ├── main.tsx              ← Showcase 模式入口
│   ├── ShowcaseApp.tsx       ← demo page 入口容器
│   ├── InteractiveGraphDemo.tsx ← 可互動 graph demo 頁面
│   ├── demo-state.ts         ← demo reducer / state transitions
│   ├── demo-state.test.ts    ← reducer tests
│   ├── mock-graph-data.ts    ← mock graph / node narratives / impact data
│   └── README.md             ← 本文件
├── src/hooks/
│   └── useSigma.ts           ← 重用的 graph interaction hook
├── src/lib/
│   └── graph-adapter.ts      ← 重用的 graphology adapter
└── package.json              ← 新增 showcase 指令
```

---

## 🎯 使用場景

### 1. 產品演示（Demo Day）
**情境**：向客戶、合作夥伴或投資人展示 GitNexus Web graph UX
**優勢**：無需搭建完整環境，開箱即用

```bash
pnpm build:showcase
# 將 dist/ 部署到靜態主機（Vercel/Netlify）
```

### 2. 設計審查（Design Review）
**情境**：UI/UX 與前端共同審查 hover / click / right-click / sidebar 流程
**優勢**：真實 React 元件，非靜態圖片

```bash
pnpm dev:showcase
# 設計師可直接在瀏覽器檢視並提供回饋
```

### 3. 空資料 onboarding（Empty-State Onboarding）
**情境**：使用者尚未登入、尚未接後端、尚未匯入 repository
**優勢**：完整互動功能，接近真實體驗

```bash
# 受測者無需安裝任何開發工具
# 直接開啟 showcase.html 即可測試
```

### 4. 開發驗證（Feature Validation）
**情境**：驗證 graph interaction 文案、資訊架構與狀態切換是否合理
**優勢**：快速迭代，無需等待後端 API

```bash
# Phase 2-3 期間，前端可獨立驗證元件邏輯
```

---

## 🛠️ 開發指南

### 新增元件到 Showcase

1. **確保元件支援 Mock 模式**
   ```typescript
   // 元件內部檢查環境變數或 props
   const useMockData = props.mockMode || import.meta.env.MODE === 'showcase';
   ```

2. **在 ShowcaseApp.tsx 註冊**
   ```typescript
   const views = [
     {
       id: 'my-component',
       name: '新元件',
       desc: '功能描述',
       color: '#color',
       component: MyComponent,
     },
   ];
   ```

3. **測試 Showcase 模式**
   ```bash
   pnpm dev:showcase
   ```

### 建議的 Mock Data 結構

```typescript
// src/showcase/mock-data/tasks.ts
export const SHOWCASE_TASKS = [
  {
    id: 'T-101',
    title: 'Implement Impact Graph API',
    status: 'In Progress',
    // ...完整欄位
  },
];
```

---

## 🔄 與主應用的區別

| 項目 | 主應用 (App.tsx) | Demo Page (ShowcaseApp.tsx) |
|------|-----------------|----------------------------|
| 資料來源 | 後端 API / 匯入 graph | Mock graph + curated metadata |
| 登入驗證 | ✅ 需要 | ❌ 不需要 |
| 後端依賴 | ✅ 需要 | ❌ 不需要 |
| 狀態管理 | App context + worker | Local reducer + shared graph hook |
| GitNexus query | ✅ 真實 | ❌ 模擬 impact / provenance |
| 目的 | 真實探索與分析 | onboarding / demo / empty-state preview |

---

## 📝 待辦事項

### 已完成
- [x] 將展示頁改為可操作的 graph interaction demo
- [x] 加入 demo / live-data-empty-state 模式切換
- [x] 補上 mock graph、context menu、inspector、field toggles
- [x] 加入 reducer 測試

### 下一步
- [ ] 串接真實 GitNexus graph payload
- [ ] 補 component interaction tests（需 jsdom / Testing Library 類依賴）
- [ ] 規劃 responsive layout 與對外 demo hosting

---

## 🎬 截圖與影片

> TODO: 補充 Showcase 模式的截圖

---

## 📞 備註

**用途**: GitNexus Web 對外展示 / onboarding / 空資料體驗
**最後更新**: 2026-03-15
