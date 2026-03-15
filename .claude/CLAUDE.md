# GitNexus Project
# Claude Code 專案配置

GitNexus 是一個強大的 Git 協作工具，提供 AI 輔助的程式碼審查、重構與 PR 管理功能。

## 專案資訊 | Project Information

- **專案名稱**：GitNexus
- **技術棧**：TypeScript / Node.js / Git Integration
- **主要功能**：AI-powered code review, refactoring, PR management
- **相關整合**：Cursor, Claude Plugin

## Agent 設定引用 | Agent Configuration

此專案可存取完整的 AI Agent 知識庫（位於 Obsidian Git Vault）：

### 全域 Agent 系統
- **路徑**：`~/.agent/` （全域 Agent 架構）
- **文件**：`~/.agent/System Role.md` - 系統角色與三層架構
- **架構**：`~/.agent/ARCHITECTURE.md` - 完整架構文件

### 專業技能庫（645+ skills）
- **路徑**：`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Git/skills/`
- **索引**：`AI-Agents/INDEX.md`
- **快速導航**：
  - Git 操作與最佳實踐
  - 程式碼審查與重構
  - AI Agent 協調與優化
  - 多代理系統模式

### Prompt 模板庫
- **核心 prompts**：`textgenerator/templates/default/`
- **角色扮演**：`textgenerator/templates/awesomePrompts/` (164)
- **工作流程**：`textgenerator/templates/copilot-custom-prompts/` (23)
- **專門優化**：`gemini-scribe/Prompts/`

## GitNexus 專屬 Skills

此專案包含 GitNexus 特定的技能模組（位於 `.claude/skills/`）：

- `gitnexus-exploring` - 程式碼探索與分析
- `gitnexus-debugging` - 除錯與問題診斷
- `gitnexus-refactoring` - 程式碼重構建議
- `gitnexus-pr-review` - Pull Request 審查
- `gitnexus-impact-analysis` - 變更影響分析

## 工作流程 | Workflows

### Git 協作流程
1. 程式碼審查：`/review` 指令
2. PR 管理：自動化 PR 創建與審查
3. 影響分析：評估變更的影響範圍

### Agent 調用策略
- 優先使用 GitNexus 專屬 skills（本地 `.claude/skills/`）
- 需要通用能力時引用全域 agent 系統（`~/.agent/`）
- 需要特定 prompts 時查詢 Git Vault 的模板庫

## 相關專案 | Related Projects

- **gitnexus-cursor-integration** - Cursor IDE 整合
- **gitnexus-claude-plugin** - Claude Desktop 插件

## 開發準則 | Development Guidelines

遵循全域規則：
- `~/.claude/rules/general.md` - 通用行為準則
- `~/.claude/rules/coding-style.md` - 程式碼風格
- `~/.claude/rules/memory-profile.md` - 工作模式偏好

## 技術約束 | Technical Constraints

- **Node.js**：使用 pnpm 作為套件管理器
- **TypeScript**：嚴格模式啟用
- **Git**：Conventional Commits 規範
- **測試**：必須包含單元測試與整合測試
