import React, { useState, useMemo } from 'react';
import { GitBranch, ChevronDown, Plus, MoreHorizontal, Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Task, PRIORITY_CONFIG } from '../utils/taskUtil';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from 'react-dom';
import { TaskDetailModal } from './TaskDetailModal';

type ColumnType = 'To Do' | 'In Progress' | 'In Review' | 'Done';
const COLUMNS: ColumnType[] = ['To Do', 'In Progress', 'In Review', 'Done'];

const ColumnIcon = ({ col }: { col: ColumnType }) => {
  if (col === 'Done') return <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />;
  if (col === 'In Review') return <AlertCircle className="w-3.5 h-3.5 text-[#7c3aed]" />;
  if (col === 'In Progress') return <Circle className="w-3.5 h-3.5 text-[#3b82f6] fill-[#3b82f6]" />;
  return <Circle className="w-3.5 h-3.5 text-[#5a5a70]" />;
};

const SortableTaskCard = ({ task }: { task: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
};

const FilterSidebar = () => {
  return (
    <div className="w-56 border-r border-border-subtle bg-deep flex flex-shrink-0 flex-col p-4 gap-6">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">Categories</h3>
        <div className="space-y-1">
          {['Infrastructure', 'Frontend', 'Safety & QA', 'Product'].map((cat, i) => (
            <button key={cat} className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${i === 2 ? 'bg-accent/10 text-accent font-semibold' : 'text-text-secondary hover:bg-hover'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">Risk Level</h3>
        <div className="space-y-1">
          {[
            { label: 'Critical', color: '#ef4444' },
            { label: 'High', color: '#f97316', active: true },
            { label: 'Standard', color: '#10b981' },
          ].map((risk) => (
            <button key={risk.label} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-hover group transition-all">
              <div className="flex items-center gap-2 text-text-secondary">
                 <div className="w-1.5 h-1.5 rounded-full" style={{ background: risk.color, boxShadow: risk.active ? `0 0 8px ${risk.color}` : 'none' }} />
                 {risk.label}
              </div>
              {risk.active && <div className="w-1 h-1 rounded-full bg-node-variable shadow-[0_0_8px_#f59e0b]" />}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 rounded-3xl bg-amber-500/5 border border-amber-500/10 relative overflow-hidden group">
         <div className="absolute inset-0 bg-amber-500/5 blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
         <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-1">Attention Required</p>
         <p className="text-[11px] text-amber-500/80 leading-relaxed">
           3 tasks in "In Progress" are approaching deadline.
         </p>
      </div>
    </div>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { setSelectedTaskId } = useAppState();
  const priority = PRIORITY_CONFIG[task.priority];
  const isInReview = task.status === 'In Review';
  
  // Mock progress based on title length or random
  const progress = task.status === 'Done' ? 100 : task.status === 'To Do' ? 0 : 45;
  const isOverdue = task.id === 'T-101' || task.id === 'T-100'; // Mock overdue logic

  return (
    <div
      onClick={() => setSelectedTaskId(task.id)}
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

        {/* Progress Bar (Flow A-01) */}
        {task.status === 'In Progress' && (
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-text-muted font-mono uppercase">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-surface rounded-full overflow-hidden">
               <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

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
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
              style={{ background: `${task.roleColor}60`, border: `1px solid ${task.roleColor}40` }}
            >
              {task.assignee.slice(0, 2)}
            </div>
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-mono ${isOverdue ? 'text-node-file font-bold' : 'text-text-muted'}`}>
            <Clock className={`w-3 h-3 ${isOverdue ? 'animate-pulse' : ''}`} />
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

const ColumnStats = ({ total, overdue }: { total: number; overdue: number }) => {
  return (
    <div className="px-4 py-3 border-t border-border-subtle bg-deep/50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-text-muted">Total</span>
          <span className="text-xs font-bold text-text-primary">{total}</span>
        </div>
        <div className="w-px h-6 bg-border-subtle" />
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-text-muted">Overdue</span>
          <span className={`text-xs font-bold ${overdue > 0 ? 'text-node-file' : 'text-node-function'}`}>{overdue}</span>
        </div>
      </div>
      <div className="flex -space-x-1.5">
          {[1,2,3].map(i => (
            <div key={i} className="w-5 h-5 rounded-full bg-surface border border-deep flex items-center justify-center text-[8px] text-text-muted font-bold">
               {String.fromCharCode(64 + i)}
            </div>
          ))}
      </div>
    </div>
  );
};

export const TaskBoard: React.FC = () => {
  const { 
    tasks, 
    updateTaskStatus, 
    moveTask, 
    selectedTaskId, 
    setSelectedTaskId 
  } = useAppState();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overId = over.id as string;

    // If hovering over a column
    if (COLUMNS.includes(overId as ColumnType)) {
      if (activeTask && activeTask.status !== overId) {
        updateTaskStatus(activeTask.id, overId as ColumnType);
      }
      return;
    }

    // If hovering over another task
    const overTask = tasks.find((t) => t.id === overId);
    if (activeTask && overTask && activeTask.status !== overTask.status) {
      updateTaskStatus(activeTask.id, overTask.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as string);
    }
    setActiveId(null);
  };

  const activeTask = useMemo(() => 
    activeId ? tasks.find(t => t.id === activeId) : null
  , [activeId, tasks]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full w-full overflow-hidden bg-void">
        <FilterSidebar />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Kanban Board */}
          <div className="flex-1 overflow-x-auto p-6 flex gap-6 min-w-max bg-blob-center">
            {COLUMNS.map((col) => {
              const columnTasks = tasks.filter((t) => t.status === col);
              const isReviewCol = col === 'In Review';
              const overdueCount = columnTasks.filter(t => t.id === 'T-101' || t.id === 'T-100').length;

              return (
                <div
                  key={col}
                  className="flex flex-col w-72 flex-shrink-0 rounded-2xl overflow-hidden group/col"
                  style={{
                    background: 'var(--color-deep)',
                    border: `1px solid ${isReviewCol ? 'rgba(124,58,237,0.25)' : 'var(--color-border-subtle)'}`,
                    boxShadow: isReviewCol ? '0 4px 32px rgba(124,58,237,0.06)' : undefined,
                  }}
                >
                  {/* Column Header */}
                  <div
                    className="flex items-center justify-between px-4 py-4 border-b group-hover/col:bg-surface/30 transition-colors"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <div className="flex items-center gap-2">
                      <ColumnIcon col={col} />
                      <span className="text-[13px] font-bold tracking-tight text-white uppercase">
                        {col}
                      </span>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface border border-border-default text-text-muted"
                      >
                        {columnTasks.length}
                      </span>
                    </div>
                  </div>

                  {/* Cards Area (Sortable) */}
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-thin">
                    <SortableContext
                      id={col}
                      items={columnTasks.map(t => t.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {columnTasks.map((task) => (
                        <SortableTaskCard key={task.id} task={task} />
                      ))}
                    </SortableContext>

                    {/* Add card button */}
                    <button
                      className="w-full flex items-center gap-2 px-3 py-3 rounded-xl text-sm transition-all opacity-40 hover:opacity-100 hover:bg-surface border border-dashed border-border-default text-text-muted"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add task
                    </button>
                  </div>

                  {/* Column Stats */}
                  <ColumnStats total={columnTasks.length} overdue={overdueCount} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>

      {selectedTaskId && (
        <TaskDetailModal onClose={() => setSelectedTaskId(null)} />
      )}
    </DndContext>
  );
};
