import React from 'react';
import ReactDOM from 'react-dom/client';
import { ShowcaseApp } from './ShowcaseApp';
import '../index.css';

/**
 * 🎭 GitNexus AI Hub Showcase 模式入口
 *
 * 啟動方式：
 * 1. 開發模式: pnpm dev:showcase
 * 2. 建置模式: pnpm build:showcase
 * 3. 預覽模式: pnpm preview:showcase
 *
 * 用途：
 * - 產品演示（Demo Day）
 * - 設計審查（Design Review）
 * - 使用者測試（User Testing）
 * - 功能驗證（Feature Validation）
 */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ShowcaseApp />
  </React.StrictMode>,
);
