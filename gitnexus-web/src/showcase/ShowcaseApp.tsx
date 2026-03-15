import React, { useState } from 'react';
import { TaskBoard } from '../components/TaskBoard';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { ActivityImpactView } from '../components/ActivityImpactView';
import { DashboardView } from '../components/DashboardView';
import { Play, Eye, Code, Sparkles } from 'lucide-react';

type ShowcaseView = 'intro' | 'dashboard' | 'taskboard' | 'taskdetail' | 'impact' | 'activity';

/**
 * 🎭 GitNexus AI Hub 互動展示模式
 *
 * 功能：
 * - 展示所有元件的設計與互動行為
 * - 使用 mock 數據但提供真實的互動體驗
 * - 無需登入或後端連線即可完整體驗
 * - 適合產品演示、設計審查、使用者測試
 */
export const ShowcaseApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ShowcaseView>('intro');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  const views = [
    {
      id: 'dashboard' as ShowcaseView,
      name: 'Dashboard 儀表板',
      desc: '總覽統計、AI Agent 狀態、快速操作',
      color: '#10b981',
      component: DashboardView,
    },
    {
      id: 'taskboard' as ShowcaseView,
      name: 'Task Board 任務看板',
      desc: '拖拽式看板、篩選、任務卡片',
      color: '#7c3aed',
      component: TaskBoard,
    },
    {
      id: 'taskdetail' as ShowcaseView,
      name: 'Task Detail 任務詳情',
      desc: '雙面板視圖、動作按鈕、MCP 日誌',
      color: '#ec4899',
      component: TaskDetailModal,
    },
    {
      id: 'impact' as ShowcaseView,
      name: 'Impact Analysis 影響分析',
      desc: '節點圖、風險評估、依賴追蹤',
      color: '#f59e0b',
      component: ActivityImpactView,
    },
  ];

  const IntroScreen = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-purple-400">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            GitNexus AI Hub
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            體驗全新的 AI 協作工作流程 — 任務看板、影響分析、智能代理，一個平台完成所有開發任務
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className="group relative p-8 rounded-3xl bg-deep border border-border-subtle hover:border-border-muted transition-all duration-300 text-left overflow-hidden"
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                style={{ background: `radial-gradient(circle at center, ${view.color}20, transparent)` }}
              />

              {/* Content */}
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-3 h-3 rounded-full shadow-lg"
                    style={{
                      background: view.color,
                      boxShadow: `0 0 12px ${view.color}`
                    }}
                  />
                  <Play className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                  {view.name}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {view.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-center gap-6 pt-8 border-t border-border-subtle">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Eye className="w-4 h-4" />
            <span>100% 互動元件</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-text-muted" />
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Code className="w-4 h-4" />
            <span>React + TypeScript</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-text-muted" />
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Sparkles className="w-4 h-4" />
            <span>Mock 數據驅動</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-deep text-text-primary flex flex-col">
      {/* Showcase Header */}
      <header className="h-16 border-b border-border-subtle bg-deep px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('intro')}
            className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">GitNexus Showcase</span>
          </button>

          {currentView !== 'intro' && (
            <>
              <div className="w-px h-6 bg-border-subtle" />
              <span className="text-sm text-text-secondary">
                {views.find(v => v.id === currentView)?.name}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-xs font-semibold text-green-500">Demo Mode</span>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className={`p-2 rounded-lg transition-colors ${
              showCode
                ? 'bg-accent/10 text-accent'
                : 'hover:bg-hover text-text-muted'
            }`}
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {currentView === 'intro' && <IntroScreen />}

        {currentView === 'dashboard' && (
          <DashboardView />
        )}

        {currentView === 'taskboard' && (
          <TaskBoard />
        )}

        {currentView === 'taskdetail' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <TaskDetailModal
              isOpen={true}
              onClose={() => setCurrentView('taskboard')}
              taskId="T-101"
            />
          </div>
        )}

        {currentView === 'impact' && (
          <ActivityImpactView />
        )}
      </div>

      {/* Code Inspector (Optional) */}
      {showCode && (
        <div className="h-64 border-t border-border-subtle bg-deep p-4 overflow-auto font-mono text-xs">
          <div className="text-green-400">
            // Component: {views.find(v => v.id === currentView)?.name || 'Intro'}
          </div>
          <div className="text-text-muted mt-2">
            // File: {currentView === 'intro' ? 'ShowcaseApp.tsx' : `components/${views.find(v => v.id === currentView)?.name.split(' ')[0]}.tsx`}
          </div>
          <div className="text-blue-400 mt-2">
            // State: Mock data mode
          </div>
          <div className="text-yellow-400 mt-2">
            // Interactions: Fully functional (click, drag, filter)
          </div>
        </div>
      )}
    </div>
  );
};
