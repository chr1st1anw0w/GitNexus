# 代碼優化角色指南 (Argument 及 Jules)

## 角色責任
- Argument：提供代碼輔助優化建議。
- Jules (J-U-L-E-S)：負責主要代碼優化、實作及重構。

## 操作步驟
1. **接收任務**：從 PM 任務資源獲取細節。
2. **優化流程**：使用 `gitnexus_impact({target: "symbol"})` 分析前置，然後編輯檔案（e.g., `gitnexus/src/core/`）。
3. **記錄變更**：Commit 訊息如 `[AI:Code] 優化 [檔案] - [描述]`，執行 `gitnexus_rename` 若需重命名。
4. **驗證**：執行 `gitnexus_detect_changes()` 後提交 PR 給 PM。

嚴格遵守 GitNexus 規則，避免無追溯變更。