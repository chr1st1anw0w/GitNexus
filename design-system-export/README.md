# GitNexus Design System Export

> 完整的設計系統 Tokens、元件規格與提示詞庫 — 用於 Stitch / Pencil 設計工作流程

---

## 📦 套件內容

```
design-system-export/
├── README.md                          # 本文件
├── design-tokens.md                   # 設計 Tokens 定義
├── prompts/                           # 設計提示詞庫
│   ├── button-prompts.md              # 按鈕元件提示詞
│   ├── card-prompts.md                # 卡片元件提示詞
│   ├── badge-prompts.md               # 徽章標籤提示詞
│   ├── typography-prompts.md          # 字體系統提示詞
│   └── master-prompt.md               # 完整設計系統提示詞
├── components/                        # 元件規格文件
│   ├── buttons.md                     # 按鈕元件規格
│   ├── cards.md                       # 卡片元件規格
│   ├── badges.md                      # 徽章元件規格
│   └── panels.md                      # 面板元件規格
└── index.html                         # 視覺化展示板（即將建立）
```

---

## 🎨 設計系統概覽

GitNexus 採用現代化深色主題設計，專為程式碼視覺化與分析平台打造。

### 核心設計原則

1. **深色優先** — 減少眼睛疲勞，專注於內容
2. **半透明層疊** — Glassmorphism 效果創造深度感
3. **高對比度** — 確保可讀性與無障礙性
4. **一致性** — 統一的圓角、間距、顏色系統
5. **微互動** — 柔和的過渡動畫提升使用體驗

### 技術棧

- **框架**: React + TypeScript
- **樣式**: Tailwind CSS v3+
- **圖示**: Lucide React
- **圖表**: Sigma.js + Graphology

---

## 🔧 如何使用

### 1. 查看設計 Tokens

```bash
# 查看完整的顏色、字體、間距定義
cat design-tokens.md
```

### 2. 複製提示詞到 Stitch / Pencil

所有提示詞都位於 `prompts/` 目錄：

- **單一元件設計** → 使用個別提示詞檔案（如 `button-prompts.md`）
- **完整設計系統** → 使用 `master-prompt.md`

**使用流程**：
1. 開啟對應的提示詞檔案
2. 複製所需的提示詞內容
3. 貼上到 Stitch 或 Pencil 的提示輸入框
4. 調整 Mock Up 文字或數字（已在提示詞中提供範例）
5. 生成設計並根據需求調整配色或排版

### 3. 參考元件規格

`components/` 目錄包含每個元件的詳細規格：

- 設計規格（尺寸、顏色、圓角等）
- 變體說明（primary, warning, danger 等）
- 程式碼範例（Tailwind CSS classes）
- 使用場景建議

### 4. 視覺化展示板

開啟 `index.html` 可查看：
- 所有 Tokens 的視覺化呈現
- 元件與變體的實際效果
- 可複製的提示詞卡片
- 互動式的設計指南

---

## 📐 Design Tokens 快速參考

### 顏色系統

| 類別 | Token | 色碼 | 用途 |
|------|-------|------|------|
| Primary | Cyan 400 | `#22D3EE` | 主要強調色 |
| Primary | Cyan 500 | `#06B6D4` | 主要互動元素 |
| Accent | Accent | `#667EEA` | 次要強調 |
| Success | Emerald 500 | `#10B981` | 成功狀態、低風險 |
| Warning | Amber 500 | `#F59E0B` | 警告狀態、中風險 |
| Danger | Rose 500 | `#F43F5E` | 錯誤狀態、高風險 |
| BG | Deep | `#0F0F1E` | 主要容器背景 |
| BG | Surface | `#1A1A2E` | 卡片、面板背景 |
| Text | Primary | `#FFFFFF` | 主要文字 |
| Text | Secondary | `#A0A0B8` | 次要文字 |
| Text | Muted | `#6B6B7F` | 標籤、提示文字 |
| Border | Subtle | `#2A2A3E` | 預設邊框 |

### 間距系統

| Scale | 像素值 | Tailwind Class | 用途 |
|-------|--------|----------------|------|
| 1 | 4px | `p-1`, `m-1`, `gap-1` | 最小間距 |
| 2 | 8px | `p-2`, `m-2`, `gap-2` | 標籤間距 |
| 3 | 12px | `p-3`, `m-3`, `gap-3` | 元件內距 |
| 4 | 16px | `p-4`, `m-4`, `gap-4` | 標準間距 |
| 6 | 24px | `p-6`, `m-6`, `gap-6` | 大型卡片內距 |
| 8 | 32px | `p-8`, `m-8`, `gap-8` | 區塊間距 |

### 圓角系統

| Radius | 像素值 | Tailwind Class | 用途 |
|--------|--------|----------------|------|
| XL | 12px | `rounded-xl` | 按鈕 |
| 2XL | 16px | `rounded-2xl` | 卡片元件 |
| 3XL | 24px | `rounded-3xl` | 大型卡片 |
| Full | 9999px | `rounded-full` | 徽章、標籤 |

### 字體系統

| 層級 | 規格 | Tailwind Class | 用途 |
|------|------|----------------|------|
| H1 | 30px, Black, -0.025em | `text-3xl font-black tracking-tight` | 頁面標題 |
| H2 | 20px, Semibold | `text-xl font-semibold` | 區塊標題 |
| H3 | 14px, Semibold, Uppercase, 0.18em | `text-sm font-semibold uppercase tracking-[0.18em]` | 子標題 |
| Body | 14px, leading-6 | `text-sm leading-6` | 段落文字 |
| Caption | 12px, Semibold, Uppercase | `text-xs font-semibold uppercase tracking-wide` | 標籤 |

---

## 🎯 使用場景範例

### 場景 1: 設計新的按鈕元件

1. 開啟 `prompts/button-prompts.md`
2. 複製「Primary Button」提示詞
3. 貼上到 Stitch / Pencil
4. 修改 Mock Up 文字為 "Run Impact Analysis"
5. 生成設計並調整細節

### 場景 2: 建立一致的卡片系統

1. 開啟 `prompts/card-prompts.md`
2. 複製完整的卡片提示詞
3. 在 Stitch 中生成 3 種變體：Deep, Surface, Accent
4. 參考 `components/cards.md` 確認規格一致性

### 場景 3: 設計完整的 Dashboard

1. 開啟 `prompts/master-prompt.md`
2. 複製完整設計系統提示詞
3. 在 Pencil 中建立新專案
4. 使用提示詞生成基礎排版
5. 根據 `design-tokens.md` 調整配色

---

## 📝 提示詞使用技巧

### 基本結構

所有提示詞都遵循以下結構：

```
【設計規格】
- 尺寸、圓角、間距等具體數值

【顏色變體】
- 不同狀態的顏色組合

【Mock Up 範例】
- 實際文字或數字範例

【使用場景】
- 何時使用此元件
```

### 最佳實踐

1. **保留完整提示詞** — 不要刪減規格部分，確保設計一致性
2. **修改 Mock Up 部分** — 根據實際需求替換文字和數字
3. **調整顏色變體** — 可以增減變體數量，但保持色碼規範
4. **測試多種排版** — 使用相同提示詞嘗試不同佈局

### 進階技巧

- **組合提示詞** — 將按鈕 + 卡片提示詞合併，設計複雜元件
- **參數化調整** — 修改圓角值、間距值來創造變體
- **加入互動狀態** — 在提示詞中描述 hover、active、disabled 狀態

---

## 🔗 相關資源

- [Tailwind CSS 文件](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Stitch 官方文件](https://stitch.design)
- [Pencil 官方文件](https://pencil.dev)

---

## 📊 統計資訊

- **Tokens 總數**: 50+ (顏色、間距、圓角、字體)
- **元件類型**: 4 大類（Buttons, Cards, Badges, Panels）
- **顏色變體**: 6 種（Primary, Success, Warning, Danger, Ghost, Accent）
- **提示詞檔案**: 5 個（4 個單一元件 + 1 個完整系統）

---

## 💡 下一步

1. ✅ 查看 `design-tokens.md` 了解完整的 Token 定義
2. ✅ 瀏覽 `prompts/` 目錄選擇需要的提示詞
3. ✅ 開啟 `index.html` 視覺化預覽所有元件
4. ✅ 開始在 Stitch / Pencil 中建立你的設計

---

**版本**: 1.0.0
**更新日期**: 2026-03-15
**專案**: GitNexus Design System Export
