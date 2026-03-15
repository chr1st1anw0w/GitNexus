# GitNexus Design Tokens

> 設計系統的核心變數定義 — 顏色、字體、間距、圓角、陰影

---

## 📋 目錄

- [顏色系統 (Colors)](#顏色系統-colors)
- [字體系統 (Typography)](#字體系統-typography)
- [間距系統 (Spacing)](#間距系統-spacing)
- [圓角系統 (Border Radius)](#圓角系統-border-radius)
- [陰影系統 (Shadows)](#陰影系統-shadows)
- [動畫系統 (Animations)](#動畫系統-animations)
- [Tailwind Config](#tailwind-config)
- [CSS Variables](#css-variables)

---

## 顏色系統 (Colors)

### 主色調 (Primary Colors)

| Token Name | 色碼 | RGB | Tailwind Class | 用途 |
|------------|------|-----|----------------|------|
| `cyan-400` | `#22D3EE` | `rgb(34, 211, 238)` | `text-cyan-400`, `bg-cyan-400` | 主要強調色、高亮元素 |
| `cyan-500` | `#06B6D4` | `rgb(6, 182, 212)` | `text-cyan-500`, `bg-cyan-500` | 主要互動元素、按鈕 |
| `accent` | `#667EEA` | `rgb(102, 126, 234)` | `text-accent`, `bg-accent` | 次要強調色、焦點狀態 |

**不透明度變體**:
- `cyan-400/20` → `rgba(34, 211, 238, 0.2)` — 邊框
- `cyan-500/10` → `rgba(6, 182, 212, 0.1)` — 背景漸層

---

### 狀態色 (Status Colors)

#### Success (成功 / 低風險)
| Token | 色碼 | Tailwind | 用途 |
|-------|------|----------|------|
| `emerald-300` | `#6EE7B7` | `text-emerald-300` | 文字色 |
| `emerald-500` | `#10B981` | `bg-emerald-500` | 背景色 |
| `emerald-500/30` | `rgba(16, 185, 129, 0.3)` | `border-emerald-500/30` | 邊框 |
| `emerald-500/10` | `rgba(16, 185, 129, 0.1)` | `bg-emerald-500/10` | 半透明背景 |

#### Warning (警告 / 中風險)
| Token | 色碼 | Tailwind | 用途 |
|-------|------|----------|------|
| `amber-300` | `#FCD34D` | `text-amber-300` | 文字色 |
| `amber-500` | `#F59E0B` | `bg-amber-500` | 背景色 |
| `amber-400/20` | `rgba(251, 191, 36, 0.2)` | `border-amber-400/20` | 邊框 |
| `amber-500/10` | `rgba(245, 158, 11, 0.1)` | `bg-amber-500/10` | 半透明背景 |

#### Danger (錯誤 / 高風險)
| Token | 色碼 | Tailwind | 用途 |
|-------|------|----------|------|
| `rose-300` | `#FDA4AF` | `text-rose-300` | 文字色 |
| `rose-500` | `#F43F5E` | `bg-rose-500` | 背景色 |
| `rose-500/30` | `rgba(244, 63, 94, 0.3)` | `border-rose-500/30` | 邊框 |
| `rose-500/10` | `rgba(244, 63, 94, 0.1)` | `bg-rose-500/10` | 半透明背景 |

#### Info (資訊)
| Token | 色碼 | Tailwind | 用途 |
|-------|------|----------|------|
| `cyan-200` | `#CFFAFE` | `text-cyan-200` | 文字色 |
| `cyan-100` | `#E0F2FE` | `text-cyan-100` | 次要文字 |

---

### 背景色 (Background Colors)

| Token Name | 色碼 | RGB | 不透明度 | Tailwind | 用途 |
|------------|------|-----|---------|----------|------|
| `background-deep` | `#0A0A14` | `rgb(10, 10, 20)` | 100% | `bg-background-deep` | 最底層背景 |
| `deep` | `#0F0F1E` | `rgb(15, 15, 30)` | 80% | `bg-deep/80` | 主要容器背景 |
| `void` | `#000000` | `rgb(0, 0, 0)` | 100% | `bg-void` | 畫布背景（純黑） |
| `surface` | `#1A1A2E` | `rgb(26, 26, 46)` | 40-60% | `bg-surface/40`, `bg-surface/60` | 卡片、面板背景 |

**常用不透明度組合**:
- `bg-deep/80` → 主要卡片
- `bg-deep/95` → 模態對話框
- `bg-surface/40` → 次要卡片
- `bg-surface/50` → 按鈕背景
- `bg-surface/60` → Hover 狀態

---

### 文字色 (Text Colors)

| Token Name | 色碼 | RGB | Tailwind | 用途 |
|------------|------|-----|----------|------|
| `text-primary` | `#FFFFFF` | `rgb(255, 255, 255)` | `text-text-primary`, `text-white` | 主要內容標題 |
| `text-secondary` | `#A0A0B8` | `rgb(160, 160, 184)` | `text-text-secondary` | 段落文字、說明 |
| `text-muted` | `#6B6B7F` | `rgb(107, 107, 127)` | `text-text-muted` | 標籤、輔助文字 |

**使用指南**:
- `text-primary` (white) → 標題、重要按鈕文字
- `text-secondary` → 段落、描述文字
- `text-muted` → 小標籤、時間戳、提示文字

---

### 邊框色 (Border Colors)

| Token Name | 色碼 | RGB | Tailwind | 用途 |
|------------|------|-----|----------|------|
| `border-subtle` | `#2A2A3E` | `rgb(42, 42, 62)` | `border-border-subtle` | 預設邊框 |

**狀態邊框**（結合不透明度）:
- `border-cyan-400/20` → 主要元素邊框
- `border-amber-400/20` → 警告元素邊框
- `border-rose-500/30` → 錯誤元素邊框
- `border-emerald-500/30` → 成功元素邊框

---

## 字體系統 (Typography)

### 字體家族 (Font Families)

```css
/* Primary Font */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

/* Monospace Font (程式碼、數據) */
font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
```

### 字體層級 (Typography Scale)

| 層級 | 大小 (px/rem) | 粗細 | 行高 | 字距 | Tailwind Classes | 用途 |
|------|---------------|------|------|------|------------------|------|
| **H1** | 30px / 1.875rem | 900 (Black) | 1.2 | -0.025em | `text-3xl font-black tracking-tight` | 頁面標題 |
| **H2** | 20px / 1.25rem | 600 (Semibold) | 1.3 | normal | `text-xl font-semibold` | 區塊標題 |
| **H3** | 14px / 0.875rem | 600 (Semibold) | 1.4 | 0.18em | `text-sm font-semibold uppercase tracking-[0.18em]` | 子標題、區塊標籤 |
| **Body** | 14px / 0.875rem | 400 (Regular) | 1.5 (24px) | normal | `text-sm leading-6` | 段落文字 |
| **Caption** | 12px / 0.75rem | 600 (Semibold) | 1.4 | 0.05em | `text-xs font-semibold uppercase tracking-wide` | 標籤、小標題 |
| **Label** | 12px / 0.75rem | 400 (Regular) | 1.4 | normal | `text-xs` | 輔助文字、時間戳 |

### 字體粗細 (Font Weights)

| Weight | 數值 | Tailwind | 使用場景 |
|--------|------|----------|---------|
| Regular | 400 | `font-normal` | 段落文字 |
| Medium | 500 | `font-medium` | 次要標題 |
| Semibold | 600 | `font-semibold` | 按鈕、標籤、H2-H3 |
| Black | 900 | `font-black` | H1、強調標題 |

### 字距 (Letter Spacing)

| Tracking | 數值 | Tailwind | 用途 |
|----------|------|----------|------|
| Tight | -0.025em | `tracking-tight` | 大標題 (H1) |
| Normal | 0em | `tracking-normal` | 段落、按鈕 |
| Wide | 0.05em | `tracking-wide` | 小標籤 |
| Wider | 0.18em | `tracking-[0.18em]` | 區塊標題 (H3) |
| Widest | 0.2em | `tracking-[0.2em]` | 徽章文字 |

---

## 間距系統 (Spacing)

### Tailwind Spacing Scale

| Scale | 像素值 | rem 值 | Tailwind Classes | 常用場景 |
|-------|--------|--------|------------------|---------|
| 0.5 | 2px | 0.125rem | `p-0.5`, `m-0.5`, `gap-0.5` | 極小間距 |
| 1 | 4px | 0.25rem | `p-1`, `m-1`, `gap-1` | 最小間距 |
| 2 | 8px | 0.5rem | `p-2`, `m-2`, `gap-2` | 標籤、徽章間距 |
| 3 | 12px | 0.75rem | `p-3`, `m-3`, `gap-3` | 小型元件內距 |
| 4 | 16px | 1rem | `p-4`, `m-4`, `gap-4` | 標準間距、卡片內距 |
| 5 | 20px | 1.25rem | `p-5`, `m-5`, `gap-5` | 中型卡片內距 |
| 6 | 24px | 1.5rem | `p-6`, `m-6`, `gap-6` | 大型卡片內距 |
| 8 | 32px | 2rem | `p-8`, `m-8`, `gap-8` | 區塊間距 |

### 常用間距組合

**卡片內距**:
- 大型卡片: `p-6` (24px)
- 中型卡片: `p-5` (20px)
- 小型卡片: `p-4` (16px)
- 內嵌元素: `p-3` (12px)

**元件間距**:
- 區塊間距: `gap-6` (24px) 或 `gap-8` (32px)
- 元件間距: `gap-4` (16px)
- 標籤間距: `gap-2` (8px) 或 `gap-3` (12px)

**邊距**:
- 標題下方: `mt-4` (16px)
- 區塊下方: `mt-6` (24px)
- 小標籤下方: `mt-2` (8px) 或 `mt-3` (12px)

---

## 圓角系統 (Border Radius)

| Radius Name | 像素值 | Tailwind Class | 使用場景 |
|-------------|--------|----------------|---------|
| **Small** | 8px | `rounded-lg` | 小型按鈕、輸入框 |
| **Medium (XL)** | 12px | `rounded-xl` | 標準按鈕、小卡片 |
| **Large (2XL)** | 16px | `rounded-2xl` | 中型卡片、面板 |
| **Extra Large (3XL)** | 24px | `rounded-3xl` | 大型卡片、主要容器 |
| **Full** | 9999px | `rounded-full` | 徽章、標籤、圓形按鈕 |

### 使用指南

- `rounded-xl` (12px) → 按鈕、小型互動元素
- `rounded-2xl` (16px) → 內嵌卡片、資訊面板
- `rounded-3xl` (24px) → 主要卡片、大型容器
- `rounded-full` → 徽章、狀態標籤、圓形頭像

---

## 陰影系統 (Shadows)

### Tailwind Shadow Scale

| Shadow | 定義 | Tailwind | 用途 |
|--------|------|----------|------|
| **Small** | 0 1px 2px rgba(0,0,0,0.05) | `shadow-sm` | 輕微提升 |
| **Medium** | 0 4px 6px rgba(0,0,0,0.1) | `shadow-md` | 卡片懸浮 |
| **Large** | 0 10px 15px rgba(0,0,0,0.1) | `shadow-lg` | 對話框 |
| **2X Large** | 0 25px 50px rgba(0,0,0,0.25) | `shadow-2xl` | 模態視窗 |

### 自訂陰影

**深色主題陰影** (黑色 + 不透明度):
```css
/* 卡片陰影 */
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
/* Tailwind: shadow-2xl shadow-black/20 */

/* 強調陰影 */
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
/* Tailwind: shadow-2xl shadow-black/40 */
```

### 使用場景

- `shadow-2xl shadow-black/20` → 主要卡片、對話框
- `shadow-2xl shadow-black/40` → 模態視窗、懸浮面板
- `shadow-xl` → Hover 狀態的卡片
- 無陰影 → 內嵌元件、平面設計

---

## 動畫系統 (Animations)

### 過渡時間 (Transition Duration)

| Duration | 毫秒值 | Tailwind | 用途 |
|----------|--------|----------|------|
| Fast | 150ms | `duration-150` | 快速互動（按鈕 hover） |
| Normal | 200ms | `duration-200` | 標準過渡（顏色、透明度） |
| Slow | 300ms | `duration-300` | 淡入淡出（模態視窗） |

### 過渡類型 (Transition Timing)

| Timing | Tailwind | 用途 |
|--------|----------|------|
| Linear | `ease-linear` | 載入動畫 |
| Ease | `ease` | 預設過渡 |
| Ease In | `ease-in` | 淡出效果 |
| Ease Out | `ease-out` | 淡入效果 |
| Ease In Out | `ease-in-out` | 雙向過渡 |

### 常用過渡組合

```css
/* 按鈕 Hover */
transition: all 200ms ease;

/* 顏色過渡 */
transition: colors 200ms ease;

/* 不透明度過渡 */
transition: opacity 300ms ease-in-out;

/* Transform 過渡 */
transition: transform 200ms ease-out;
```

**Tailwind 寫法**:
```html
<button class="transition-all duration-200">Button</button>
<div class="transition-colors duration-200">Card</div>
<div class="transition-opacity duration-300">Modal</div>
```

---

## Tailwind Config

將以下設定加入 `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 主色調
        'accent': '#667eea',

        // 背景色
        'background-deep': '#0a0a14',
        'deep': '#0f0f1e',
        'void': '#000000',
        'surface': '#1a1a2e',

        // 文字色
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0b8',
        'text-muted': '#6b6b7f',

        // 邊框色
        'border-subtle': '#2a2a3e',
      },

      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Consolas',
          'Monaco',
          'Courier New',
          'monospace',
        ],
      },

      letterSpacing: {
        'tighter': '-0.025em',
        'wider': '0.18em',
        'widest': '0.2em',
      },

      boxShadow: {
        'deep': '0 25px 50px rgba(0, 0, 0, 0.2)',
        'deeper': '0 25px 50px rgba(0, 0, 0, 0.4)',
      },
    },
  },
};
```

---

## CSS Variables

可選擇性地使用 CSS Variables（適用於非 Tailwind 專案）:

```css
:root {
  /* Colors - Primary */
  --color-cyan-400: #22d3ee;
  --color-cyan-500: #06b6d4;
  --color-accent: #667eea;

  /* Colors - Status */
  --color-emerald-500: #10b981;
  --color-amber-500: #f59e0b;
  --color-rose-500: #f43f5e;

  /* Colors - Background */
  --color-background-deep: #0a0a14;
  --color-deep: #0f0f1e;
  --color-void: #000000;
  --color-surface: #1a1a2e;

  /* Colors - Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0b8;
  --color-text-muted: #6b6b7f;

  /* Colors - Border */
  --color-border-subtle: #2a2a3e;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;

  /* Border Radius */
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-full: 9999px;

  /* Typography */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-xl: 20px;
  --font-size-3xl: 30px;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-black: 900;

  /* Shadows */
  --shadow-deep: 0 25px 50px rgba(0, 0, 0, 0.2);
  --shadow-deeper: 0 25px 50px rgba(0, 0, 0, 0.4);

  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 200ms;
  --transition-slow: 300ms;
}
```

---

## 使用範例

### 範例 1: 主要按鈕

```html
<button class="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition-all duration-200 hover:bg-cyan-500/20">
  Get Started
</button>
```

### 範例 2: 深色卡片

```html
<div class="rounded-3xl border border-border-subtle bg-deep/80 p-6 shadow-2xl shadow-black/20">
  <h2 class="text-xl font-semibold text-white">Card Title</h2>
  <p class="mt-3 text-sm leading-6 text-text-secondary">
    Card content goes here.
  </p>
</div>
```

### 範例 3: 狀態徽章

```html
<span class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
  Success
</span>
```

---

**版本**: 1.0.0
**更新日期**: 2026-03-15
**專案**: GitNexus Design System
