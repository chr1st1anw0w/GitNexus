# Typography Design Prompts

> 字體系統設計提示詞 — 適用於 Stitch / Pencil

---

## 📋 完整字體系統提示詞

```
設計一個清晰、層次分明的字體系統，適用於深色主題的程式碼分析平台：

【字體家族】
Primary (內文與 UI):
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif

Monospace (程式碼與數據):
'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace

【字體層級定義】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

H1 - Page Title (頁面標題)
- 大小: 30px (text-3xl)
- 粗細: 900 (font-black)
- 字距: -0.025em (tracking-tight)
- 行高: 1.2
- 顏色: #FFFFFF (text-white)

Mock Up 範例:
"GitNexus Web Interactive Demo"
"Graph interaction showcase for onboarding"
"Impact Analysis Dashboard"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

H2 - Section Title (區塊標題)
- 大小: 20px (text-xl)
- 粗細: 600 (font-semibold)
- 字距: normal
- 行高: 1.3
- 顏色: #FFFFFF (text-white)

Mock Up 範例:
"Design Tokens"
"Components & Variants"
"Explorer Canvas"
"Inspector Sidebar"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

H3 - Subsection Title (子標題 / 區塊標籤)
- 大小: 14px (text-sm)
- 粗細: 600 (font-semibold)
- 轉換: uppercase (全大寫)
- 字距: 0.18em (tracking-[0.18em])
- 行高: 1.4
- 顏色: #6B6B7F (text-text-muted)

Mock Up 範例:
"DISPLAY CONTROLS"
"DEMO SCOPE"
"INTERACTION LOG"
"RISK & PROVENANCE"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Body - Regular Text (段落文字)
- 大小: 14px (text-sm)
- 粗細: 400 (font-normal)
- 字距: normal
- 行高: 1.5 (leading-6 / 24px)
- 顏色: #A0A0B8 (text-text-secondary)

Mock Up 範例:
"This standalone page demonstrates the GitNexus Web interaction model even when no user is signed in, no backend is connected, and no repository graph has been imported yet."

"Hover for preview, click to inspect, and right-click a hovered node to open the context menu."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Caption - Small Label (標籤 / 小標題)
- 大小: 12px (text-xs)
- 粗細: 600 (font-semibold)
- 轉換: uppercase (全大寫)
- 字距: 0.05em (tracking-wide)
- 行高: 1.4
- 顏色: #6B6B7F (text-text-muted)

Mock Up 範例:
"DEMO MODE"
"HOVER PREVIEW"
"INSPECTOR SIDEBAR"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Label / Helper Text (輔助文字)
- 大小: 12px (text-xs)
- 粗細: 400 (font-normal)
- 字距: normal
- 行高: 1.4
- 顏色: #A0A0B8 (text-text-secondary)

Mock Up 範例:
"Step 1 · User authentication flow"
"Last updated: 2 hours ago"
"42 direct callers"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【顏色對照】
- Primary Text (#FFFFFF): 主要標題、重要內容
- Secondary Text (#A0A0B8): 段落文字、說明文字
- Muted Text (#6B6B7F): 標籤、提示文字、次要資訊
- Accent Text (#667EEA): 連結、強調文字

【數字與資料顯示】
Large Number (大數字)
- 大小: 24px (text-2xl)
- 粗細: 900 (font-black)
- 顏色: #FFFFFF
- Mock Up: "1,234", "87%", "42"

Medium Number (中數字)
- 大小: 16px (text-base)
- 粗細: 600 (font-semibold)
- 顏色: #FFFFFF
- Mock Up: "128", "256", "d=2"

Small Number (小數字 / 計數器)
- 大小: 14px (text-sm)
- 粗細: 500 (font-medium)
- 顏色: #A0A0B8
- Mock Up: "(42)", "3 items", "Step 1"

【設計原則】
1. 保持清晰的層次感 (H1 > H2 > H3 > Body)
2. 使用字距 (letter-spacing) 增強大寫文字可讀性
3. 確保高對比度 (WCAG 2.1 AA+)
4. 段落文字使用舒適的行高 (1.5)
5. 標題文字使用緊湊的行高 (1.2-1.3)

【輸出要求】
請生成包含所有字體層級的視覺化展示，並提供實際的 Mock Up 文字範例。
```

---

## 🎨 特殊字體用途提示詞

### 程式碼顯示 (Code / Monospace)

```
設計程式碼與數據展示的字體樣式：

【字體家族】
'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace

【規格】
- 大小: 13px (text-[13px])
- 粗細: 400 (font-normal)
- 行高: 1.6 (leading-relaxed)
- 顏色: #A0A0B8 (text-text-secondary)
- 背景: #1A1A2E / 50% (bg-surface/50)
- 內距: px-2 py-1
- 圓角: rounded

【使用場景】
- 程式碼片段
- API 回應
- 檔案路徑
- 技術規格

Mock Up 範例:
- `getUserById(userId: string): Promise<User>`
- `/src/components/GraphCanvas.tsx`
- `border-cyan-400/30 bg-cyan-500/10`
```

---

### 強調文字 (Emphasis)

```
設計強調與高亮文字：

【Bold Emphasis (粗體強調)】
- 粗細: 600 (font-semibold)
- 顏色: #FFFFFF (text-white)
- 使用場景: 重要詞彙、關鍵概念

【Accent Emphasis (色彩強調)】
- 粗細: 600 (font-semibold)
- 顏色: #667EEA (text-accent) 或狀態色
- 使用場景: 連結、互動元素、狀態指示

【Italic Emphasis (斜體強調)】
- 字體樣式: italic
- 顏色: #A0A0B8 (text-text-secondary)
- 使用場景: 註釋、引用、次要說明

Mock Up 範例:
"This is **important** information with an *optional* note and a [link](#) to more details."
```

---

### 列表文字 (List Text)

```
設計列表與項目符號文字：

【Bullet List (項目符號列表)】
- 字體: text-sm leading-6
- 顏色: #A0A0B8 (text-text-secondary)
- 項目符號: • (圓點)
- 間距: gap-3 (12px)

【Numbered List (編號列表)】
- 字體: text-sm leading-6
- 顏色: #A0A0B8 (text-text-secondary)
- 編號: #6B6B7F (text-text-muted)
- 間距: gap-3 (12px)

【Checklist (檢查清單)】
- 字體: text-sm leading-6
- 已勾選: text-text-muted line-through
- 未勾選: text-text-secondary
- 間距: gap-2 (8px)

Mock Up 範例:
• Hover nodes to preview curated metadata
• Click nodes to open the inspector sidebar
• Right-click hovered nodes to run mock impact analysis

1. Open the inspector for the selected node
2. Review the impact analysis results
3. Confirm changes before proceeding
```

---

## 📏 字體層級視覺化

```
建立字體層級視覺化展示：

【展示內容】
每個字體層級包含：
1. 層級名稱 (如 "H1 - Page Title")
2. 規格標註 (大小、粗細、字距)
3. 實際文字範例 (使用 Mock Up 文字)
4. Tailwind CSS 類別名稱

【排列方式】
從大到小垂直排列：
H1 → H2 → H3 → Body → Caption → Label

【視覺化重點】
- 清晰的尺寸對比
- 顏色差異 (Primary, Secondary, Muted)
- 字距效果展示 (尤其是大寫文字)
```

---

## Tailwind Class 快速參考

```html
<!-- H1 - Page Title -->
<h1 class="text-3xl font-black tracking-tight text-white">
  GitNexus Web Interactive Demo
</h1>

<!-- H2 - Section Title -->
<h2 class="text-xl font-semibold text-white">
  Design Tokens
</h2>

<!-- H3 - Subsection Title -->
<h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">
  Display Controls
</h3>

<!-- Body - Regular Text -->
<p class="text-sm leading-6 text-text-secondary">
  This standalone page demonstrates the GitNexus Web interaction model.
</p>

<!-- Caption - Small Label -->
<div class="text-xs font-semibold uppercase tracking-wide text-text-muted">
  Demo Mode
</div>

<!-- Label / Helper Text -->
<div class="text-xs text-text-secondary">
  Last updated: 2 hours ago
</div>

<!-- Code / Monospace -->
<code class="rounded bg-surface/50 px-2 py-1 font-mono text-[13px] text-text-secondary">
  getUserById(userId)
</code>

<!-- Large Number -->
<div class="text-2xl font-black text-white">
  1,234
</div>

<!-- Medium Number -->
<div class="text-base font-semibold text-white">
  87%
</div>
```

---

**版本**: 1.0.0
**更新日期**: 2026-03-15
**專案**: GitNexus Typography Design Prompts
