# Badge & Tag Design Prompts

> 徽章與標籤元件設計提示詞 — 適用於 Stitch / Pencil

---

## 📋 目錄

- [Status Badges (狀態徽章)](#status-badges-狀態徽章)
- [Content Tags (內容標籤)](#content-tags-內容標籤)
- [Toggle Tags (可切換標籤)](#toggle-tags-可切換標籤)
- [完整徽章系統提示詞](#完整徽章系統提示詞)

---

## Status Badges (狀態徽章)

### 基礎狀態徽章設計

```
設計一個狀態徽章元件系統：

【設計規格】
- 形狀：完全圓形 (rounded-full / 9999px)
- 內距：水平 12px，垂直 4px (px-3 py-1)
- 字體：12px, font-semibold, uppercase, letter-spacing: 0.2em
- 邊框：1px solid, 透明度 20-30%
- 背景：半透明漸層, 透明度 10%
- 圖示：可選，左側對齊，16px (h-3.5 w-3.5)

【視覺特徵】
- 膠囊形狀，兩端完全圓形
- 全大寫字母，增加字距
- 邊框 + 背景雙層視覺效果
- 清晰的狀態識別

【使用場景】
- 狀態指示器
- 模式標籤 (Demo Mode, Live Mode)
- 系統訊息標籤
```

---

### Active / Primary Badge (Cyan)

```
設計 Cyan 色系主要狀態徽章：

【顏色規格】
- 邊框色：#22D3EE / 20% (border-cyan-400/20)
- 背景色：#06B6D4 / 10% (bg-cyan-500/10)
- 文字色：#CFFAFE (text-cyan-200)

【Mock Up 文字】
- "ACTIVE"
- "DEMO MODE"
- "PREVIEW ON"
- "ENABLED"
```

---

### Success / Low Risk Badge (Emerald)

```
設計 Emerald 色系成功徽章：

【顏色規格】
- 邊框色：#34D399 / 30% (border-emerald-500/30)
- 背景色：#10B981 / 10% (bg-emerald-500/10)
- 文字色：#D1FAE5 (text-emerald-300)

【Mock Up 文字】
- "SUCCESS"
- "LOW RISK"
- "SAFE"
- "COMPLETED"
```

---

### Warning / Medium Risk Badge (Amber)

```
設計 Amber 色系警告徽章：

【顏色規格】
- 邊框色：#FBBF24 / 30% (border-amber-500/30)
- 背景色：#F59E0B / 10% (bg-amber-500/10)
- 文字色：#FDE68A (text-amber-300)

【Mock Up 文字】
- "WARNING"
- "MEDIUM RISK"
- "CAUTION"
- "PENDING"
```

---

### Error / High Risk Badge (Rose)

```
設計 Rose 色系錯誤徽章：

【顏色規格】
- 邊框色：#FB7185 / 30% (border-rose-500/30)
- 背景色：#F43F5E / 10% (bg-rose-500/10)
- 文字色：#FECDD3 (text-rose-300)

【Mock Up 文字】
- "ERROR"
- "HIGH RISK"
- "CRITICAL"
- "FAILED"
```

---

## Content Tags (內容標籤)

### 基礎內容標籤設計

```
設計一個內容標籤元件（用於分類、過濾）：

【設計規格】
- 形狀：完全圓形 (rounded-full)
- 內距：水平 10px，垂直 4px (px-2.5 py-1)
- 字體：12px, 正常粗細
- 邊框：1px solid #2A2A3E
- 背景：#1A1A2E / 50% (bg-surface/50)
- 文字色：#A0A0B8 (text-text-secondary)

【視覺特徵】
- 中性、低對比度
- 適合大量標籤並列
- 不搶奪主要內容焦點

【使用場景】
- 技術標籤 (React, TypeScript)
- 分類標籤
- 關鍵字標籤

【Mock Up 文字】
- "React"
- "TypeScript"
- "Tailwind CSS"
- "Graph Visualization"
- "AI-Powered"
- "Real-time"
- "Interactive"
```

---

## Toggle Tags (可切換標籤)

### 可切換狀態標籤設計

```
設計一個可切換的標籤按鈕元件（用於過濾器、顯示控制）：

【設計規格】
- 形狀：完全圓形 (rounded-full)
- 內距：水平 12px，垂直 6px (px-3 py-1.5)
- 字體：12px, font-semibold
- 過渡動畫：200ms ease

【Selected 狀態 (啟用)】
- 邊框色：#667EEA / 30% (border-accent/30)
- 背景色：#667EEA / 10% (bg-accent/10)
- 文字色：#667EEA (text-accent)

【Unselected 狀態 (未啟用)】
- 邊框色：#2A2A3E (border-border-subtle)
- 背景色：#1A1A2E / 50% (bg-surface/50)
- 文字色：#6B6B7F (text-text-muted)

【互動效果】
- Hover: 文字顏色變亮 (text-white)
- Cursor: pointer
- Transition: all 200ms

【使用場景】
- 過濾器控制
- 顯示選項切換
- 類別選擇

【Mock Up 文字】
- "Tags" (標籤)
- "Risk" (風險)
- "Relations" (關係)
- "Metadata" (元數據)
- "Preview On" / "Preview Off"
```

---

## 完整徽章系統提示詞

```
設計一個完整的徽章與標籤元件系統：

【系統概覽】
包含三種主要類型：
1. Status Badges (狀態徽章) — 顯示系統狀態、風險等級
2. Content Tags (內容標籤) — 分類、技術棧、關鍵字
3. Toggle Tags (可切換標籤) — 互動式過濾器、顯示控制

【共通設計規格】
- 形狀：rounded-full (完全圓形)
- 字體家族：-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- 過渡動畫：200ms ease (toggle tags)

【1. Status Badges (狀態徽章)】
規格：
- 內距：px-3 py-1
- 字體：12px, font-semibold, uppercase, tracking-[0.2em]
- 邊框 + 背景雙層效果

顏色變體：
A. Active / Primary (Cyan)
   - 邊框：#22D3EE/20, 背景：#06B6D4/10, 文字：#CFFAFE
   - Mock Up：「ACTIVE」,「DEMO MODE」

B. Success / Low Risk (Emerald)
   - 邊框：#34D399/30, 背景：#10B981/10, 文字：#D1FAE5
   - Mock Up：「SUCCESS」,「LOW RISK」

C. Warning / Medium Risk (Amber)
   - 邊框：#FBBF24/30, 背景：#F59E0B/10, 文字：#FDE68A
   - Mock Up：「WARNING」,「MEDIUM RISK」

D. Error / High Risk (Rose)
   - 邊框：#FB7185/30, 背景：#F43F5E/10, 文字：#FECDD3
   - Mock Up：「ERROR」,「HIGH RISK」

【2. Content Tags (內容標籤)】
規格：
- 內距：px-2.5 py-1
- 字體：12px, normal weight
- 邊框：#2A2A3E, 背景：#1A1A2E/50, 文字：#A0A0B8

用途：技術標籤、分類標籤
Mock Up：「React」,「TypeScript」,「Tailwind CSS」,「Graph Visualization」

【3. Toggle Tags (可切換標籤)】
規格：
- 內距：px-3 py-1.5
- 字體：12px, font-semibold
- 過渡：all 200ms

狀態：
- Selected：邊框 #667EEA/30, 背景 #667EEA/10, 文字 #667EEA
- Unselected：邊框 #2A2A3E, 背景 #1A1A2E/50, 文字 #6B6B7F
- Hover (unselected)：文字 #FFFFFF

用途：過濾器、顯示控制
Mock Up：「Tags」,「Risk」,「Relations」,「Metadata」

【圖示整合 (可選)】
- 位置：文字左側
- 大小：14px (h-3.5 w-3.5)
- 間距：gap-2 (8px)
- 顏色：與文字同色

【設計目標】
- 清晰的狀態識別
- 一致的視覺語言
- 高可讀性
- 適合大量並列

【輸出要求】
請為每種類型生成完整的變體集合，並展示它們在實際場景中的使用（如狀態指示器、技術棧標籤、過濾器）。
```

---

## 使用場景範例

### 場景 1: 風險等級顯示

```
並排顯示三個風險等級徽章：
1. "LOW RISK" (Emerald)
2. "MEDIUM RISK" (Amber)
3. "HIGH RISK" (Rose)

間距：gap-2 (8px)
背景：深色容器
```

---

### 場景 2: 技術棧標籤

```
顯示專案使用的技術標籤：
- "React"
- "TypeScript"
- "Tailwind CSS"
- "Sigma.js"
- "Graphology"

排列：flex-wrap gap-2
樣式：Content Tags (中性、低對比)
```

---

### 場景 3: 過濾器控制

```
可切換的顯示選項：
- "Tags" (selected)
- "Risk" (unselected)
- "Relations" (selected)
- "Metadata" (unselected)

排列：flex gap-2
互動：點擊切換 selected/unselected 狀態
```

---

## Tailwind Class 快速參考

```html
<!-- Status Badge (Cyan / Active) -->
<span class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
  ACTIVE
</span>

<!-- Status Badge (Emerald / Success) -->
<span class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
  SUCCESS
</span>

<!-- Content Tag (Neutral) -->
<span class="rounded-full border border-border-subtle bg-surface/50 px-2.5 py-1 text-xs text-text-secondary">
  React
</span>

<!-- Toggle Tag (Selected) -->
<button class="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors">
  Tags
</button>

<!-- Toggle Tag (Unselected) -->
<button class="rounded-full border border-border-subtle bg-surface/50 px-3 py-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-white">
  Risk
</button>
```

---

**版本**: 1.0.0
**更新日期**: 2026-03-15
**專案**: GitNexus Badge & Tag Design Prompts
