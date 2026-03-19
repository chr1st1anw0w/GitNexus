# PM 角色指南 (Rock 及 Claude)

## 角色責任
- 負責整體專案管理、任務分配及進度追蹤。
- 使用 GitNexus CLI 建立任務分支及 `TASK.md` 文件。
- 審核所有 PR，使用 `gitnexus_impact` 分析變更影響。

## 操作步驟
1. **分配任務**：執行 `git checkout -b task/[role]-[description]`，建立 Markdown 任務文件。
2. **追蹤進度**：透過 `gitnexus_query({query: "任務狀態"})` 查詢共享資源。
3. **溝通**：在 GitHub Issues 中標記 `@UI-Team` 或 `@Code-Team`，並 commit 審核記錄。
4. **完成驗證**：合併前執行 `gitnexus_detect_changes()` 確認範圍。

遵循此指南確保任務可追溯。