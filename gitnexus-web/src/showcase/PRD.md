# GitNexus Web Interactive Demo - PRD (v2.0)

**文件版本**: 2.0  
**最後更新**: 2026-03-15  
**狀態**: ✅ 已實現

---

## 📋 概述

GitNexus Web Interactive Demo 是一個完全獨立的前端展示頁面，無需後端、無需登入、無需資料庫連線，即可直接體驗 GitNexus Web 的核心互動模型。

### 核心目標
- ✅ 提供開箱即用的產品演示環境
- ✅ 支援多種資料模式選擇（Demo / GitNexus Data / Live Data）
- ✅ Demo 模式預設快速進入，提升用戶體驗
- ✅ 支援靈活的視覺設定調整
- ✅ 完整的互動功能展示

---

## 🎯 功能需求

### 1. 分析對象選擇頁面
**需求**: 首次進入時顯示三種模式選擇
- **Demo Mode**: 使用預設的 mock graph 資料
- **GitNexus Data Mode**: 載入真實的 .gitnexus/ 資料
- **Live Data Mode**: 未來的後端連線模式（目前為空狀態）

**實現狀態**: ✅ 完成

### 2. Demo 模式快速進入
**需求**: Demo 模式預設跳過選擇頁面，直接進入分析展示
- 初始狀態自動進入 Demo 模式
- 無需額外點擊即可開始體驗

**實現狀態**: ✅ 完成

### 3. 重新選擇分析對象
**需求**: 左上角新增按鈕，支援隨時返回選擇頁面
- 按鈕位置：左上角（Logo 下方）
- 功能：點擊返回分析對象選擇頁面
- 支援在 exploring 和 hub 視圖中使用

**實現狀態**: ✅ 完成

### 4. Canvas Display Settings
**需求**: 左側控制面板支援動態調整視覺設定
- Node Labels: 顯示/隱藏節點標籤
- Edge Labels: 顯示/隱藏邊線標籤
- Node Icons: 顯示/隱藏節點圖標
- Highlight Neighbors: 高亮相鄰節點
- Minimap: 顯示/隱藏小地圖
- Node Size: 調整節點大小（small / medium / large）
- Edge Thickness: 調整邊線粗細（thin / medium / thick）

**實現狀態**: ✅ 完成

### 5. 互動功能
**需求**: 完整的圖表互動功能
- Node hover preview: 滑過節點顯示預覽
- Node click: 點擊開啟 inspector sidebar
- Right-click context menu: 右鍵顯示操作選單
- Sidebar pin/unpin: 固定 inspector 內容
- Field visibility toggle: 切換 tags / risk / relations / metadata
- Mock impact analysis: 顯示 mock blast radius

**實現狀態**: ✅ 完成

---

## 🏗️ 技術架構

### 狀態管理
- **demoReducer**: 集中管理所有 demo 狀態
- **DemoState**: 包含 dataMode、showSelectionPage、canvasDisplay 等
- **DemoAction**: 支援 SET_MODE、SHOW_SELECTION_PAGE、START_ANALYSIS 等操作

### 頁面流程
```
初始化 (Demo 模式)
  ↓
showSelectionPage = false
  ↓
直接進入分析展示
  ↓
左上角「重新選擇」按鈕
  ↓
返回選擇頁面
```

### 資料流
- **Demo Mode**: 使用 mock-graph-data.ts 中的預設資料
- **GitNexus Data Mode**: 載入 gitnexus-graph-data.json
- **Live Data Mode**: 空狀態佔位符

---

## 📊 使用場景

### 1. 產品演示（Demo Day）
無需搭建完整環境，開箱即用展示產品功能

### 2. 設計審查（Design Review）
UI/UX 與前端共同審查互動流程

### 3. 空資料 Onboarding
使用者尚未登入、尚未接後端時的體驗

### 4. 開發驗證（Feature Validation）
快速驗證互動邏輯，無需等待後端 API

---

## ✅ 驗收標準

- [x] 首次進入顯示分析對象選擇頁面
- [x] Demo 模式預設跳過選擇頁面
- [x] 左上角「重新選擇」按鈕可用
- [x] Canvas Display Settings 面板完整
- [x] 所有互動功能正常運作
- [x] 三種模式可正確切換
- [x] 視覺設定實時應用到畫布

---

## 🔄 版本歷史

### v2.1 (2026-03-15 - 功能整合)
- ✅ 整合浮動聊天欄到主應用
- ✅ 整合語言/主題切換到主應用
- ✅ 整合畫布顯示設定到主應用
- ✅ 整合 Task Detail Modal 到全局
- ✅ 實現邊線粗細動態調整
- ✅ Demo 頁面完整功能展示

### v2.0 (2026-03-15)
- ✅ 新增分析對象選擇頁面
- ✅ Demo 模式預設快速進入
- ✅ 新增「重新選擇分析對象」按鈕
- ✅ 新增 Canvas Display Settings 面板

### v1.0 (2026-03-10)
- ✅ 基礎互動功能實現
- ✅ Mock graph 資料
- ✅ Inspector sidebar
- ✅ Context menu

