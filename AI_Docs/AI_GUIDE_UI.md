# UI 設計角色指南 (Gemini、Stitch 及 Jules)

## 角色責任
- 負責 UI 設計、原型製作及介面優化。
- 在分配分支中編輯設計檔案（如 Figma 連結或 CSS/TSX）。

## 操作步驟
1. **接收任務**：從 PM 共享資源讀取 `TASK.md`（使用 `access_mcp_resource`）。
2. **設計實作**：在 `gitnexus-web/src/components/` 建立/修改 UI 檔案，commit 時標記 `[AI:UI] 設計更新`。
3. **回報進度**：更新任務文件狀態，並推送到 GitHub PR。
4. **協作**：若需代碼輔助，通知 Argument 或 Jules 優化。

確保所有設計變更有 Git 記錄。