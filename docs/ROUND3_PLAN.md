# GitNexus Round 3 執行計劃

**計劃生成日期**：2026-03-15
**團隊模式**：Quintet（五人團隊，基於用戶分配）
**計劃版本**：v1.0
**前置狀態**：Round 2 約 60% 完成，索引已更新，Web UI 運行於 http://localhost:5174/。

---

## 📋 團隊分工表

| 代理 | 模型 | 負責範圍 | R3 任務 | 交付物 | 禁區 |
|------|------|---------|--------|--------|------|
| **Arcumen** | Chat GPT 5.4 | Schema 與 API 文件 | R3-D | Context Packet v1 更新、跨 AI 協議文件、bundle 還原範例 | 程式碼實作、UI 修改、測試執行 |
| **Cline** | Grok-4-fast | CLI 工具開發 | R3-A | Export 指令 (4 格式)、git diff 指令、增量索引 Phase 3 修復 | Web UI、IndexedDB、MCP 端點 |
| **Claude Code** | Claude Opus/Sonnet 4.6 | Web UI 整合 | R3-B | Export 下拉按鈕、Clear Cache 按鈕、IndexedDB schema 與 commit hash 檢查 | CLI 命令、API 端點、測試腳本 |
| **Gemini CLI** | Gemini-3.1-flash/pro | 測試驗證 | R3-C | CLI bundle 還原測試、Web UI 互通測試、git diff 效能報告 | 新功能開發，僅驗證現有 |
| **Antigravity** | Gemini-3.1-flash/pro | 整體協調 | R3-E | 進度追蹤、衝突解決、AI 溝通整合 (基於 AI_GUIDE_*.md) | 核心開發，僅監控與文件 |

---

## 🎯 第三輪並行工作分派

### R3-A：Cline CLI（增量索引穩定化與 Export 工具）

**負責人**：Cline (Grok-4-fast)
**優先級**：P0 🔴
**預計完成**：2 天
**分支**：`feature/r3-cli-export-tools`

#### 工作項目
1. **Phase 3 增量索引修復**：
   - 在 pipeline.ts 的 communities 與 processes 階段，新增全量重算邏輯 (processCommunities & processProcesses)。
   - 關鍵檔案：`src/core/ingestion/pipeline.ts`、`src/cli/analyze.ts`。

2. **新增 4 個 export 指令**：
   ```bash
   gitnexus export --format=json    # JSON 輸出
   gitnexus export --format=graphml # GraphML
   gitnexus export --format=cypher  # Cypher
   gitnexus export --format=bundle  # .gitnexus.bundle
   ```
   - 實作 export 邏輯，使用 buildGraph 從 KuzuDB 匯出。
   - 新建 `src/cli/export.ts`。

3. **git diff 增量管線**：
   ```bash
   gitnexus diff <commit1> <commit2>  # 比較圖形差異
   ```
   - 使用 Cypher 查詢差異。

4. **Context Packet 命令**：
   ```bash
   gitnexus packet <symbol> --depth=2 -o packet.json
   ```
   - 整合至 index.ts。

#### 檢查清單
- [ ] Phase 3 邏輯實作與測試
- [ ] 4 個 export 格式支援
- [ ] git diff 指令運作
- [ ] packet 命令輸出符合 schema
- [ ] gitnexus_impact 檢查所有變更 (無 HIGH 風險)

---

### R3-B：Claude Code Web UI（匯出按鈕與 IndexedDB）

**負責人**：Claude Code (Opus/Sonnet 4.6)
**優先級**：P0 🔴
**預計完成**：2-3 天 (依賴 R3-A export API)
**分支**：`feature/r3-web-ui-export`

#### 工作項目
1. **Header.tsx Export 下拉**：
   - 4 選項調用 `/api/export?format=<type>&repo=<name>`。
   - 觸發 Blob 下載。

2. **SettingsPanel.tsx Clear Cache**：
   - 呼叫 clearGraphCache()。

3. **IndexedDB 實作**：
   - Schema 定義 (nodes/relationships)。
   - 快取失效：commit hash 檢查。

4. **backend.ts 擴充**：
   ```typescript
   export async function exportGraph(repo: string, format: string): Promise<Blob> {
     // 調用 /api/export
   }
   ```

#### 檢查清單
- [ ] Export 按鈕 UI 與下載
- [ ] Clear Cache 功能
- [ ] IndexedDB 儲存/載入
- [ ] commit hash 驗證
- [ ] 無影響現有 App.tsx 功能

---

### R3-D：Arcumen Schema 整合與 REST API

**負責人**：Arcumen (Chat GPT 5.4)
**優先級**：P0 🔴
**預計完成**：1-2 天
**分支**：`feature/r3-schema-api`

#### 工作項目
1. **Schema 搬移與更新**：
   - `src/types/context-packet.ts` 與 `src/schemas/context-packet-v1.json`。
   - 更新 v1 格式包含 timestamp、summary。

2. **/api/packet 端點**：
   ```typescript
   app.get('/api/packet', async (req, res) => {
     const symbol = req.query.symbol as string;
     const depth = Number(req.query.depth ?? 2);
     // 使用 backend.queryContext(symbol, depth)
     res.json(packetData);
   });
   ```
   - 關鍵檔案：`src/server/api.ts`。

3. **gitnexus packet 指令**：
   - 註冊至 index.ts，輸出 JSON。

4. **文件交付**：
   - bundle 還原範例 (程式碼片段)。
   - 更新 `docs/cross_ai_communication_protocol.md` 整合 AI 溝通平台。

#### 檢查清單
- [ ] Schema 檔案就位
- [ ] /api/packet 端點規格與實作
- [ ] packet 指令
- [ ] 文件更新

---

### R3-C：Gemini CLI 測試計劃與驗證

**負責人**：Gemini CLI (Gemini-3.1-flash/pro)
**優先級**：P1 🟡
**預計完成**：Day 3-4
**分支**：無，於 main 執行

#### 工作項目
1. **CLI bundle 還原測試**：
   - Export bundle 後還原 graph，驗證一致性。

2. **Web UI ↔ IndexedDB 測試**：
   - Export 下載與 IndexedDB 載入。

3. **git diff 效能報告**：
   - 比較 diff vs. full analyze 時間。

4. **邊界測試**：
   - 空 repo、大型 graph (100K+ 節點)。

#### 檢查清單
- [ ] Bundle 測試通過
- [ ] UI 互通測試
- [ ] 效能報告
- [ ] 邊界案例記錄

---

### R3-E：Antigravity 協調與溝通

**負責人**：Antigravity (Gemini-3.1-flash/pro)
**優先級**：P1 🟡
**預計完成**：全程
**分支**：無

#### 工作項目
1. **進度追蹤**：使用 MCP resources 更新任務狀態。
2. **衝突解決**：審核 PR，使用 gitnexus_detect_changes。
3. **整合 AI 平台**：更新 AI_GUIDE_*.md 反映 R3 角色。

#### 檢查清單
- [ ] 每日進度報告
- [ ] 所有 PR 審核
- [ ] 溝通文件更新

---

## 📅 協調時間表

| 日期 | 里程碑 | 負責 | 關鍵交付 |
|------|--------|------|---------|
| **Day 1** | 準備與並行啟動 | 全隊 | 索引更新、環境驗證 |
| **Day 2** | R3-A/D 完成，R3-B 接入 | A/B/D | Export 工具、API 端點 |
| **Day 3** | R3-B 完成，R3-C 測試 | B/C | UI 功能、初步測試 |
| **Day 4** | 全量測試、PR 合併 | 全隊 | 測試報告、文件 |

---

## 🔗 關聯檔案

- **R3-A**：`src/core/ingestion/pipeline.ts`、`src/cli/export.ts` (新建)
- **R3-B**：`gitnexus-web/src/components/Header.tsx`、`src/services/backend.ts`
- **R3-D**：`src/server/api.ts`、`src/types/context-packet.ts`
- **R3-C**：`test/integration/`、`docs/test-reports/r3.md`
- **R3-E**：`AI_COMMUNICATION_PLATFORM.md`、`docs/ROUND3_PLAN.md`

---

## 📝 協作規則

- 遵循 AGENTS.md：所有編輯前 run gitnexus_impact，commit 前 detect_changes。
- 使用 AI 溝通平台：任務分配透過 TASK.md，狀態更新至 MCP resources。
- 風險警告：若 impact HIGH，立即通知 Antigravity。

---

## 🚀 啟動指令

```bash
# 全隊：更新索引
npx gitnexus analyze --embeddings

# R3-A: 分支
git checkout -b feature/r3-cli-export-tools main

# R3-B: 分支
git checkout -b feature/r3-web-ui-export main

# R3-D: 分支
git checkout -b feature/r3-schema-api main
```

**計劃版本歷史**：
- v1.0（2026-03-15）：基於 Round 2 狀態生成