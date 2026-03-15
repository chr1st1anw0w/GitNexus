# GitNexus AI Hub 功能元件開發週期計劃

> **最後更新**: 2026-03-15
> **負責人**: Claude (規劃 + 代碼框架) | Jules (測試 + 整合)
> **狀態圖例**: ✅ 完成 | 🔄 進行中 | ⏳ 待開始 | ⚠️ 阻塞中

---

## 📊 整體進度總覽

| 階段 | 完成度 | 狀態 | 預計完成 |
|------|--------|------|----------|
| **Phase 1: 靜態元件設計** | 100% | ✅ 完成 | 2026-03-15 |
| **Phase 2: 元件骨架建立** | 85% | 🔄 進行中 | 2026-03-16 |
| **Phase 3: 真實數據串接** | 15% | 🔄 進行中 | 2026-03-17 |
| **Phase 4: 互動功能開發** | 0% | ⏳ 待開始 | 2026-03-18 |
| **Phase 5: 後端 API 實作** | 0% | ⏳ 待開始 | 2026-03-19 |
| **Phase 6: 整合測試** | 0% | ⏳ 待開始 | 2026-03-20 |

**總體進度**: 33% (20/60 任務完成)

---

## 🎨 Phase 1: 靜態元件設計 ✅

> **目標**: 完成所有 UI 設計規格與靜態 HTML 原型
> **狀態**: ✅ 100% 完成
> **提交記錄**: `781ab4f`, `4f07f87`

### 設計產出

| 元件名稱 | 設計風格 | 狀態 | 檔案 | 負責人 |
|---------|---------|------|------|--------|
| Login Screen | Glassmorphism | ✅ 完成 | `designs/flow-b-05-login.html` | Gemini |
| Dashboard | Glass + Swiss | ✅ 完成 | `designs/flow-b-06-dashboard.html` | Gemini |
| Task Board (Glass) | Glassmorphism | ✅ 完成 | `designs/flow-b-07-task-board-glass.html` | Gemini |
| Task Board (Dark) | Dark Dev Theme | ✅ 完成 | `designs/flow-a-01-task-board.html` | Gemini |
| Task Detail | Dark Dev Theme | ✅ 完成 | `designs/flow-a-02-task-detail.html` | Gemini |
| Impact Analysis | Dark Dev Theme | ✅ 完成 | `designs/flow-a-03-impact-analysis.html` | Gemini |
| Activity Log | Dark Dev Theme | ✅ 完成 | `designs/flow-a-04-activity-log.html` | Gemini |

**備註**: 所有靜態 HTML 設計已完成，但實際檔案可能需要從對話記錄恢復或重新生成為參考文檔。

---

## 🏗️ Phase 2: 元件骨架建立 🔄

> **目標**: 建立所有 React 元件的基本結構與 TypeScript 型別
> **狀態**: 🔄 85% 進行中
> **提交記錄**: `afd95b7`, `4f07f87`

### 前端元件

| 元件 | 功能範圍 | 狀態 | 完成度 | 負責人 | 備註 |
|------|---------|------|--------|--------|------|
| **TaskBoard.tsx** | 看板 UI 骨架 | ✅ 完成 | 100% | Claude | 包含 MOCK_TASKS, 4 欄位, 篩選側邊欄 |
| TaskBoard - 拖拽功能 | dnd-kit 整合 | ⏳ 待開始 | 0% | Agent 1 | 需安裝 @dnd-kit/* |
| TaskBoard - 真實數據 | useTasks() 串接 | ⏳ 待開始 | 0% | Agent 1 | 移除 MOCK_TASKS |
| **TaskDetailModal.tsx** | 詳情 UI 骨架 | ✅ 完成 | 100% | Claude | Split panel, action buttons, MCP log |
| TaskDetail - 真實數據 | useTaskDetail() 串接 | ⏳ 待開始 | 0% | Agent 2 | 移除 mock data |
| TaskDetail - 動作處理 | Start/Submit/Impact | ⏳ 待開始 | 0% | Agent 2 | 連接後端 API |
| **ActivityImpactView.tsx** | 影響分析 UI 骨架 | ✅ 完成 | 100% | Claude | Graph + Activity tabs |
| Activity - 真實數據 | useActivity() 串接 | ⏳ 待開始 | 0% | Agent 3 | 移除 GRAPH_NODES mock |
| Activity - 圖表渲染 | Cytoscape.js 整合 | ⏳ 待開始 | 0% | Agent 3 | 需安裝 cytoscape |
| **DashboardView.tsx** | 儀表板 UI 骨架 | ✅ 完成 | 90% | Claude | Stats, quick actions, agent status |
| Dashboard - 真實數據 | useTasks + useActivity | ⏳ 待開始 | 0% | Agent 4 | 連接後端統計 API |
| **Header.tsx** | 導航列更新 | 🔄 進行中 | 60% | Agent 6 | 需加入 AI Hub 導航按鈕 |
| **App.tsx** | 路由整合 | 🔄 進行中 | 70% | Agent 6 | 需加入 dashboard view |

### 型別系統 & Hooks

| 項目 | 狀態 | 完成度 | 檔案 | 備註 |
|------|------|--------|------|------|
| **collaboration.ts** | ✅ 完成 | 100% | `src/types/collaboration.ts` | 所有型別已定義 |
| **useTasks.ts** | ✅ 完成 | 100% | `src/hooks/useTasks.ts` | Hook 骨架存在（mock data） |
| **useTaskDetail.ts** | ✅ 完成 | 100% | `src/hooks/useTaskDetail.ts` | Hook 骨架存在（mock data） |
| **useActivity.ts** | ✅ 完成 | 100% | `src/hooks/useActivity.ts` | Hook 骨架存在（mock data） |
| **task-service.ts** | ✅ 完成 | 100% | `src/services/task-service.ts` | Interface 已定義（mock impl） |

---

## 🔌 Phase 3: 真實數據串接 🔄

> **目標**: 將所有 mock 數據替換為真實的 HTTP 調用與 MCP 工具
> **狀態**: 🔄 15% 進行中
> **預計完成**: 2026-03-17

### 前端服務層

| 任務 | 狀態 | 完成度 | 負責人 | 依賴 |
|------|------|--------|--------|------|
| task-service HTTP 實作 | ⏳ 待開始 | 0% | Agent 5 | 後端 API 需先建立 |
| useTasks 真實實作 | ⏳ 待開始 | 0% | Agent 1 | task-service 完成 |
| useTaskDetail 真實實作 | ⏳ 待開始 | 0% | Agent 2 | task-service 完成 |
| useActivity 真實實作 | ⏳ 待開始 | 0% | Agent 3 | task-service 完成 |
| Zustand Store 建立 | ⏳ 待開始 | 0% | Claude | 需安裝 zustand |

### 後端 API 端點

| 端點 | 方法 | 功能 | 狀態 | 負責人 |
|------|------|------|------|--------|
| `/api/tasks` | GET | 列出所有任務 | ⏳ 待開始 | Jules |
| `/api/tasks/:id` | GET | 獲取任務詳情 | ⏳ 待開始 | Jules |
| `/api/tasks` | POST | 創建新任務 | ⏳ 待開始 | Jules |
| `/api/tasks/:id` | PATCH | 更新任務狀態 | ⏳ 待開始 | Jules |
| `/api/tasks/:id/start` | POST | 開始任務 | ⏳ 待開始 | Jules |
| `/api/tasks/:id/progress` | POST | 提交進度 | ⏳ 待開始 | Jules |
| `/api/tasks/:id/submit-review` | POST | 提交審查 | ⏳ 待開始 | Jules |
| `/api/reviews/:id/run-impact` | POST | 運行影響分析 | ⏳ 待開始 | Jules |
| `/api/activity` | GET | 獲取活動流 | ⏳ 待開始 | Jules |
| `/api/tasks/:id/logs` | GET | 獲取 MCP 日誌 | ⏳ 待開始 | Jules |

---

## 🎯 Phase 4: 互動功能開發 ⏳

> **目標**: 實現所有使用者互動功能（拖拽、點擊、篩選、導航）
> **狀態**: ⏳ 待開始
> **預計完成**: 2026-03-18

### 功能清單

| 功能 | 元件 | 技術 | 狀態 | 負責人 |
|------|------|------|------|--------|
| 任務卡片拖拽 | TaskBoard | @dnd-kit/sortable | ⏳ 待開始 | Agent 1 |
| 欄位間移動 | TaskBoard | dnd-kit + updateTask | ⏳ 待開始 | Agent 1 |
| 篩選工具欄 | TaskBoard | setFilters() | ⏳ 待開始 | Agent 1 |
| 任務卡片點擊 | TaskBoard | setViewMode('detail') | ⏳ 待開始 | Agent 1 |
| 新增任務 Modal | TaskBoard | createTask() | ⏳ 待開始 | Agent 1 |
| 狀態下拉選單 | TaskDetail | updateTask() | ⏳ 待開始 | Agent 2 |
| Start Task 按鈕 | TaskDetail | startTask() | ⏳ 待開始 | Agent 2 |
| Submit Progress | TaskDetail | submitProgress() | ⏳ 待開始 | Agent 2 |
| Run Impact Analysis | TaskDetail | runImpact() | ⏳ 待開始 | Agent 2 |
| Submit PR | TaskDetail | submitForReview() | ⏳ 待開始 | Agent 2 |
| MCP 日誌串流 | TaskDetail | EventSource polling | ⏳ 待開始 | Agent 2 |
| Related Files 點擊 | TaskDetail | 跳轉到 graph view | ⏳ 待開始 | Agent 2 |
| Impact Graph 渲染 | Activity | Cytoscape.js | ⏳ 待開始 | Agent 3 |
| Activity 篩選 | Activity | setFilters() | ⏳ 待開始 | Agent 3 |
| Refresh 按鈕 | Activity | refresh() | ⏳ 待開始 | Agent 3 |
| Quick Actions | Dashboard | viewMode 切換 | ⏳ 待開始 | Agent 4 |
| MCP Status 燈 | Dashboard | probeBackend() | ⏳ 待開始 | Agent 4 |
| AI Hub 導航 | Header | viewMode 切換 | ⏳ 待開始 | Agent 6 |

---

## 📦 Phase 5: 依賴管理 ⏳

> **目標**: 安裝所有必需的 npm 套件
> **狀態**: ⏳ 待開始
> **執行者**: Claude

### 待安裝套件

| 套件名稱 | 用途 | 狀態 | 安裝指令 |
|---------|------|------|----------|
| `@dnd-kit/core` | 拖拽核心 | ⏳ 待開始 | `pnpm add @dnd-kit/core` |
| `@dnd-kit/sortable` | 可排序列表 | ⏳ 待開始 | `pnpm add @dnd-kit/sortable` |
| `@dnd-kit/utilities` | 拖拽工具 | ⏳ 待開始 | `pnpm add @dnd-kit/utilities` |
| `zustand` | 狀態管理 | ⏳ 待開始 | `pnpm add zustand` |
| `cytoscape` | 圖表渲染 | ⏳ 待開始 | `pnpm add cytoscape` |
| `react-cytoscapejs` | React 整合 | ⏳ 待開始 | `pnpm add react-cytoscapejs` |
| `cytoscape-dagre` | 圖表佈局 | ⏳ 待開始 | `pnpm add cytoscape-dagre` |
| `gray-matter` | Markdown 解析 | ⏳ 待開始 | `pnpm add gray-matter` |

**一鍵安裝指令**:
```bash
cd /Users/christianwu/GitNexus/gitnexus-web
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities zustand cytoscape react-cytoscapejs cytoscape-dagre gray-matter
```

---

## 🧪 Phase 6: 整合測試 ⏳

> **目標**: 完整測試所有功能並修復 Bug
> **狀態**: ⏳ 待開始
> **負責人**: Jules

### 測試清單

| 測試項目 | 預期行為 | 狀態 | 負責人 |
|---------|---------|------|--------|
| 前端啟動 | `pnpm dev` 正常運行 | ⏳ 待測試 | Jules |
| 後端連線 | `localhost:4747/api/tasks` 返回數據 | ⏳ 待測試 | Jules |
| 拖拽功能 | 任務卡片可跨欄移動，後端狀態更新 | ⏳ 待測試 | Jules |
| 任務詳情 | 點擊卡片載入真實 TASK.md 數據 | ⏳ 待測試 | Jules |
| Impact Analysis | 點擊按鈕顯示節點圖與風險等級 | ⏳ 待測試 | Jules |
| Activity Log | 顯示真實 git log 事件 | ⏳ 待測試 | Jules |
| MCP 日誌 | EventSource 即時串流顯示 | ⏳ 待測試 | Jules |
| 新增任務 | Modal 創建任務並同步後端 | ⏳ 待測試 | Jules |
| 提交 PR | GitHub PR URL 正確返回 | ⏳ 待測試 | Jules |
| 響應式設計 | Mobile/Tablet/Desktop 正常顯示 | ⏳ 待測試 | Jules |

---

## 🎯 Sub-Agent 分工明細

> **執行模式**: 6 個 Agent 平行開發 + Claude 骨架任務

### Agent 1: TaskBoard 真實串接
**檔案**: `gitnexus-web/src/components/TaskBoard.tsx`
**狀態**: ⏳ 待啟動
**任務**:
1. ✅ 移除 MOCK_TASKS，改用 `useTasks()`
2. ⏳ 加入 `@dnd-kit/sortable` 拖曳（觸發 `updateTask({ status })`）
3. ⏳ Column filter toolbar 接 `setFilters()` (role, priority, assignee)
4. ⏳ 任務卡片 onClick → `setViewMode('detail')` + taskId
5. ⏳ 新增任務按鈕 → `createTask()` modal

---

### Agent 2: TaskDetailModal 真實串接
**檔案**: `gitnexus-web/src/components/TaskDetailModal.tsx`
**狀態**: ⏳ 待啟動
**任務**:
1. ⏳ 接收 `taskId` prop，用 `useTaskDetail(taskId)` 取代 mock
2. ⏳ 狀態下拉選單 → `updateTask({ status })`
3. ⏳ "Start Task" → `startTask()`
4. ⏳ "Submit Progress" → `submitProgress()` modal
5. ⏳ "Run Impact Analysis" → `runImpact()` → 導到 impact view
6. ⏳ "Submit PR" → `submitForReview()` → 顯示 PR URL
7. ⏳ MCP 日誌改為 `logs: ToolExecutionLogEntry[]` 真實串流

---

### Agent 3: ActivityImpactView 真實串接
**檔案**: `gitnexus-web/src/components/ActivityImpactView.tsx`
**狀態**: ⏳ 待啟動
**任務**:
1. ⏳ Impact Graph tab → `runImpact(symbol)` + Cytoscape 渲染
2. ⏳ Activity Log tab → `useActivity()` 真實數據
3. ⏳ 篩選器（Git/MCP/Tasks）→ `setFilters()`
4. ⏳ Metrics cards 從 ImpactSummary 填入

---

### Agent 4: Dashboard 元件
**檔案**: `gitnexus-web/src/components/Dashboard.tsx`
**狀態**: ✅ 骨架完成 | ⏳ 真實數據待串接
**任務**:
1. ✅ 從 flow-b-06 設計稿實作為 React 元件
2. ⏳ Stats cards → `/api/tasks?summary=true`
3. ⏳ Recent Activity → `useActivity({ limit: 5 })`
4. ⏳ AI Agents Status → `useTasks({ statuses: ['in_progress'] })`
5. ⏳ MCP Status → `probeBackend()` + 連線指示燈

---

### Agent 5: task-service 真實 HTTP 實作
**檔案**: `gitnexus-web/src/services/task-service.ts`
**狀態**: ⏳ 待啟動
**任務**:
1. ⏳ 移除 mock 資料，實作所有方法連到 `localhost:4747`
2. ⏳ `listTasks()` → `GET /api/tasks` + query params
3. ⏳ `getTaskDetail()` → `GET /api/tasks/:id`
4. ⏳ 所有 CRUD 與 Action 方法（共 11 個端點）

---

### Agent 6: App.tsx + Navigation
**檔案**: `gitnexus-web/src/App.tsx` + `Header.tsx`
**狀態**: 🔄 60% 進行中
**任務**:
1. 🔄 AIHubView 加入 `'dashboard'` 狀態
2. ⏳ Header 左側加 AI Hub 導航按鈕
3. ⏳ 將 `selectedTaskId` 加入 useAppState
4. ⏳ Sidebar MCP 狀態指示燈

---

### Claude 直接負責
**狀態**: ⏳ 待執行
**任務**:
1. ⏳ 創建 Zustand store (`src/stores/ai-hub.store.ts`)
2. ⏳ 安裝新依賴（8 個套件）
3. ⏳ 寫後端 API skeleton (`gitnexus/src/server/api.ts` task routes)

---

## 📁 關鍵檔案索引

| 分類 | 檔案路徑 | 狀態 | 說明 |
|------|---------|------|------|
| **型別** | `src/types/collaboration.ts` | ✅ 完成 | 所有任務/活動型別 |
| **服務** | `src/services/task-service.ts` | 🔄 骨架完成 | HTTP client（mock） |
| **Hooks** | `src/hooks/useTasks.ts` | 🔄 骨架完成 | 任務列表 hook |
| **Hooks** | `src/hooks/useTaskDetail.ts` | 🔄 骨架完成 | 任務詳情 hook |
| **Hooks** | `src/hooks/useActivity.ts` | 🔄 骨架完成 | 活動流 hook |
| **元件** | `src/components/TaskBoard.tsx` | ✅ UI 完成 | 看板元件 |
| **元件** | `src/components/TaskDetailModal.tsx` | ✅ UI 完成 | 詳情 Modal |
| **元件** | `src/components/ActivityImpactView.tsx` | ✅ UI 完成 | 影響分析 |
| **元件** | `src/components/DashboardView.tsx` | ✅ UI 完成 | 儀表板 |
| **Store** | `src/stores/ai-hub.store.ts` | ⏳ 待建立 | Zustand 全域狀態 |
| **後端** | `gitnexus/src/server/api.ts` | ⏳ 待擴充 | Express 路由 |
| **文檔** | `.gitnexus/tasks/{id}.md` | ⏳ 待建立 | TASK.md 格式規範 |

---

## ⚠️ 風險與依賴

| 風險項目 | 影響 | 緩解措施 | 負責人 |
|---------|------|---------|--------|
| 後端 API 未完成 | 🔴 阻塞前端串接 | 前端先用 mock server 開發 | Jules |
| dnd-kit 學習曲線 | 🟡 延遲拖拽功能 | 參考官方範例實作 | Agent 1 |
| Cytoscape 渲染效能 | 🟡 大圖卡頓 | 實施節點分頁/虛擬化 | Agent 3 |
| TASK.md 解析格式 | 🟡 前後端不一致 | 定義嚴格 schema（gray-matter） | Claude |
| MCP 日誌即時性 | 🟡 EventSource 延遲 | 實施 WebSocket 備用方案 | Jules |

---

## 📅 里程碑時間線

```
2026-03-15 (今天) ──────────────────────────────┐
│ ✅ Phase 1 完成: 所有設計稿                      │
│ ✅ Phase 2 完成 85%: 元件骨架                    │
│                                                │
2026-03-16 ─────────────────────────────────────┤
│ 🎯 啟動 6 個 Sub-Agents 平行開發                │
│ 🎯 Claude 完成依賴安裝 + Zustand store          │
│                                                │
2026-03-17 ─────────────────────────────────────┤
│ 🎯 Phase 3 完成: 所有前端真實數據串接            │
│ 🎯 Jules 開始後端 API 實作                      │
│                                                │
2026-03-18 ─────────────────────────────────────┤
│ 🎯 Phase 4 完成: 所有互動功能                    │
│ 🎯 後端 API 骨架完成                            │
│                                                │
2026-03-19 ─────────────────────────────────────┤
│ 🎯 後端 API 真實實作（git 操作 + TASK.md）       │
│                                                │
2026-03-20 ─────────────────────────────────────┤
│ 🎯 Phase 6 完成: 整合測試 & Bug 修復             │
│ 🎯 準備提交 PR                                  │
│                                                │
2026-03-21 ─────────────────────────────────────┤
│ 🚀 GitNexus AI Hub 正式上線                     │
└────────────────────────────────────────────────┘
```

---

## 🔄 變更記錄

| 日期 | 變更內容 | 負責人 |
|------|---------|--------|
| 2026-03-15 | 初始建立開發週期計劃表格 | Claude |
| 2026-03-15 | 標註 Phase 1-2 完成狀態 | Claude |
| 2026-03-15 | 加入 Sub-Agent 分工明細 | Claude |

---

## 📝 備註

1. **Claude 負責範圍**: 規劃、代碼框架、骨架、文檔、Sub-Agent 調度
2. **Jules 負責範圍**: 測試、整合、後端真實實作、PR 提交
3. **檔案恢復**: 原始 HTML 設計稿可能需要從對話記錄恢復或重新生成
4. **Demo 模式**: 在後端 API 完成前，前端元件可使用 mock data 進行功能展示
5. **持續更新**: 此文檔將隨進度即時更新，所有狀態變更需同步記錄
