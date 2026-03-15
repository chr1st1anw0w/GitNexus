import React, { useState } from 'react';
import { GitBranch, ChevronDown, Plus, MoreHorizontal, Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: string;
  role: string;
  roleColor: string;
  title: string;
  assignee: string;
  status: Column;
  dueDate: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  needsApproval?: boolean;
}

type Column = 'To Do' | 'In Progress' | 'In Review' | 'Done';

const MOCK_TASKS: Task[] = [
  {
    id: 'T-101',
    role: 'UI:Gemini',
    roleColor: '#7c3aed',
    title: 'Design Task Board & AI Hub',
    assignee: 'GW',
    status: 'In Review',
    dueDate: 'Mar 15',
    priority: 'critical',
    needsApproval: true,
  },
  {
    id: 'T-102',
    role: 'Core:Claude',
    roleColor: '#ec4899',
    title: 'Implement Impact Graph API',
    assignee: 'CL',
    status: 'In Progress',
    dueDate: 'Mar 16',
    priority: 'high',
  },
  {
    id: 'T-103',
    role: 'Core:Claude',
    roleColor: '#ec4899',
    title: 'Symbol context traversal optimization',
    assignee: 'CL',
    status: 'In Progress',
    dueDate: 'Mar 17',
    priority: 'medium',
  },
  {
    id: 'T-104',
    role: 'QA:Grok',
    roleColor: '#10b981',
    title: 'End-to-end blast radius test suite',
    assignee: 'GR',
    status: 'To Do',
    dueDate: 'Mar 18',
    priority: 'medium',
  },
  {
    id: 'T-105',
    role: 'UI:Gemini',
    roleColor: '#7c3aed',
    title: 'Responsive variants for mobile',
    assignee: 'GW',
    status: 'To Do',
    dueDate: 'Mar 20',
    priority: 'low',
  },
  {
    id: 'T-100',
    role: 'PM:AI',
    roleColor: '#f59e0b',
    title: 'Define Phase 1 Specifications',
    assignee: 'AI',
    status: 'Done',
    dueDate: 'Mar 14',
    priority: 'high',
  },
];

const PRIORITY_CONFIG = {
  critical: { color: '#ef4444', label: 'Critical' },
  high: { color: '#f97316', label: 'High' },
  medium: { color: '#eab308', label: 'Medium' },
  low: { color: '#6b7280', label: 'Low' },
};

const COLUMNS: Column[] = ['To Do', 'In Progress', 'In Review', 'Done'];

const ColumnIcon = ({ col }: { col: Column }) => {
  if (col === 'Done') return <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />;
  if (col === 'In Review') return <AlertCircle className="w-3.5 h-3.5 text-[#7c3aed]" />;
  if (col === 'In Progress') return <Circle className="w-3.5 h-3.5 text-[#3b82f6] fill-[#3b82f6]" />;
  return <Circle className="w-3.5 h-3.5 text-[#5a5a70]" />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const priority = PRIORITY_CONFIG[task.priority];
  const isInReview = task.status === 'In Review';

  return (
    <div
      className="group relative rounded-xl border cursor-pointer transition-all duration-200"
      style={{
        background: isInReview
          ? 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, rgba(16,16,31,1) 100%)'
          : 'var(--color-elevated)',
        borderColor: isInReview ? 'rgba(124,58,237,0.5)' : 'var(--color-border-subtle)',
        boxShadow: isInReview ? '0 0 24px rgba(124,58,237,0.12), inset 0 1px 0 rgba(124,58,237,0.1)' : undefined,
      }}
    >
      {/* Glow indicator for approval-needed */}
      {task.needsApproval && (
        <div
          className="absolute -top-px left-4 right-4 h-px rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }}
        />
      )}

      <div className="p-3.5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-md"
            style={{
              color: task.roleColor,
              background: `${task.roleColor}18`,
              border: `1px solid ${task.roleColor}30`,
            }}
          >
            {task.role}
          </span>
          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">{task.id}</span>
        </div>

        {/* Title */}
        <p className="text-[13px] font-medium text-[var(--color-text-primary)] leading-snug mb-3 group-hover:text-white transition-colors">
          {task.title}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            {/* Priority dot */}
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: priority.color, boxShadow: `0 0 6px ${priority.color}` }}
            />
            {/* Assignee */}
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
              style={{ background: `${task.roleColor}60`, border: `1px solid ${task.roleColor}40` }}
            >
              {task.assignee.slice(0, 2)}
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)]">
            <Clock className="w-3 h-3" />
            {task.dueDate}
          </div>
        </div>
      </div>

      {/* PM Approval badge */}
      {task.needsApproval && (
        <div
          className="mx-3 mb-3 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold tracking-wide flex items-center gap-1.5"
          style={{
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.25)',
            color: '#a78bfa',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse inline-block" />
          Awaiting PM Approval
        </div>
      )}
    </div>
  );
};

export const TaskBoard: React.FC = () => {
  const [branch] = useState('main');

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden"
      style={{
        background: 'var(--color-void)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* ── Top Navigation Bar ── */}
      <header
        className="flex items-center justify-between px-5 py-3 border-b border-dashed"
        style={{ background: 'var(--color-deep)', borderColor: 'var(--color-border-subtle)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 flex items-center justify-center rounded-md text-white text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                boxShadow: '0 0 20px rgba(124,58,237,0.4)',
              }}
            >
              ◇
            </div>
            <span className="font-semibold text-[15px] tracking-tight">
              GitNexus<span style={{ color: 'var(--color-text-muted)' }}> AI Hub</span>
            </span>
          </div>

          {/* Branch Selector */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <GitBranch className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
            <span className="font-mono">{branch}</span>
            <ChevronDown className="w-3 h-3 opacity-50" />
          </button>
        </div>

        {/* Right: New Task button + Avatar */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              color: 'white',
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            New Task
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              boxShadow: '0 0 12px rgba(124,58,237,0.3)',
            }}
          >
            CW
          </div>
        </div>
      </header>

      {/* ── Kanban Board ── */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-5 h-full min-w-max">
          {COLUMNS.map((col) => {
            const tasks = MOCK_TASKS.filter((t) => t.status === col);
            const isReviewCol = col === 'In Review';

            return (
              <div
                key={col}
                className="flex flex-col w-72 flex-shrink-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--color-deep)',
                  border: `1px solid ${isReviewCol ? 'rgba(124,58,237,0.25)' : 'var(--color-border-subtle)'}`,
                  boxShadow: isReviewCol ? '0 4px 32px rgba(124,58,237,0.06)' : undefined,
                }}
              >
                {/* Column Header */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <div className="flex items-center gap-2">
                    <ColumnIcon col={col} />
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {col}
                    </span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border-default)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {tasks.length}
                    </span>
                  </div>
                  <button className="p-1 rounded-md hover:bg-[var(--color-hover)] transition-colors">
                    <MoreHorizontal className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                  </button>
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                  {/* Add card button */}
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all opacity-50 hover:opacity-100"
                    style={{
                      border: '1px dashed var(--color-border-default)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
