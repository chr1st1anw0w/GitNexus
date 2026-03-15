# AI 與 AI 之間溝通平台規劃

## 介紹
此文件為 GitNexus 專案規劃一個強大且有效的 AI 間溝通平台，確保所有 AI Agent（包括 CLI、Website、GitHub 及本地端）能夠進行可追溯的代碼編輯記錄、工作任務分配及完成事項追蹤。平台設計以 GitNexus 的核心功能為基礎，整合 Git 版本控制、MCP 工具及專屬溝通通道，實現跨環境的協作。

## 核心需求
- **可追溯性**：所有代碼編輯、任務分配及完成事項需記錄在 Git 提交中，包含 AI 角色簽名及時間戳。
- **跨環境支援**：CLI（透過 GitNexus CLI）、Website（GitNexus Web）、GitHub（PR 及 Issues）、本地端（檔案系統整合）。
- **角色分配**：
  1. **PM 角色**：Rock 及 Claude 負責專案管理、任務分配及進度追蹤。
  2. **UI 設計**：Gemini、Stitch 及 Jules 負責介面設計及原型製作。
  3. **代碼優化與輔助**：Argument 提供輔助優化，其餘代碼由 Jules（J-U-L-E-S）負責主要優化及實作。
- **溝通原則**：所有溝通需透過結構化格式（如 Markdown 任務文件），避免口頭或非正式訊息；使用 GitNexus MCP 工具進行影響分析及變更追蹤。

## 平台架構
### 1. 中央溝通 Hub
- **GitNexus 作為核心**：利用 GitNexus 的 graph 資料庫及 MCP 伺服器作為溝通中樞。
  - **任務分配**：PM (Rock/Claude) 透過 GitNexus CLI 建立任務分支（e.g., `git checkout -b task/ui-design-gemini`），並在分支中建立 `TASK.md` 文件描述分配細節。
  - **記錄機制**：每個 AI 在編輯代碼後，必須 commit 時附加訊息如 `[AI:Role] 任務描述 - 完成事項`，並使用 GitNexus `analyze` 更新索引。
- **跨環境整合**：
  - **CLI**：使用 `npx gitnexus mcp` 工具，讓 AI 透過 MCP 資源存取共享任務狀態（e.g., `gitnexus://repo/GitNexus/tasks`）。
  - **Website**：GitNexus Web 整合即時任務看板，AI 可透過 API 更新狀態（見 `gitnexus-web/src/services/task-service.ts`）。
  - **GitHub**：使用 GitHub Actions 鉤子，自動觸發 GitNexus 分析 PR，確保變更可追溯；Issues 用於任務討論，標記 `@AI-Role`。
  - **本地端**：本地 AI Agent 透過 GitNexus hooks（如 `pre-commit`）強制記錄變更。

### 2. 溝通協議
- **任務格式**：所有任務使用標準 Markdown 模板：
  ```
  # 任務 ID: [ID]
  ## 分配角色: [Role]
  ## 描述: [細節]
  ## 截止: [日期]
  ## 狀態: [待辦/進行中/完成]
  ## 相關檔案: [清單]
  ## 變更記錄: [Git commit hashes]
  ```
- **AI 間訊息交換**：使用 GitNexus `resources` 機制，AI 寫入/讀取共享資源（e.g., `access_mcp_resource` 工具存取 `gitnexus://tasks/{task-id}`）。
- **衝突解決**：PM 角色審核所有 PR，使用 GitNexus `impact` 分析確保變更安全。

### 3. 實施步驟
1. **設定共享資源**：在 `.mcp.json` 中新增 `tasks` 資源端點。
2. **開發 Hooks**：擴充 `gitnexus/hooks` 加入 AI 簽名驗證。
3. **整合 Web 介面**：在 GitNexus Web 新增任務面板。
4. **測試跨環境**：模擬多 AI 協作，驗證追溯性。
5. **文件化**：為每個角色建立專屬指南（見下方）。

## 風險與最佳實務
- **風險**：索引過時導致追溯失敗 → 每 commit 後執行 `npx gitnexus analyze`。
- **最佳實務**：所有 AI 必須遵循 AGENTS.md 規則，使用 `gitnexus_impact` 前置檢查；定期同步 GitHub。

此平台將提升 AI 協作效率，確保 GitNexus 專案的順利推進。