# Button Design Prompts

> 按鈕元件設計提示詞 — 適用於 Stitch / Pencil

---

## 📋 目錄

- [基礎按鈕提示詞](#基礎按鈕提示詞)
- [顏色變體提示詞](#顏色變體提示詞)
- [尺寸變體提示詞](#尺寸變體提示詞)
- [形狀變體提示詞](#形狀變體提示詞)
- [互動狀態提示詞](#互動狀態提示詞)
- [完整按鈕系統提示詞](#完整按鈕系統提示詞)

---

## 基礎按鈕提示詞

### 標準主要按鈕 (Primary Button)

```
設計一個現代化的主要按鈕元件，具備以下特性：

【設計規格】
- 圓角：12px (rounded-xl)
- 內距：水平 16px，垂直 8px (px-4 py-2)
- 字體：14px, font-semibold
- 邊框：1px solid, Cyan 色系，透明度 30%
- 背景：Cyan 漸層，透明度 10%
- 文字顏色：淡青色 (#CFFAFE)
- 過渡動畫：200ms ease，作用於所有屬性

【顏色規格】
- 邊框色：#22D3EE (rgba(34, 211, 238, 0.3))
- 背景色：#06B6D4 (rgba(6, 182, 212, 0.1))
- 文字色：#CFFAFE
- Hover 狀態：背景 opacity 提升至 20%

【Mock Up 文字】
- "Get Started"
- "Run Impact Analysis"
- "Open Inspector"
- "Learn More"
```

---

## 顏色變體提示詞

### Primary (Cyan) - 主要操作

```
設計 Cyan 色系主要按鈕：

【顏色規格】
- 邊框：#22D3EE / 30% opacity (border-cyan-400/30)
- 背景：#06B6D4 / 10% opacity (bg-cyan-500/10)
- 文字：#CFFAFE (text-cyan-200)
- Hover：背景 opacity 提升至 20%

【使用場景】
- 主要操作按鈕（CTA）
- 確認、提交動作
- 開始、啟動功能

【Mock Up 範例】
- "Get Started" (大型 CTA)
- "Confirm" (確認對話框)
- "Run Analysis" (執行操作)
```

---

### Warning (Amber) - 警告操作

```
設計 Amber 色系警告按鈕：

【顏色規格】
- 邊框：#FBBF24 / 30% opacity (border-amber-400/30)
- 背景：#F59E0B / 10% opacity (bg-amber-500/10)
- 文字：#FDE68A (text-amber-200)
- Hover：背景 opacity 提升至 20%

【使用場景】
- 需要注意的操作
- 中等風險提示
- 警告狀態顯示

【Mock Up 範例】
- "Proceed with Caution" (謹慎操作)
- "Review Changes" (檢查變更)
- "Medium Risk" (中風險標籤)
```

---

### Danger (Rose) - 危險操作

```
設計 Rose 色系危險按鈕：

【顏色規格】
- 邊框：#FB7185 / 30% opacity (border-rose-500/30)
- 背景：#F43F5E / 10% opacity (bg-rose-500/10)
- 文字：#FECDD3 (text-rose-300)
- Hover：背景 opacity 提升至 20%，邊框變亮

【使用場景】
- 刪除、移除操作
- 破壞性動作
- 高風險警告

【Mock Up 範例】
- "Delete" (刪除)
- "Remove Branch" (移除分支)
- "Force Push" (強制推送)
- "Cancel" (取消操作)
```

---

### Success (Emerald) - 成功操作

```
設計 Emerald 色系成功按鈕：

【顏色規格】
- 邊框：#34D399 / 30% opacity (border-emerald-500/30)
- 背景：#10B981 / 10% opacity (bg-emerald-500/10)
- 文字：#D1FAE5 (text-emerald-300)
- Hover：背景 opacity 提升至 20%

【使用場景】
- 成功確認
- 完成操作
- 安全狀態顯示

【Mock Up 範例】
- "Complete" (完成)
- "Approve" (批准)
- "Safe to Proceed" (安全繼續)
```

---

### Ghost / Subtle - 次要操作

```
設計中性色系次要按鈕：

【顏色規格】
- 邊框：#2A2A3E (border-border-subtle)
- 背景：#1A1A2E / 50% opacity (bg-surface/50)
- 文字：#A0A0B8 (text-text-secondary)
- Hover：文字變為 #FFFFFF (text-white)

【使用場景】
- 次要操作
- 取消、返回
- 非關鍵功能

【Mock Up 範例】
- "Cancel" (取消)
- "Back" (返回)
- "Skip" (跳過)
- "Close" (關閉)
```

---

## 尺寸變體提示詞

### Small 小型按鈕

```
設計小型按鈕變體：

【尺寸規格】
- 內距：水平 12px，垂直 6px (px-3 py-1.5)
- 字體：12px, font-semibold, uppercase, tracking-wide
- 圓角：12px (rounded-xl)
- 最小寬度：80px

【使用場景】
- 工具列按鈕
- 表格內操作
- 緊湊空間

【Mock Up 文字】
- "Edit" (編輯)
- "View" (查看)
- "Copy" (複製)
- "Delete" (刪除)
```

---

### Medium 標準按鈕 (預設)

```
設計標準尺寸按鈕：

【尺寸規格】
- 內距：水平 16px，垂直 8px (px-4 py-2)
- 字體：14px, font-semibold
- 圓角：12px (rounded-xl)
- 最小寬度：120px

【使用場景】
- 一般操作按鈕
- 表單提交
- 對話框按鈕

【Mock Up 文字】
- "Get Started" (開始)
- "Submit" (提交)
- "Confirm" (確認)
- "Learn More" (了解更多)
```

---

### Large 大型按鈕

```
設計大型按鈕變體：

【尺寸規格】
- 內距：水平 24px，垂直 12px (px-6 py-3)
- 字體：16px, font-semibold
- 圓角：16px (rounded-2xl)
- 最小寬度：180px

【使用場景】
- 主要 CTA (Call-to-Action)
- Hero section 按鈕
- 重要操作入口

【Mock Up 文字】
- "Get Started Now" (立即開始)
- "Try GitNexus Free" (免費試用)
- "Run Full Analysis" (執行完整分析)
```

---

## 形狀變體提示詞

### Rounded (標準圓角)

```
設計標準圓角按鈕：

【形狀規格】
- 圓角：12px (rounded-xl)
- 適合絕大多數場景
- 保持現代感與專業性

【使用場景】
- 預設按鈕樣式
- 大部分操作按鈕
```

---

### Pill (膠囊形狀)

```
設計膠囊形狀按鈕：

【形狀規格】
- 圓角：9999px (rounded-full)
- 完全圓形的兩端
- 更加柔和、友好的視覺效果

【使用場景】
- 標籤式按鈕
- 狀態切換
- 導航標籤

【Mock Up 文字】
- "Demo Mode" (示範模式)
- "Active" (啟用)
- "Preview On" (預覽開啟)
```

---

## 互動狀態提示詞

### Hover 狀態

```
設計按鈕 Hover 互動效果：

【Hover 規格】
- 背景 opacity 從 10% 提升至 20%
- 文字顏色保持不變或稍微變亮
- Transform: scale(1.02) (可選，輕微放大)
- 過渡時間：200ms ease

【視覺效果】
- 背景變亮，增強可見度
- 保持邊框一致性
- 游標變為 pointer
```

---

### Active / Pressed 狀態

```
設計按鈕按下狀態：

【Active 規格】
- 背景 opacity 提升至 25-30%
- Transform: scale(0.98) (輕微縮小)
- 邊框略微加深
- 過渡時間：100ms (快速反饋)

【視覺效果】
- 明確的按下回饋
- 快速且流暢的過渡
```

---

### Disabled 禁用狀態

```
設計按鈕禁用狀態：

【Disabled 規格】
- Opacity: 50% (整體半透明)
- Cursor: not-allowed
- 移除 Hover 效果
- 可選：顯示禁用提示（tooltip）

【視覺效果】
- 明顯的不可點擊狀態
- 保持設計一致性但降低對比度
```

---

### Focus 焦點狀態

```
設計按鈕鍵盤焦點狀態：

【Focus 規格】
- Ring: 2px solid, Accent 色系 (#667EEA)
- Ring opacity: 50%
- Offset: 2px (ring 與按鈕間距)
- 保持原有按鈕樣式

【Tailwind 寫法】
focus:ring-2 focus:ring-accent/50 focus:ring-offset-2

【無障礙性】
- 確保鍵盤導航清晰可見
- 符合 WCAG 2.1 AA 標準
```

---

## 完整按鈕系統提示詞

```
設計一個完整的按鈕元件系統，包含多種顏色、尺寸與狀態變體：

【設計規格】
圓角：12px (rounded-xl) 或 9999px (rounded-full，膠囊形)
字體：14px, font-semibold (中型), 12px (小型), 16px (大型)
邊框：1px solid, 透明度 30%
背景：半透明漸層, 透明度 10%
過渡：200ms ease-in-out, 作用於所有屬性

【顏色變體】
1. Primary (Cyan)
   - 邊框：#22D3EE / 30%
   - 背景：#06B6D4 / 10%
   - 文字：#CFFAFE
   - 用途：主要操作、CTA

2. Warning (Amber)
   - 邊框：#FBBF24 / 30%
   - 背景：#F59E0B / 10%
   - 文字：#FDE68A
   - 用途：警告操作、中風險

3. Danger (Rose)
   - 邊框：#FB7185 / 30%
   - 背景：#F43F5E / 10%
   - 文字：#FECDD3
   - 用途：刪除、危險操作

4. Success (Emerald)
   - 邊框：#34D399 / 30%
   - 背景：#10B981 / 10%
   - 文字：#D1FAE5
   - 用途：成功確認、安全操作

5. Accent (Purple)
   - 邊框：#667EEA / 30%
   - 背景：#667EEA / 10%
   - 文字：#667EEA
   - 用途：次要強調、焦點

6. Ghost (Neutral)
   - 邊框：#2A2A3E
   - 背景：#1A1A2E / 50%
   - 文字：#A0A0B8
   - Hover：文字變 #FFFFFF
   - 用途：次要操作、取消

【尺寸變體】
- Small: px-3 py-1.5, text-xs, tracking-wide
- Medium: px-4 py-2, text-sm
- Large: px-6 py-3, text-base

【形狀變體】
- Rounded: rounded-xl (12px)
- Pill: rounded-full (9999px)

【互動狀態】
- Default: 基礎樣式
- Hover: 背景 opacity +10%, scale(1.02)
- Active: 背景 opacity +20%, scale(0.98)
- Focus: ring-2 ring-accent/50
- Disabled: opacity-50, cursor-not-allowed

【Mock Up 文字範例】
- 主要操作："Get Started", "Run Analysis", "Confirm", "Submit"
- 次要操作："Cancel", "Back", "Skip", "Learn More"
- 危險操作："Delete", "Remove", "Force Push"
- 狀態標籤："Active", "Success", "Warning", "Error"

【設計目標】
- 現代、專業的深色主題
- 高對比度，確保可讀性
- 清晰的視覺層次
- 流暢的互動回饋
- 符合無障礙標準 (WCAG 2.1 AA)

【輸出要求】
請為每種顏色變體生成 3 個尺寸的按鈕，並展示 Hover 與 Active 狀態。
```

---

## 使用指南

### 複製提示詞到 Stitch / Pencil

1. **選擇所需變體** — 根據設計需求選擇顏色、尺寸或形狀變體
2. **複製對應提示詞** — 複製整個提示詞區塊
3. **修改 Mock Up 文字** — 替換為實際按鈕文字
4. **生成設計** — 在 Stitch 或 Pencil 中貼上提示詞並生成
5. **調整細節** — 根據需求微調顏色、間距或圓角

### 組合使用

可以組合多個提示詞來創建複雜的按鈕組：

```
將以下按鈕並排放置，間距 12px (gap-3)：
1. Primary (Cyan) Large Button - "Get Started"
2. Ghost Medium Button - "Learn More"

背景：深色容器 (#0F0F1E / 80%)
```

---

## Tailwind Class 快速參考

### 基礎按鈕類別組合

```html
<!-- Primary Button (Cyan) -->
<button class="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:bg-cyan-500/20">
  Get Started
</button>

<!-- Warning Button (Amber) -->
<button class="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200 transition-all duration-200 hover:bg-amber-500/20">
  Review Changes
</button>

<!-- Danger Button (Rose) -->
<button class="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-300 transition-all duration-200 hover:bg-rose-500/20">
  Delete
</button>

<!-- Ghost Button (Neutral) -->
<button class="rounded-xl border border-border-subtle bg-surface/50 px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:text-white">
  Cancel
</button>
```

---

**版本**: 1.0.0
**更新日期**: 2026-03-15
**專案**: GitNexus Button Design Prompts
