# Master Design System Prompt

> 完整設計系統提示詞 — 適用於 Stitch / Pencil 建立完整設計系統

---

## 🎯 完整 GitNexus 設計系統提示詞

```
# GitNexus Design System - Complete Specification

建立一個現代化、專業的深色主題設計系統，專為程式碼視覺化與分析平台打造。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎨 核心設計原則

1. **深色優先** (Dark-First)
   - 減少眼睛疲勞，專注於內容
   - 適合長時間使用的開發工具

2. **半透明層疊** (Glassmorphism)
   - 使用半透明背景創造深度感
   - 保持清晰的視覺層次

3. **高對比度** (High Contrast)
   - 確保文字可讀性 (WCAG 2.1 AA+)
   - 清晰的狀態識別

4. **一致性** (Consistency)
   - 統一的圓角、間距、顏色系統
   - 可預測的互動模式

5. **微互動** (Micro-interactions)
   - 柔和的過渡動畫 (200ms)
   - 流暢的互動回饋

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🌈 顏色系統 (Color System)

### 主色調 (Primary Colors)
- **Cyan 400**: #22D3EE — 主要強調色
- **Cyan 500**: #06B6D4 — 主要互動元素
- **Accent**: #667EEA — 次要強調色

### 狀態色 (Status Colors)
- **Success** (Emerald 500): #10B981 — 成功狀態、低風險
- **Warning** (Amber 500): #F59E0B — 警告狀態、中風險
- **Danger** (Rose 500): #F43F5E — 錯誤狀態、高風險

### 背景層級 (Background Hierarchy)
- **Background Deep**: #0A0A14 — 最底層背景
- **Deep**: #0F0F1E — 主要容器背景 (80% opacity)
- **Void**: #000000 — 畫布背景 (純黑)
- **Surface**: #1A1A2E — 卡片、面板背景 (40-60% opacity)

### 文字顏色 (Text Colors)
- **Primary**: #FFFFFF — 主要內容、標題
- **Secondary**: #A0A0B8 — 段落文字、說明
- **Muted**: #6B6B7F — 標籤、輔助文字

### 邊框 (Borders)
- **Border Subtle**: #2A2A3E — 預設邊框
- **狀態邊框**: 各狀態色 + 20-30% opacity

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📏 間距系統 (Spacing System)

Tailwind 標準 Scale:
- **1** = 4px — 最小間距
- **2** = 8px — 標籤間距
- **3** = 12px — 小型元件內距
- **4** = 16px — 標準間距、卡片內距
- **5** = 20px — 中型卡片內距
- **6** = 24px — 大型卡片內距
- **8** = 32px — 區塊間距

**常用組合**:
- 卡片內距：p-6 (24px), p-4 (16px), p-3 (12px)
- 元件間距：gap-6 (24px), gap-4 (16px), gap-2 (8px)
- 邊距：mt-4 (16px), mt-3 (12px), mt-2 (8px)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🔲 圓角系統 (Border Radius)

- **rounded-xl** (12px) — 按鈕、小卡片
- **rounded-2xl** (16px) — 中型卡片、面板
- **rounded-3xl** (24px) — 大型卡片、主容器
- **rounded-full** (9999px) — 徽章、標籤、圓形按鈕

**使用原則**:
- 元件越大，圓角越大
- 嵌套元件圓角遞減 (24px → 16px → 12px)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ✏️ 字體系統 (Typography)

### 字體家族
- **Primary**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Mono**: 'SF Mono', 'Consolas', 'Monaco', monospace

### 字體層級
| 層級 | 大小 | 粗細 | 字距 | Tailwind | 用途 |
|------|------|------|------|----------|------|
| **H1** | 30px | Black (900) | -0.025em | `text-3xl font-black tracking-tight` | 頁面標題 |
| **H2** | 20px | Semibold (600) | normal | `text-xl font-semibold` | 區塊標題 |
| **H3** | 14px | Semibold (600) | 0.18em | `text-sm font-semibold uppercase tracking-[0.18em]` | 子標題 |
| **Body** | 14px | Regular (400) | normal | `text-sm leading-6` | 段落文字 |
| **Caption** | 12px | Semibold (600) | 0.05em | `text-xs font-semibold uppercase tracking-wide` | 標籤 |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🔘 元件規格 (Component Specifications)

### 1. Buttons (按鈕)

**基礎規格**:
- 圓角：rounded-xl (12px)
- 內距：px-4 py-2 (16px / 8px)
- 字體：text-sm font-semibold
- 過渡：transition-all duration-200

**顏色變體**:

A. **Primary (Cyan)**
```
border-cyan-400/30 bg-cyan-500/10 text-cyan-200
Hover: bg-cyan-500/20
Mock Up: "Get Started", "Run Analysis", "Confirm"
```

B. **Warning (Amber)**
```
border-amber-400/30 bg-amber-500/10 text-amber-200
Hover: bg-amber-500/20
Mock Up: "Review Changes", "Proceed with Caution"
```

C. **Danger (Rose)**
```
border-rose-500/30 bg-rose-500/10 text-rose-300
Hover: bg-rose-500/20
Mock Up: "Delete", "Remove", "Force Push"
```

D. **Success (Emerald)**
```
border-emerald-500/30 bg-emerald-500/10 text-emerald-300
Hover: bg-emerald-500/20
Mock Up: "Complete", "Approve", "Safe to Proceed"
```

E. **Ghost (Neutral)**
```
border-border-subtle bg-surface/50 text-text-secondary
Hover: text-white
Mock Up: "Cancel", "Back", "Close"
```

**尺寸變體**:
- Small: px-3 py-1.5, text-xs
- Medium: px-4 py-2, text-sm (預設)
- Large: px-6 py-3, text-base

---

### 2. Cards (卡片)

**層次結構**:

A. **Level 1 - Deep Card (最外層)**
```
rounded-3xl border-border-subtle bg-deep/80 p-6
shadow-2xl shadow-black/20
用途：主要內容區域
Mock Up 標題：「Explorer Canvas」, 「Impact Analysis」
```

B. **Level 2 - Surface Card (中層)**
```
rounded-2xl border-border-subtle bg-surface/40 p-4
用途：嵌套元素、分組內容
Mock Up 標題：「Direct Dependencies」, 「Status Copy」
```

C. **Level 3 - Info Panel (內層)**
```
rounded-xl border-border-subtle bg-surface/50 p-3
用途：列表項目、資訊面板
```

**狀態卡片變體**:

- **Accent Card (Cyan)**: `border-cyan-400/20 bg-cyan-500/10 text-cyan-100`
- **Warning Card (Amber)**: `border-amber-400/20 bg-amber-500/10 text-amber-100`
- **Danger Card (Rose)**: `border-rose-500/30 bg-rose-500/10 text-rose-300`
- **Success Card (Emerald)**: `border-emerald-500/30 bg-emerald-500/10 text-emerald-300`

---

### 3. Badges & Tags (徽章與標籤)

**A. Status Badges (狀態徽章)**
```
rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]
邊框 + 背景雙層效果

顏色變體：
- Active (Cyan): border-cyan-400/20 bg-cyan-500/10 text-cyan-200
- Success (Emerald): border-emerald-500/30 bg-emerald-500/10 text-emerald-300
- Warning (Amber): border-amber-500/30 bg-amber-500/10 text-amber-300
- Error (Rose): border-rose-500/30 bg-rose-500/10 text-rose-300

Mock Up: "ACTIVE", "SUCCESS", "WARNING", "ERROR"
```

**B. Content Tags (內容標籤)**
```
rounded-full px-2.5 py-1 text-xs
border-border-subtle bg-surface/50 text-text-secondary

Mock Up: "React", "TypeScript", "Tailwind CSS"
```

**C. Toggle Tags (可切換標籤)**
```
rounded-full px-3 py-1.5 text-xs font-semibold

Selected: border-accent/30 bg-accent/10 text-accent
Unselected: border-border-subtle bg-surface/50 text-text-muted
Hover: text-white

Mock Up: "Tags", "Risk", "Relations", "Metadata"
```

---

### 4. Panels & Modals (面板與對話框)

**Info Panel**:
```
rounded-2xl border-border-subtle bg-surface/40 p-4
text-sm leading-6 text-text-secondary

Mock Up: 狀態說明文字、提示訊息
```

**Highlight Panel (Cyan)**:
```
rounded-2xl border-cyan-400/20 bg-cyan-500/10 p-4
text-sm leading-6 text-cyan-100

Mock Up: 重要提示、Demo 說明
```

**Modal Dialog**:
```
rounded-3xl border-border-subtle bg-deep/95 p-6
shadow-2xl shadow-black/50 backdrop-blur-sm

標題: text-xl font-semibold text-white
內容: rounded-2xl bg-surface/40 p-4
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ✨ 互動狀態 (Interaction States)

### Hover 懸停
- 背景 opacity 提升 (+10%)
- 文字顏色變亮 (或保持)
- Transform: scale(1.02) (可選)
- 過渡: 200ms ease

### Active / Pressed 按下
- 背景 opacity 提升 (+20%)
- Transform: scale(0.98)
- 過渡: 100ms (快速回饋)

### Focus 焦點
- Ring: 2px solid #667EEA / 50%
- Ring offset: 2px
- Tailwind: `focus:ring-2 focus:ring-accent/50 focus:ring-offset-2`

### Disabled 禁用
- Opacity: 50%
- Cursor: not-allowed
- 移除所有互動效果

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎭 Mock Up 內容建議

### 標題文字
- "GitNexus Web Interactive Demo"
- "Explorer Canvas"
- "Impact Analysis Dashboard"
- "Process Flow Details"

### 按鈕文字
- 主要操作："Get Started", "Run Analysis", "Confirm", "Submit"
- 次要操作："Cancel", "Back", "Learn More", "Close"
- 危險操作："Delete", "Remove", "Force Push"

### 狀態徽章
- "ACTIVE", "DEMO MODE", "LIVE DATA"
- "SUCCESS", "LOW RISK", "SAFE"
- "WARNING", "MEDIUM RISK", "CAUTION"
- "ERROR", "HIGH RISK", "CRITICAL"

### 技術標籤
- "React", "TypeScript", "Tailwind CSS"
- "Graph Visualization", "AI-Powered", "Real-time"
- "Interactive", "Sigma.js", "Graphology"

### 數字範例
- 節點數量: 1,234
- 風險分數: 87%
- 影響範圍: d=1 (42), d=2 (128), d=3 (256)

### 段落文字
- "This standalone page demonstrates the GitNexus Web interaction model even when no user is signed in, no backend is connected, and no repository graph has been imported yet."
- "Hover for preview, click to inspect, and right-click a hovered node to open the context menu."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📦 設計輸出要求

請建立以下完整的設計系統展示：

### 1. Design Tokens 展示頁面
- 顏色系統：所有主色調、狀態色、背景色、文字色
- 字體系統：H1-H3、Body、Caption 的實際效果
- 間距系統：視覺化間距 Scale (4px-32px)
- 圓角系統：四種圓角大小的實際效果

### 2. 元件展示頁面
- Buttons: 6 種顏色變體 × 3 種尺寸
- Cards: 6 種背景變體 + 3 層嵌套範例
- Badges: 4 種狀態徽章 + 內容標籤 + 切換標籤
- Panels: 資訊面板、高亮面板、對話框

### 3. 互動狀態展示
- 每種元件的 Hover、Active、Focus、Disabled 狀態
- 動畫過渡效果演示

### 4. 實際場景範例
- Dashboard 頁面佈局
- Graph Explorer 介面
- Impact Analysis 面板
- Modal Dialog 範例

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 設計目標

1. **專業性** — 適合開發工具的嚴謹設計
2. **一致性** — 統一的視覺語言與互動模式
3. **可讀性** — 高對比度，符合 WCAG 2.1 AA 標準
4. **深度感** — 半透明層疊創造豐富的視覺層次
5. **流暢性** — 柔和的過渡動畫提升使用體驗

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🚀 技術棧

- **框架**: React + TypeScript
- **樣式**: Tailwind CSS v3+
- **圖示**: Lucide React
- **字體**: System Font Stack

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

請根據以上完整規格，建立一個現代化、專業的深色主題設計系統展示，包含所有元件變體與實際使用場景。
```

---

## 📝 使用說明

### 如何使用此提示詞

1. **複製完整提示詞** — 從上方的完整規格區塊複製所有內容
2. **貼上到 Stitch / Pencil** — 在設計工具中建立新專案並貼上
3. **生成設計系統** — 工具會根據規格生成完整的設計系統
4. **調整與精修** — 根據需求微調顏色、間距或元件

### 部分使用

如果只需要特定元件，可以：

1. 從對應的單一元件提示詞檔案複製（如 `button-prompts.md`）
2. 將 Master Prompt 中對應的章節單獨使用
3. 組合多個元件的規格建立自訂系統

### 修改建議

可修改的部分：

- **顏色** — 替換色碼以符合品牌色
- **Mock Up 文字** — 使用實際的專案文字
- **間距與圓角** — 調整數值以符合設計風格
- **字體** — 替換為專案使用的字體家族

不建議修改的部分：

- **設計原則** — 保持深色主題與半透明層疊
- **互動狀態** — 過渡時間與效果已優化
- **無障礙性** — 確保高對比度符合 WCAG 標準

---

## 🎨 進階技巧

### 創建變體

基於此 Master Prompt 創建設計變體：

```
使用 GitNexus Master Design System，但調整以下參數：

【顏色變更】
- Primary Color: 從 Cyan 改為 Purple (#8B5CF6)
- 保持其他顏色系統不變

【圓角變更】
- 全面增加圓角：xl → 2xl, 2xl → 3xl, 3xl → 4xl
- 創造更柔和的視覺風格

【間距變更】
- 整體增加 20% 間距
- 創造更寬鬆的佈局
```

### 品牌定制

將此系統適配到其他品牌：

```
基於 GitNexus Master Design System，調整為 [品牌名稱] 設計系統：

【品牌色彩】
- Primary: [品牌主色]
- Secondary: [品牌次色]
- 保持狀態色 (Success, Warning, Danger) 不變

【字體】
- Primary Font: [品牌字體]
- 保持字體層級與間距系統

【其他調整】
- [列出任何額外的品牌特定需求]
```

---

## ✅ 檢查清單

使用此提示詞前請確認：

- [ ] 已瀏覽完整的設計規格
- [ ] 理解顏色系統與使用場景
- [ ] 確認 Mock Up 文字符合專案需求
- [ ] 準備好調整與精修設計
- [ ] 了解如何在 Stitch / Pencil 中使用

生成設計後請檢查：

- [ ] 所有顏色變體都已正確生成
- [ ] 字體層級清晰且一致
- [ ] 元件間距與圓角符合規格
- [ ] 互動狀態 (Hover, Active) 正常運作
- [ ] 高對比度確保可讀性

---

**版本**: 1.0.0
**更新日期**: 2026-03-15
**專案**: GitNexus Master Design System Prompt
