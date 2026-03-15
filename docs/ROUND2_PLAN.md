# GitNexus Round 2 執行計劃

**計劃生成日期**：2026-03-14
**團隊模式**：Quartet（四人團隊）
**計劃版本**：v1.0

---

## 📋 團隊分工表

| 代理 | 負責範圍 | R2 任務 | 交付物 | 禁區 |
|------|---------|--------|--------|------|
| **Claude Code CLI** | CLI 後端核心 | R2-A | export 指令 4 格式 + git diff + 測試指令 | Web UI、IndexedDB、Context Packet schema |
| **Jules (Gemini 3)** | Web UI 前端 | R2-B | IndexedDB schema + 4 匯出按鈕 + commit hash 檢查 | CLI export 指令、Context Packet、測試執行 |
| **Augment (GPT 5.4)** | 結構化重用機制 | R2-D | Context Packet v1 JSON schema + bundle 還原範例 + 跨 AI 傳遞文件 | 任何程式碼實作、UI 按鈕、測試執行 |
| **AntiGravity** | 整合測試與驗證 | R2-C | CLI bundle 還原測試 + Web UI ↔ IndexedDB 互通測試 + git diff 效能報告 | 新功能開發，僅執行現有測試 |

---

## 🎯 第二輪並行工作分派

### R2-A：Claude Code CLI（export 指令與增量索引修復）

**負責人**：Claude Code CLI (developer)
**優先級**：P0 🔴
**預計完成**：2-3 天
**分支**：`feature/r2-export-cli`

#### 工作項目

1. **修復增量索引後 Communities/Processes 計數不穩定**
   - 問題：增量索引後使用局部 graph 重算，結果不準確
   - 解決方向：
     - Phase 1: 只 parse 變更文件（現有）✅
     - Phase 2: KuzuDB 刪舊節點 + 插入新節點（現有）✅
     - Phase 3: [新增] 重新從 KuzuDB 完整讀取 graph，全量重算 Communities + Processes
   - 關鍵檔案：`src/pipeline.ts`, `src/analyze.ts`

2. **整合 Augment schema 到正確位置**
   - origin/feature/structured-reuse-mechanism 的檔案：
     - `types/code_context_packet.ts` → `gitnexus/src/types/context-packet.ts`
     - `schemas/code_context_packet_v1.json` → `gitnexus/src/schemas/context-packet-v1.json`

3. **新增 4 個 export 指令格式**
   ```bash
   gitnexus export --format=json          # 標準 JSON 輸出
   gitnexus export --format=graphml       # GraphML 格式
   gitnexus export --format=cypher        # Cypher 查詢語言
   gitnexus export --format=bundle        # .gitnexus.bundle 二進制包
   ```

4. **新增 git diff 增量管線指令**
   ```bash
   gitnexus diff <commit1> <commit2>  # 比較兩個 commit 的圖形差異
   ```

5. **新增 Context Packet 命令**
   ```bash
   gitnexus packet <symbolName> --depth=2 -o packet.json
   ```

6. **清理測試 commit**
   - 需 squash 的 3 個測試 commit

#### 檢查清單

- [ ] Phase 3 增量索引邏輯實作
- [ ] Phase 3 單元測試通過
- [ ] Communities/Processes 計數穩定性驗證
- [ ] schema 檔案搬移完成
- [ ] 4 個 export 格式指令完成
- [ ] export API 提供給 R2-B 接入
- [ ] git diff 指令可運作
- [ ] packet 命令可執行
- [ ] 3 個測試 commit 已 squash
- [ ] 所有變更通過本地測試

---

### R2-B：Jules Web UI（匯出按鈕與 IndexedDB）

**負責人**：Jules (Gemini 3)
**優先級**：P0 🔴
**預計完成**：3-4 天（Day 2-3，依賴 R2-A export API）
**分支**：`feature/web-ui-export-buttons`

#### 工作項目

1. **在 Header.tsx 新增「Export」下拉按鈕**
   - 4 個選項：
     - Download JSON
     - Download GraphML
     - Download Cypher
     - Download Bundle (.gitnexus.bundle)
   - 每個選項調用 `GET /api/export?format=<json|graphml|cypher|bundle>`
   - 觸發瀏覽器檔案下載

2. **在 SettingsPanel.tsx 新增「Clear Graph Cache」按鈕**
   - 呼叫 `clearGraphCache()` from `core/cache/graph-cache.ts`

3. **在 services/backend.ts 新增 placeholder 函式**
   ```typescript
   export async function exportGraph(baseUrl: string, format: string): Promise<Blob>
   ```

4. **IndexedDB schema 與快取邏輯**
   - 儲存/載入機制
   - 快取失效策略

5. **commit hash 檢查機制**
   - 驗證快取版本與當前 commit 的一致性

#### 檢查清單

- [ ] Header.tsx Export 下拉按鈕實作
- [ ] 4 個匯出選項 UI 正常顯示
- [ ] 每個選項可觸發下載
- [ ] SettingsPanel.tsx Clear Cache 按鈕就位
- [ ] IndexedDB schema 定義完成
- [ ] IndexedDB 快取儲存/載入邏輯完成
- [ ] commit hash 檢查機制實作
- [ ] services/backend.ts exportGraph() 函式實作
- [ ] Web UI ↔ IndexedDB 互通測試通過

---

### R2-D：Augment Schema 整合與 REST API

**負責人**：Augment (GPT 5.4)
**優先級**：P1 🟡
**預計完成**：2 天
**分支**：`feature/structured-reuse-mechanism`（續用）

#### 工作項目

1. **移動檔案到正確位置**
   - `types/code_context_packet.ts` → `gitnexus/src/types/context-packet.ts`
   - `schemas/code_context_packet_v1.json` → `gitnexus/src/schemas/context-packet-v1.json`
   - 保持原 docs/ 檔案不動

2. **新增 REST API 端點** `/api/packet`
   ```
   GET /api/packet?symbol=<name>&depth=2&repo=<name>

   Response: CodeContextPacket JSON matching schema
   {
     packet_id: string,
     version: string,
     source: string,
     timestamp: string,
     context_type: string,
     data: { ... },
     summary: string
   }
   ```
   - 關鍵檔案：`gitnexus/src/server/api.ts`

3. **實裝 gitnexus packet 指令**
   ```bash
   gitnexus packet <symbol> [--depth <n>] [-o <file>] [--repo <name>]
   ```
   - 關鍵檔案：`gitnexus/src/cli/index.ts`
   - 參考邏輯：`gitnexus/src/mcp/local/local-backend.ts:context()`

4. **交付物**
   - ✅ Context Packet v1 JSON schema（已完成，需重定位）
   - 🆕 bundle 還原使用範例（含程式碼片段）
   - 🆕 跨 AI 傳遞協議文件更新

#### 檢查清單

- [ ] schema 檔案搬移至 `gitnexus/src/`
- [ ] `/api/packet` 端點規格文件完成
- [ ] `/api/packet` 實作在 api.ts 中
- [ ] `gitnexus packet` 指令規格完成
- [ ] `gitnexus packet` 實作在 cli/index.ts 中
- [ ] bundle 還原範例已撰寫
- [ ] 跨 AI 傳遞協議文件已更新（docs/cross_ai_communication_protocol.md）
- [ ] API endpoint 與 CLI 命令驗證通過

---

### R2-C：AntiGravity 測試計劃與驗證

**負責人**：AntiGravity
**優先級**：P1 🟡
**預計完成**：Day 3-4（待其他三隊里程碑）
**分支**：無新分支，在主分支執行測試

#### 工作項目（準備階段 - Day 1）

1. **準備測試用例清單**
   - CLI bundle 還原測試
   - Web UI ↔ IndexedDB 互通測試
   - git diff 增量效能測試
   - 邊界案例清單

2. **環境設定與依賴檢查**

#### 工作項目（執行階段 - Day 2-3）

1. **CLI bundle 還原測試**
   - R2-A 發佈 export API 後進行
   - 驗證 `.gitnexus.bundle` 可正確還原

2. **Web UI ↔ IndexedDB 互通測試**
   - R2-B UI 完成後進行
   - 驗證 export/import 數據完整性

3. **git diff 增量效能測試**
   - 比較 git diff 與原始 analyze 性能
   - 產生效能報告

4. **邊界案例驗證**
   - 空 graph 匯出
   - 大型 graph（100K+ 節點）匯出
   - 增量索引異常情況

#### 檢查清單

- [ ] 測試計劃文檔完成
- [ ] CLI bundle 還原測試通過
- [ ] Web UI ↔ IndexedDB 互通測試通過
- [ ] git diff 效能報告完成
- [ ] 邊界案例驗證完成
- [ ] 所有測試日誌記錄
- [ ] 問題清單整理（若有）

---

## 📅 協調時間表

| 日期 | 里程碑 | 負責 | 關鍵交付 |
|------|--------|------|---------|
| **Day 1** | 四隊並行啟動 | R2-A, R2-B, R2-D, R2-C | 計劃文檔、環境準備 |
| **Day 2** | R2-A export API 發佈、R2-B 接入開發 | A、B 協調 | export 指令 4 格式、UI 骨架 |
| **Day 3** | R2-B UI 完成、R2-D 文件交付、R2-C 開始測試 | B、D、C | Web UI 功能完整、schema 文件 |
| **Day 4** | 全量測試、commit 清理、PR 準備 | 全隊 | 測試報告、PR ready |

---

## 🔗 關聯檔案

- **R2-A 關鍵檔案**：
  - `src/analyze.ts` - 增量索引主邏輯
  - `src/pipeline.ts` - 索引管線
  - `src/cli/export.ts` - export 指令（新）
  - `src/types/context-packet.ts` - schema（搬移）

- **R2-B 關鍵檔案**：
  - `gitnexus-web/src/components/Header.tsx`
  - `gitnexus-web/src/components/SettingsPanel.tsx`
  - `gitnexus-web/src/services/backend.ts`
  - `gitnexus-web/src/core/cache/graph-cache.ts`

- **R2-D 關鍵檔案**：
  - `gitnexus/src/server/api.ts` - REST API
  - `gitnexus/src/cli/index.ts` - CLI 指令註冊
  - `gitnexus/src/types/context-packet.ts` - schema
  - `docs/cross_ai_communication_protocol.md` - 協議文件

- **R2-C 關鍵檔案**：
  - `.gitnexus/tests/` - 測試目錄
  - `docs/test-reports/round2-*.md` - 測試報告

---

## 📝 協作規則

1. **Claude Code CLI (R2-A)**
   - ✅ 只改 CLI 原始碼
   - ❌ 不碰 Web UI、IndexedDB、Context Packet schema

2. **Jules (R2-B)**
   - ✅ 只改 React/TS 前端
   - ❌ 不碰 CLI export 指令、Context Packet、測試執行

3. **Augment (R2-D)**
   - ✅ 只產文件與 schema
   - ❌ 不寫任何程式碼實作、UI 按鈕、執行測試

4. **AntiGravity (R2-C)**
   - ✅ 只執行現有測試與驗證
   - ❌ 不修改原始碼（除了新增測試檔）

---

## 🚀 啟動指令

```bash
# R2-A: 建立工作分支
git checkout -b feature/r2-export-cli main

# R2-B: 基於 main 建立 UI 分支
git checkout -b feature/web-ui-export-buttons main

# R2-D: 繼續已有分支
git checkout feature/structured-reuse-mechanism

# R2-C: 無需新分支，在 main 執行測試
```

---

**計劃版本歷史**：
- v1.0（2026-03-14）：初版發佈
