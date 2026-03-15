import React, { useState } from 'react';
import { X, ChevronDown, FileCode2, GitCommit, Zap, GitPullRequest, Play, Upload, Code2, Terminal } from 'lucide-react';

interface TaskDetailModalProps {
  onClose?: () => void;
}

const LOG_LINES = [
  { ts: '17:04:11', tool: 'gitnexus_context', args: '{ name: "TaskBoard" }', color: '#7c3aed' },
  { ts: '17:04:12', type: 'result', text: '↳ 3 callers, 2 processes found', color: '#10b981' },
  { ts: '17:04:13', tool: 'gitnexus_impact', args: '{ target: "TaskBoard", direction: "upstream" }', color: '#7c3aed' },
  { ts: '17:04:15', type: 'warn', text: '⚠ Risk: MEDIUM (d=1: 3 symbols)', color: '#f59e0b' },
  { ts: '17:04:16', type: 'result', text: '↳ Done in 1.4s', color: '#10b981' },
];

const ACTION_BTN = ({
  label,
  icon: Icon,
  variant,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  variant: 'primary' | 'secondary' | 'warning' | 'success';
  onClick?: () => void;
}) => {
  const styles = {
    primary: {
      bg: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
      border: 'rgba(124,58,237,0.4)',
      color: '#fff',
      shadow: '0 0 16px rgba(124,58,237,0.35)',
    },
    secondary: {
      bg: 'var(--color-elevated)',
      border: 'var(--color-border-default)',
      color: 'var(--color-text-secondary)',
      shadow: 'none',
    },
    warning: {
      bg: 'rgba(234,179,8,0.07)',
      border: 'rgba(234,179,8,0.25)',
      color: '#eab308',
      shadow: '0 0 12px rgba(234,179,8,0.08)',
    },
    success: {
      bg: 'rgba(16,185,129,0.07)',
      border: 'rgba(16,185,129,0.25)',
      color: '#10b981',
      shadow: '0 0 12px rgba(16,185,129,0.08)',
    },
  };
  const s = styles[variant];
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-px hover:brightness-110 active:translate-y-0"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        boxShadow: s.shadow,
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      {label}
    </button>
  );
};

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ onClose }) => {
  const [status, setStatus] = useState('In Review');

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(6,6,10,0.7)', backdropFilter: 'blur(6px)' }}
    >
      {/* Slide-in Panel */}
      <div
        className="w-full max-w-4xl h-full flex flex-col md:flex-row shadow-2xl"
        style={{
          background: 'var(--color-deep)',
          borderLeft: '1px solid var(--color-border-subtle)',
          fontFamily: 'var(--font-sans)',
          animation: 'slide-in 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ── LEFT: Markdown Render ── */}
        <div
          className="flex-1 flex flex-col min-h-0 border-r"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-3.5 border-b flex-shrink-0"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md"
                style={{
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: '#a78bfa',
                }}
              >
                T-101
              </span>
              <h2 className="text-[15px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Design Task Board & AI Hub
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body – scrollable markdown */}
          <div
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {/* Description */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-3 pb-2 border-b"
                style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border-subtle)' }}
              >
                Description
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Design the AI task collaboration hub for GitNexus Web. The UI must follow the existing dark design system
                (Outfit + JetBrains Mono), use the established color tokens, and render the Kanban view, task detail
                modal, and activity impact view.
              </p>
            </div>

            {/* Acceptance Criteria */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-3 pb-2 border-b"
                style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border-subtle)' }}
              >
                Acceptance Criteria
              </h3>
              <ul className="space-y-2">
                {[
                  'Dark kanban board with 4 columns matching the design system',
                  'Role badges rendered with appropriate accent colors',
                  '"In Review" column with purple glow for PM approval',
                  'Task detail modal with action sidebar',
                  'Real-time MCP activity terminal log at the bottom',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-[var(--color-accent)]">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code snippet */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-void)' }}
            >
              <div
                className="flex items-center justify-between px-4 py-2 border-b"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5" style={{ color: '#3b82f6' }} />
                  <span
                    className="text-xs font-mono"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    src/components/TaskBoard.tsx
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ background: 'var(--color-hover)', color: 'var(--color-text-muted)' }}>
                  TSX
                </span>
              </div>
              <pre className="p-4 text-xs overflow-x-auto" style={{ fontFamily: 'var(--font-mono)', color: '#10b981' }}>
                <code>{`export const TaskBoard = () => {
  return (
    <div style={{ background: 'var(--color-void)' }}>
      <KanbanColumns tasks={mockTasks} />
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Action Sidebar ── */}
        <div className="w-72 flex flex-col flex-shrink-0">
          {/* Scrollable actions */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
            {/* Status dropdown */}
            <div>
              <label
                className="text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full appearance-none rounded-xl px-3.5 py-2.5 text-sm pr-9 outline-none transition-all focus:border-[var(--color-accent)]"
                  style={{
                    background: 'var(--color-elevated)',
                    border: '1px solid var(--color-border-default)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>In Review</option>
                  <option>Done</option>
                </select>
                <ChevronDown
                  className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }}
                />
              </div>
            </div>

            {/* Actions */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-widest mb-2.5 block" style={{ color: 'var(--color-text-muted)' }}>
                Actions
              </label>
              <div className="space-y-2">
                <ACTION_BTN label="Start Task" icon={Play} variant="primary" />
                <ACTION_BTN label="Submit Progress" icon={Upload} variant="secondary" />
                <ACTION_BTN label="Run Impact Analysis" icon={Zap} variant="warning" />
                <ACTION_BTN label="Submit PR" icon={GitPullRequest} variant="success" />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: 'var(--color-border-subtle)' }} />

            {/* Related Files */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-widest mb-2.5 block" style={{ color: 'var(--color-text-muted)' }}>
                Related Files
              </label>
              <div className="space-y-1">
                {[
                  { icon: '#3b82f6', label: 'TaskBoard.tsx', tag: 'TSX' },
                  { icon: '#6b7280', label: 'TASK.md', tag: 'MD' },
                  { icon: '#3b82f6', label: 'ActivityImpactView.tsx', tag: 'TSX' },
                ].map((f) => (
                  <button
                    key={f.label}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <FileCode2 className="w-4 h-4 flex-shrink-0" style={{ color: f.icon }} />
                    <span className="flex-1 truncate">{f.label}</span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--color-hover)', color: 'var(--color-text-muted)' }}
                    >
                      {f.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Commit History */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-widest mb-2.5 block" style={{ color: 'var(--color-text-muted)' }}>
                Commit History
              </label>
              <div className="space-y-3">
                {[
                  { sha: 'a1b2c3d', msg: 'feat: dark kanban board base layout', time: '2h ago' },
                  { sha: 'e4f5g6h', msg: 'style: align task cards to design tokens', time: '4h ago' },
                ].map((c) => (
                  <div key={c.sha} className="flex items-start gap-2.5">
                    <GitCommit className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                    <div>
                      <p className="text-xs leading-snug" style={{ color: 'var(--color-text-secondary)' }}>{c.msg}</p>
                      <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        {c.sha} · {c.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom: Terminal MCP Log ── */}
          <div
            className="h-44 flex-shrink-0 flex flex-col border-t"
            style={{ background: 'var(--color-void)', borderColor: 'var(--color-border-subtle)' }}
          >
            <div
              className="flex items-center justify-between px-3.5 py-2 border-b flex-shrink-0"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
            >
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  MCP Activity
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5 scrollbar-thin">
              {LOG_LINES.map((l, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span className="opacity-50 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                    {l.ts}
                  </span>
                  {l.tool ? (
                    <>
                      <span style={{ color: l.color }}>
                        → {l.tool}
                      </span>
                      <span style={{ color: 'var(--color-text-muted)' }}>{l.args}</span>
                    </>
                  ) : (
                    <span style={{ color: l.color }}>{l.text}</span>
                  )}
                </div>
              ))}
              <span className="inline-block w-1.5 h-3.5 bg-[var(--color-accent)] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
