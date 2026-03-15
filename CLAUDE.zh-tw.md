<!-- gitnexus:start -->
# GitNexus — 程式碼代碼情報 (Code Intelligence)

此專案由 GitNexus 索引為 **GitNexus**（含 1640 個符號、4298 個關係、124 個執行流）。請使用 GitNexus MCP 工具來理解程式碼、評估影響並安全進行導航。

> 若任何 GitNexus 工具警告索引已過時，請先在終端機執行 `npx gitnexus analyze`。

## 務必執行 (Always Do)

- **修改任何符號前必須執行影響分析。** 在修改函式、類別或方法之前，請執行 `gitnexus_impact({target: "symbolName", direction: "upstream"})` 並向使用者回報影響範圍（直接調用者、受影響的程序、風險等級）。
- **提交前必須執行 `gitnexus_detect_changes()`**，以驗證您的變更僅影響預期的符號和執行流。
- **若影響分析回傳「高 (HIGH)」或「關鍵 (CRITICAL)」風險，必須在繼續編輯前警告使用者。**
- 探索不熟悉的程式碼時，請使用 `gitnexus_query({query: "concept"})` 來尋找執行流，而非使用 grep。它會回傳按相關性排序並按程序分組的結果。
- 當您需要特定符號的完整上下文（調用者、被調用者、參與哪些執行流）時，請使用 `gitnexus_context({name: "symbolName"})`。

## 除錯時 (When Debugging)

1. `gitnexus_query({query: "<錯誤或症狀>"})` — 尋找與問題相關的執行流。
2. `gitnexus_context({name: "<可疑函式>"})` — 查看所有調用者、被調用者及程序參與情況。
3. `READ gitnexus://repo/GitNexus/process/{processName}` — 逐步追蹤完整執行流。
4. 針對回歸問題：`gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — 查看您的分支變更了什麼。

## 重構時 (When Refactoring)

- **重新命名**：必須先使用 `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})`。預覽結果 — 繪圖編輯是安全的，文字搜尋編輯則需要手動審查。確認後再執行 `dry_run: false`。
- **提取/拆分**：必須執行 `gitnexus_context({name: "target"})` 以查看所有傳入/傳出引用，然後執行 `gitnexus_impact({target: "target", direction: "upstream"})` 以在移動程式碼前找到所有外部調用者。
- 任何重構後：執行 `gitnexus_detect_changes({scope: "all"})` 以驗證僅變更了預期檔案。

## 絕對不可執行 (Never Do)

- 絕不可在未先對函式、類別或方法執行 `gitnexus_impact` 的情況下進行編輯。
- 絕不可忽略影響分析中的「高 (HIGH)」或「關鍵 (CRITICAL)」風險警告。
- 絕不可使用尋找與取代 (find-and-replace) 來重新命名符號 — 請使用瞭解調用圖的 `gitnexus_rename`。
- 絕不可在未執行 `gitnexus_detect_changes()` 檢查受影響範圍的情況下提交變更。

## 工具快速參考 (Tools Quick Reference)

| 工具 | 使用時機 | 指令 |
|------|-------------|---------|
| `query` | 依概念尋找程式碼 | `gitnexus_query({query: "auth validation"})` |
| `context` | 單一符號的 360 度全景視圖 | `gitnexus_context({name: "validateUser"})` |
| `impact` | 編輯前的影響範圍評估 | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | 提交前的範圍檢查 | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | 安全的多檔案重新命名 | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | 自訂圖形查詢 (Graph Queries) | `gitnexus_cypher({query: "MATCH ..."})` |

## 影響風險等級 (Impact Risk Levels)

| 深度 | 意義 | 行動 |
|-------|---------|--------|
| d=1 | 將導致毀壞 — 直接調用者/導入者 | 必須更新這些項目 |
| d=2 | 可能受影響 — 間接依賴項 | 應進行測試 |
| d=3 | 可能需要測試 — 遞移性依賴 | 若位於關鍵路徑則進行測試 |

## 資源 (Resources)

| 資源 | 用途 |
|----------|---------|
| `gitnexus://repo/GitNexus/context` | 程式碼庫概觀，檢查索引新鮮度 |
| `gitnexus://repo/GitNexus/clusters` | 所有功能區域 |
| `gitnexus://repo/GitNexus/processes` | 所有執行流 |
| `gitnexus://repo/GitNexus/process/{name}` | 逐步執行追蹤 |

## 完成前自我檢查 (Self-Check Before Finishing)

在完成任何程式碼修改任務前，請驗證：
1. 已對所有修改的符號執行 `gitnexus_impact`。
2. 未忽略任何「高 (HIGH)」或「關鍵 (CRITICAL)」風險警告。
3. `gitnexus_detect_changes()` 確認變更符合預期範圍。
4. 已更新所有 d=1（將導致毀壞）的相依項目。

## 保持索引新鮮 (Keeping the Index Fresh)

提交程式碼變更後，GitNexus 索引會過時。請重新執行分析以更新：

```bash
npx gitnexus analyze
```

若索引先前包含嵌入 (embeddings)，請加上 `--embeddings` 以保留：

```bash
npx gitnexus analyze --embeddings
```

若要檢查嵌入是否存在，請查看 `.gitnexus/meta.json` — `stats.embeddings` 欄位會顯示數量（0 代表無嵌入）。**在未加入 `--embeddings` 的情況下執行分析將刪除所有先前生成的嵌入。**

> Claude Code 使用者：PostToolUse 鉤子 (hook) 會在 `git commit` 和 `git merge` 後自動處理此操作。

## 命令行介面 (CLI)

- 重新索引：`npx gitnexus analyze`
- 檢查新鮮度：`npx gitnexus status`
- 生成文件：`npx gitnexus wiki`

<!-- gitnexus:end -->
