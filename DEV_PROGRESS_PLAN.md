# GitNexus Web UI 開發進度規劃
**日期**：2026-03-15
**分支**：`feature/pattern-generator-html-demos`
**狀態**：🔴 需要確認開發進度

---

## 📊 第一部分：本地資料庫一致性檢查報告

### 1️⃣ AppContent 元件分析

**檔案**：[gitnexus-web/src/App.tsx](gitnexus-web/src/App.tsx)（315 行）

#### 核心功能（已實作）
| 功能 | 狀態 | 說明 |
|------|------|------|
| **Zip 上傳處理** | ✅ 已實作 | 透過 `handleFileSelect` 處理 .zip 檔案 |
| **Git 倉庫克隆** | ✅ 已實作 | 透過 `handleGitClone` 處理文件陣列 |
| **遠端伺服器連線** | ✅ 已實作 | 透過 `handleServerConnect` + auto-connect 功能 |
| **知識圖譜構建** | ✅ 已實作 | `createKnowledgeGraph()` + `graph.addNode/addRelationship` |
| **嵌入管道** | ✅ 已實作 | WebGPU + WASM 回退 |
| **LLM Agent 初始化** | ✅ 已實作 | 與 Settings Panel 綁定 |
| **檔案樹面板** | ✅ 已實作 | `FileTreePanel` 元件 |
| **代碼參考面板** | ✅ 已實作 | `CodeReferencesPanel` 覆蓋元件 |
| **倉庫切換器** | ✅ 已實作 | 透過 `Header` + `switchRepo` |

#### 資料流向
```
上傳/連線
    ↓
Pipeline（Zip/Files） → createKnowledgeGraph() → setGraph() + setFileContents()
    ↓
initializeAgent() → startEmbeddings()
    ↓
UI 渲染：GraphCanvas + FileTree + RightPanel
```

#### 關鍵 Hook 依賴（useAppState）
```typescript
const {
  viewMode, setViewMode,           // 視圖狀態：onboarding/loading/exploring
  setGraph, setFileContents,       // 資料設定
  setProgress, setProjectName,     // 進度跟蹤
  runPipeline, runPipelineFromFiles, // Pipeline 執行
  isSettingsPanelOpen,             // Settings 面板
  refreshLLMSettings, initializeAgent, startEmbeddings, // LLM 相關
  codeReferences, selectedNode,    // 代碼參考
  serverBaseUrl, availableRepos    // 伺服器連線
}
```

---

### 2️⃣ generateId 函式分析

**檔案**：`gitnexus-web/src/lib/utils.ts`

```typescript
export const generateId = (label: string, name: string): string => {
  return `${label}:${name}`
}
```

**⚠️ 一致性風險**
- **當前實作**：簡單的字串連接 `label:name`
- **潛在問題**：
  - ❌ 重複項目無法去重（相同 label:name 會重複）
  - ❌ 特殊字符未轉義（`:`、`/` 等）
  - ❌ KuzuDB 索引 ID 與前端 ID 是否一致？

**建議改進**：
```typescript
// Option 1: UUID-based（推薦）
import { v4 as uuidv4 } from 'uuid';
export const generateId = (label: string, name: string): string => {
  return `${label}_${uuidv4().slice(0, 8)}`;
}

// Option 2: Hash-based
import { hash } from 'crypto';
export const generateId = (label: string, name: string): string => {
  const key = `${label}:${name}`;
  const hashValue = hash('sha256', key).slice(0, 8);
  return `${label}_${hashValue}`;
}
```

---

### 3️⃣ Dependencies 分析

**關鍵依賴**（已安裝）
| 套件 | 版本 | 用途 |
|------|------|------|
| `kuzu-wasm` | ^0.11.1 | KuzuDB WASM 運行時 |
| `graphology` | ^0.26.0 | 圖結構管理 |
| `d3` | ^7.9.0 | 圖可視化 |
| `sigma` | ^3.0.2 | 高效圖渲染 |
| `@langchain/*` | ^1.x | LLM 集成 |
| `web-tree-sitter` | ^0.20.8 | 程式碼解析 |

---

## 🎯 第二部分：Web UI 功能規劃

### 🟢 已實作功能
- ✅ Zip 上傳拖放區域
- ✅ Loading 進度條
- ✅ 圖形視覺化（GraphCanvas）
- ✅ 檔案樹導覽
- ✅ 代碼參考面板
- ✅ Settings 面板（LLM 配置）
- ✅ Status Bar

### 🟡 部分實作或需要確認
| 功能 | 狀態 | 待確認項目 |
|------|------|----------|
| **遠端伺服器連線** | 🟡 部分 | 是否已連接 GitNexus 後端？ |
| **倉庫切換器** | 🟡 部分 | `fetchRepos()` 是否正常工作？ |
| **KuzuDB 查詢** | 🟡 未確認 | Web UI 是否直接查詢 KuzuDB？ |
| **嵌入管道** | 🟡 未確認 | WebGPU 是否正常初始化？ |
| **代碼搜尋** | 🟡 未實作 | 是否支援全文搜尋？ |

### 🔴 需要開發的功能
1. **KuzuDB 本地查詢介面**
   - 展示圖節點統計
   - Cypher 查詢編輯器
   - 查詢結果視覺化

2. **分析面板**
   - Hotspots 檢測（呼叫頻率最高的符號）
   - 依賴圖統計（循環依賴檢測）
   - 程式碼品質指標

3. **變更影響分析 UI**
   - Risk Level 色碼顯示
   - 受影響符號樹狀圖
   - 流程追蹤視圖

4. **AI 輔助工具**
   - 上下文感知程式碼補完
   - 自動重構建議
   - PR 描述生成

---

## 📋 第三部分：開發進度狀態

### 當前分支狀態
```
分支：feature/pattern-generator-html-demos
HEAD：6e2e4b4e (chore: Resolve merge conflicts...)
最近提交：69a5b802 (feat: Add complete React application and HTML demos)
距 main：未知（需執行 git log main..HEAD）
```

### 檔案修改統計
- **App.tsx**：完整重構（315 行）
- **utils.ts**：generateId 簡化（3 行）
- **package.json**：依賴已完整配置
- **index.html**、**vite.config.ts**、**main.tsx** 已更新

### ✅ 已驗證
- React 18.3.1 應用結構完整
- TypeScript 強型別檢查
- Tailwind CSS 集成
- 所有核心 LangChain 依賴已安裝

### ⚠️ 需要確認
1. **本地開發環境是否可執行**？
   ```bash
   cd gitnexus-web && pnpm install && pnpm dev
   ```
2. **KuzuDB WASM 是否正常初始化**？
3. **遠端伺服器 API 端點是否配置正確**？

---

## 🚀 後續步驟

### Phase 1：環境驗證（今日）
- [ ] 確認 `pnpm install` 成功
- [ ] 運行 `pnpm dev` 並訪問 http://localhost:5173
- [ ] 測試 Zip 上傳（應看到 Loading → Graph 視圖）
- [ ] 驗證 Settings Panel LLM 配置
- [ ] 檢查瀏覽器主控台是否有錯誤

### Phase 2：資料庫一致性檢查（您手動運行）
```bash
# 在外部終端運行（避免 AI token 浪費）
cd gitnexus && npx gitnexus analyze
# 這會更新 .gitnexus/ 目錄中的索引
```

### Phase 3：Web UI 功能擴展（下一步）
- KuzuDB 查詢面板
- 符號統計展示
- 變更影響視覺化
- AI 輔助分析

---

## 📝 AI 助手操作指南

### 何時調用外部終端（避免 token 浪費）
```bash
# ❌ 不要讓 AI 執行這些（太耗 token）：
npx gitnexus analyze          # 完整索引重新生成
npm install / pnpm install   # 大型依賴安裝
pnpm build                    # 完整構建

# ✅ 可以讓 AI 執行這些（快速且有用）：
pnpm dev                      # 啟動開發伺服器
npm run lint                  # 代碼檢查
git status                    # Git 狀態查詢
```

### 何時使用 GitNexus MCP 工具
| 工具 | 用途 | 何時避免 |
|------|------|--------|
| `gitnexus_query` | 尋找程式碼概念 | 已知精確檔案位置時 |
| `gitnexus_context` | 360 度符號檢視 | 簡單 grep 即可時 |
| `gitnexus_impact` | 變更影響分析 | 一次性修改時 |
| `gitnexus_detect_changes` | 提交前驗證 | 每次都應執行 |

---

**最後更新**：2026-03-15
**作者**：Claude Code (Haiku 4.5)
**狀態**：⏳ 等待本地驗證
