# Card Design Prompts

> 卡片元件設計提示詞 — 適用於 Stitch / Pencil

---

## 📋 目錄

- [基礎卡片提示詞](#基礎卡片提示詞)
- [背景變體提示詞](#背景變體提示詞)
- [層次結構提示詞](#層次結構提示詞)
- [特殊用途卡片](#特殊用途卡片)
- [完整卡片系統提示詞](#完整卡片系統提示詞)

---

## 基礎卡片提示詞

### Deep Card (主要容器)

```
設計一個深色主要卡片元件：

【設計規格】
- 圓角：24px (rounded-3xl)
- 內距：24px (p-6)
- 邊框：1px solid #2A2A3E
- 背景：#0F0F1E / 80% opacity (深色半透明)
- 陰影：0 25px 50px rgba(0, 0, 0, 0.2)
- 文字顏色：標題 #FFFFFF，內容 #A0A0B8

【使用場景】
- 主要內容區域
- 獨立功能模組
- 頁面主要卡片

【Mock Up 內容】
標題：「Explorer Canvas」
子標題：「Interactive Graph Visualization」
內容：「Hover for preview, click to inspect, and right-click a hovered node to open the context menu.」
```

---

### Surface Card (次要容器)

```
設計一個次要卡片元件（嵌套在主卡片中）：

【設計規格】
- 圓角：16px (rounded-2xl)
- 內距：16px (p-4)
- 邊框：1px solid #2A2A3E
- 背景：#1A1A2E / 40% opacity (較淺的半透明)
- 無陰影或輕微陰影
- 文字顏色：#A0A0B8

【使用場景】
- 內嵌於主卡片中
- 資訊分組
- 次要內容區域

【Mock Up 內容】
標題：「Status Copy」
內容：「Demo Mode · Mock graph loaded. This page demonstrates interaction behavior, not repository-specific analysis.」
```

---

## 背景變體提示詞

### Deep Background (深色主容器)

```
設計深色背景主要卡片：

【顏色規格】
- 邊框色：#2A2A3E (border-border-subtle)
- 背景色：#0F0F1E (deep)
- 背景透明度：80% (bg-deep/80)
- 文字：標題 #FFFFFF，內容 #A0A0B8

【視覺特徵】
- 半透明層疊效果 (glassmorphism)
- 與底層背景融合
- 保持清晰可讀性

【使用場景】
- 主要內容卡片
- 功能區塊
- 儀表板面板
```

---

### Surface Background (淺色次容器)

```
設計較淺背景的次要卡片：

【顏色規格】
- 邊框色：#2A2A3E (border-border-subtle)
- 背景色：#1A1A2E (surface)
- 背景透明度：40% (bg-surface/40)
- 文字：#A0A0B8 (text-secondary)

【視覺特徵】
- 比主卡片更淺
- 創造視覺層次
- 適合嵌套使用

【使用場景】
- 內嵌資訊面板
- 列表項目
- 分組內容
```

---

### Accent Card (強調卡片 - Cyan)

```
設計 Cyan 色系強調卡片：

【顏色規格】
- 邊框色：#22D3EE / 20% opacity (border-cyan-400/20)
- 背景色：#06B6D4 / 10% opacity (bg-cyan-500/10)
- 文字：標題 #CFFAFE (text-cyan-100)，內容 #E0F2FE (text-cyan-100)

【視覺特徵】
- 顯眼的 cyan 主題色
- 用於吸引注意力
- 保持半透明質感

【使用場景】
- 重點提示
- Demo 說明
- 互動狀態顯示

【Mock Up 內容】
標題：「Demo note」
內容：「Impact analysis in this page is simulated from curated demo relationships. Risk, provenance, callers, callees, and process steps are illustrative and not tied to a live repository.」
```

---

### Warning Card (警告卡片 - Amber)

```
設計 Amber 色系警告卡片：

【顏色規格】
- 邊框色：#FBBF24 / 20% opacity (border-amber-400/20)
- 背景色：#F59E0B / 10% opacity (bg-amber-500/10)
- 文字：標題 #FDE68A (text-amber-200)，內容 #FEF3C7 (text-amber-100)

【視覺特徵】
- 溫暖的 amber 警告色
- 中等強度的視覺提示
- 不過於侵入性

【使用場景】
- 警告訊息
- 需注意的資訊
- 中等風險提示

【Mock Up 內容】
標題：「Live data mode is ready for future integration」
內容：「Sign-in, backend connectivity, and an imported repository are required before real GitNexus graph data can appear here.」
```

---

### Danger Card (危險卡片 - Rose)

```
設計 Rose 色系危險卡片：

【顏色規格】
- 邊框色：#FB7185 / 30% opacity (border-rose-500/30)
- 背景色：#F43F5E / 10% opacity (bg-rose-500/10)
- 文字：標題 #FECDD3 (text-rose-300)，內容 #FECDD3

【視覺特徵】
- 強烈的 rose 危險色
- 高度警示性
- 清晰的負面訊號

【使用場景】
- 錯誤訊息
- 高風險警告
- 破壞性操作確認

【Mock Up 內容】
標題：「High Risk Detected」
內容：「This change affects 42 direct dependencies and 128 indirect dependencies. Review carefully before proceeding.」
```

---

### Success Card (成功卡片 - Emerald)

```
設計 Emerald 色系成功卡片：

【顏色規格】
- 邊框色：#34D399 / 30% opacity (border-emerald-500/30)
- 背景色：#10B981 / 10% opacity (bg-emerald-500/10)
- 文字：標題 #D1FAE5 (text-emerald-300)，內容 #ECFDF5

【視覺特徵】
- 清新的 emerald 成功色
- 正向的視覺回饋
- 低風險訊號

【使用場景】
- 成功訊息
- 完成狀態
- 安全操作確認

【Mock Up 內容】
標題：「Analysis Complete」
內容：「Impact analysis finished successfully. No high-risk dependencies detected. Safe to proceed with the changes.」
```

---

## 層次結構提示詞

### 三層卡片嵌套系統

```
設計一個三層卡片嵌套系統，創造清晰的視覺層次：

【Level 1 - 最外層容器】
- 圓角：24px (rounded-3xl)
- 內距：24px (p-6)
- 背景：#0F0F1E / 80% (bg-deep/80)
- 邊框：#2A2A3E
- 陰影：0 25px 50px rgba(0, 0, 0, 0.2)

【Level 2 - 中間嵌套卡片】
- 圓角：16px (rounded-2xl)
- 內距：16px (p-4)
- 背景：#1A1A2E / 40% (bg-surface/40)
- 邊框：#2A2A3E

【Level 3 - 內層資訊面板】
- 圓角：12px (rounded-xl)
- 內距：12px (p-3)
- 背景：#1A1A2E / 50% (bg-surface/50)
- 邊框：#2A2A3E (可選)

【設計原則】
- 由外到內，圓角遞減（24px → 16px → 12px）
- 由外到內，內距遞減（24px → 16px → 12px）
- 由外到內，背景漸淺（deep/80 → surface/40 → surface/50）

【使用場景】
- 複雜資訊分組
- 儀表板模組
- 多層次內容展示

【Mock Up 結構】
Level 1 標題：「Impact Analysis Dashboard」
Level 2 標題：「Direct Dependencies」
Level 3 內容：個別依賴項目列表
```

---

## 特殊用途卡片

### Hover Preview Card (懸浮預覽卡片)

```
設計一個懸浮預覽卡片，用於滑鼠懸停時顯示資訊：

【設計規格】
- 圓角：16px (rounded-2xl)
- 內距：16px (p-4)
- 邊框：#22D3EE / 20% (border-cyan-400/20)
- 背景：#0F0F1E / 95% (bg-deep/95)
- 陰影：0 25px 50px rgba(0, 0, 0, 0.4) (較深陰影)
- Backdrop blur: blur(8px) (毛玻璃效果)

【視覺效果】
- 高對比度，確保可讀性
- 毛玻璃背景模糊
- 明顯的邊框突顯

【使用場景】
- Hover 懸停提示
- 快速預覽資訊
- Tooltip 擴展內容

【Mock Up 內容】
標籤：「Hover preview」
標題：「validateUserInput」
類型：「Function」
描述：「Validates user input against schema rules and returns sanitized data. Part of authentication process.」
標籤：「auth」,「validation」,「security」
```

---

### Modal Card (對話框卡片)

```
設計一個模態對話框卡片：

【設計規格】
- 圓角：24px (rounded-3xl)
- 內距：24px (p-6)
- 邊框：#2A2A3E
- 背景：#0F0F1E / 95% (bg-deep/95)
- 陰影：0 25px 50px rgba(0, 0, 0, 0.5) (深陰影)
- 寬度：固定寬度 (如 480px, 640px)

【視覺效果】
- 幾乎不透明 (95%)，確保聚焦
- 強烈陰影，與背景分離
- 明確的視覺焦點

【使用場景】
- 模態對話框
- 詳細資訊展示
- 確認動作

【Mock Up 內容】
標題：「Process Flow Details」
子標題：「Step-by-step execution trace」
內容：流程步驟列表
按鈕：「Close」, 「Export」
```

---

### Info Panel (資訊面板)

```
設計一個簡單的資訊面板：

【設計規格】
- 圓角：16px (rounded-2xl)
- 內距：16px (p-4)
- 邊框：#2A2A3E
- 背景：#1A1A2E / 40% (bg-surface/40)
- 文字：14px, leading-6, #A0A0B8

【視覺特徵】
- 簡潔、扁平
- 適合大量文字
- 保持可讀性

【使用場景】
- 說明文字
- 狀態訊息
- 額外資訊展示

【Mock Up 內容】
標題：「Status copy」
內容：「Demo Mode · Mock graph loaded. This page demonstrates interaction behavior, not repository-specific analysis.」
```

---

## 完整卡片系統提示詞

```
設計一個完整的卡片元件系統，包含多種背景、尺寸與用途變體：

【基礎設計原則】
- 深色主題，半透明層疊
- 一致的圓角與內距系統
- 清晰的視覺層次
- 高對比度文字

【圓角系統】
- 大型卡片：24px (rounded-3xl)
- 中型卡片：16px (rounded-2xl)
- 小型面板：12px (rounded-xl)

【內距系統】
- 大型卡片：24px (p-6)
- 中型卡片：16px (p-4)
- 小型面板：12px (p-3)

【背景變體】
1. Deep Card (主要容器)
   - 背景：#0F0F1E / 80%
   - 邊框：#2A2A3E
   - 圓角：24px
   - 內距：24px
   - 陰影：0 25px 50px rgba(0, 0, 0, 0.2)
   - 用途：主要內容區域

2. Surface Card (次要容器)
   - 背景：#1A1A2E / 40%
   - 邊框：#2A2A3E
   - 圓角：16px
   - 內距：16px
   - 用途：嵌套元素、分組內容

3. Accent Card (強調 - Cyan)
   - 邊框：#22D3EE / 20%
   - 背景：#06B6D4 / 10%
   - 文字：#CFFAFE
   - 用途：重點提示、互動狀態

4. Warning Card (警告 - Amber)
   - 邊框：#FBBF24 / 20%
   - 背景：#F59E0B / 10%
   - 文字：#FDE68A
   - 用途：警告訊息

5. Danger Card (危險 - Rose)
   - 邊框：#FB7185 / 30%
   - 背景：#F43F5E / 10%
   - 文字：#FECDD3
   - 用途：錯誤、高風險

6. Success Card (成功 - Emerald)
   - 邊框：#34D399 / 30%
   - 背景：#10B981 / 10%
   - 文字：#D1FAE5
   - 用途：成功訊息、安全確認

【特殊卡片】
- Hover Preview Card: bg-deep/95, 強陰影, 毛玻璃效果
- Modal Card: bg-deep/95, 深陰影, 固定寬度
- Info Panel: bg-surface/40, 簡潔扁平

【層次嵌套】
- Level 1 (外層): rounded-3xl, p-6, bg-deep/80
- Level 2 (中層): rounded-2xl, p-4, bg-surface/40
- Level 3 (內層): rounded-xl, p-3, bg-surface/50

【Mock Up 內容建議】
- 標題：「Explorer Canvas」, 「Impact Analysis」, 「Process Flow」
- 子標題：「Interactive Graph Visualization」, 「Risk Assessment」
- 內容：模擬的說明文字、狀態訊息、列表項目
- 數量：3-5 個嵌套卡片展示層次結構

【設計目標】
- 創造深度感與層次感
- 保持高可讀性
- 統一的視覺語言
- 靈活的組合能力

【輸出要求】
請生成 6 種背景變體的卡片，並展示一個完整的三層嵌套結構範例。
```

---

## 使用指南

### 選擇正確的卡片類型

| 場景 | 卡片類型 | 提示詞 |
|------|---------|--------|
| 主要內容區域 | Deep Card | 基礎 Deep Card 提示詞 |
| 嵌套資訊 | Surface Card | Surface Card 提示詞 |
| 重點提示 | Accent Card | Accent Card (Cyan) 提示詞 |
| 警告訊息 | Warning Card | Warning Card (Amber) 提示詞 |
| 錯誤提示 | Danger Card | Danger Card (Rose) 提示詞 |
| 成功確認 | Success Card | Success Card (Emerald) 提示詞 |
| 懸停預覽 | Hover Preview | Hover Preview Card 提示詞 |
| 對話框 | Modal Card | Modal Card 提示詞 |

### 組合使用範例

```
建立一個儀表板頁面，包含：
1. 最外層 Deep Card (rounded-3xl, p-6) 作為主容器
2. 內部包含 3 個 Surface Card (rounded-2xl, p-4) 並排顯示
3. 每個 Surface Card 內包含一個 Accent Card 用於突顯關鍵數據

間距：外層 gap-6, 內層 gap-4
```

---

## Tailwind Class 快速參考

```html
<!-- Deep Card (主要容器) -->
<div class="rounded-3xl border border-border-subtle bg-deep/80 p-6 shadow-2xl shadow-black/20">
  <h2 class="text-xl font-semibold text-white">Card Title</h2>
  <p class="mt-3 text-sm leading-6 text-text-secondary">Card content...</p>
</div>

<!-- Surface Card (次要容器) -->
<div class="rounded-2xl border border-border-subtle bg-surface/40 p-4">
  <div class="text-sm text-text-secondary">Surface content...</div>
</div>

<!-- Accent Card (Cyan 強調) -->
<div class="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
  <div class="font-semibold text-cyan-100">Highlight message</div>
  <div class="mt-2 text-sm text-cyan-200">Important information...</div>
</div>

<!-- Modal Card (對話框) -->
<div class="rounded-3xl border border-border-subtle bg-deep/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-sm">
  <h3 class="text-xl font-semibold text-white">Modal Title</h3>
  <div class="mt-4 text-sm text-text-secondary">Modal content...</div>
</div>
```

---

**版本**: 1.0.0
**更新日期**: 2026-03-15
**專案**: GitNexus Card Design Prompts
