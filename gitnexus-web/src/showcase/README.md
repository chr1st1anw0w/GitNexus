# 🎭 GitNexus AI Hub Interactive Showcase

> **全功能元件展示模式** — 無需登入或後端連線，完整體驗所有 UI 設計與互動功能

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

## 📦 包含的元件

### ✅ 已完成元件

| 元件 | 功能 | 互動性 | 狀態 |
|------|------|--------|------|
| **Dashboard** | 儀表板總覽 | 🟢 完整 | ✅ 可展示 |
| **TaskBoard** | Kanban 看板 | 🟡 部分* | ✅ 可展示 |
| **TaskDetail** | 任務詳情 | 🟢 完整 | ✅ 可展示 |
| **ActivityImpact** | 影響分析 | 🟡 部分* | ✅ 可展示 |

> *🟡 部分互動：拖拽功能需安裝 `@dnd-kit`，圖表渲染需 `cytoscape`

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
| 任務卡片點擊 | ✅ 可用 | 彈出詳情 Modal |
| 篩選側邊欄 | ✅ 可用 | 視覺回饋（資料篩選邏輯已備妥） |
| 動作按鈕 | ✅ 可用 | 顯示 toast 通知或模擬 API 回應 |
| Tab 切換 | ✅ 可用 | Impact/Activity/Settings 分頁 |
| 拖拽看板 | ⏳ 需安裝 @dnd-kit | Phase 4 整合 |
| 圖表渲染 | ⏳ 需安裝 cytoscape | Phase 4 整合 |

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
│   ├── ShowcaseApp.tsx       ← 展示模式 App 容器
│   └── README.md             ← 本文件
├── src/components/
│   ├── TaskBoard.tsx         ← 看板元件（含 mock data）
│   ├── TaskDetailModal.tsx   ← 詳情元件（含 mock data）
│   ├── ActivityImpactView.tsx ← 影響分析（含 mock data）
│   └── DashboardView.tsx     ← 儀表板（含 mock data）
└── package.json              ← 新增 showcase 指令
```

---

## 🎯 使用場景

### 1. 產品演示（Demo Day）
**情境**：向投資人或客戶展示產品功能
**優勢**：無需搭建完整環境，開箱即用

```bash
pnpm build:showcase
# 將 dist/ 部署到靜態主機（Vercel/Netlify）
```

### 2. 設計審查（Design Review）
**情境**：UI/UX 團隊評估設計實作
**優勢**：真實 React 元件，非靜態圖片

```bash
pnpm dev:showcase
# 設計師可直接在瀏覽器檢視並提供回饋
```

### 3. 使用者測試（User Testing）
**情境**：觀察使用者與介面互動
**優勢**：完整互動功能，接近真實體驗

```bash
# 受測者無需安裝任何開發工具
# 直接開啟 showcase.html 即可測試
```

### 4. 開發驗證（Feature Validation）
**情境**：驗證元件功能與設計一致性
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

| 項目 | 主應用 (App.tsx) | Showcase (ShowcaseApp.tsx) |
|------|-----------------|----------------------------|
| 資料來源 | 後端 API (localhost:4747) | Mock 數據（硬編碼） |
| 登入驗證 | ✅ 需要 | ❌ 不需要 |
| 後端依賴 | ✅ 需要 | ❌ 不需要 |
| 狀態管理 | Zustand + React Context | 僅 React State |
| MCP 整合 | ✅ 真實 MCP 調用 | ❌ 模擬回應 |
| 路由 | React Router (未來) | 簡單 state 切換 |
| 適用場景 | 開發 & 生產環境 | 演示 & 測試環境 |

---

## 📝 待辦事項

### Phase 1 (完成)
- [x] 創建 ShowcaseApp 容器
- [x] 導覽面板設計
- [x] 整合現有元件（Dashboard, TaskBoard, TaskDetail, Impact）
- [x] 程式碼檢視器 (可選)

### Phase 2 (未來)
- [ ] 加入拖拽互動（等 @dnd-kit 安裝後）
- [ ] 整合 Cytoscape 圖表（等 cytoscape 安裝後）
- [ ] 加入更多互動反饋（Toast 通知、Loading 狀態）
- [ ] 響應式設計驗證（Mobile/Tablet）

### Phase 3 (未來)
- [ ] 錄製互動影片（用於文檔）
- [ ] 建立線上 Demo 站點（Vercel/Netlify）
- [ ] 多語系支援（英文/繁中切換）

---

## 🎬 截圖與影片

> TODO: 補充 Showcase 模式的截圖

---

## 📞 聯絡

**開發者**: Claude (規劃 + 代碼) | Jules (測試 + 整合)
**專案**: GitNexus AI Hub
**最後更新**: 2026-03-15
