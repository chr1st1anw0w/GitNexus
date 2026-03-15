import { X, ChevronDown, FileCode2, GitCommit, Zap, GitPullRequest, Play, Upload, Code2, Terminal, CheckCircle2, Sparkles } from 'lucide-react';

interface TaskDetailModalProps {
  onClose?: () => void;
}

const LOG_LINES = [
  { ts: '10:12:01', tool: 'mcp_query-docs', args: '{ libraryId: "/vercel/next.js", query: "routing" }', color: '#3b82f6' },
  { ts: '10:12:03', type: 'debug', text: '↳ Fetching documentation chunks...', color: 'var(--color-text-muted)' },
  { ts: '10:12:05', type: 'result', text: '↳ Found 4 relevant documentation sections', color: '#10b981' },
  { ts: '10:12:44', tool: 'gitnexus_impact', args: '{ target: "TaskBoard", direction: "upstream" }', color: '#7c3aed' },
  { ts: '10:12:46', type: 'warn', text: '⚠ Risk: MEDIUM (d=1: 3 symbols)', color: '#f59e0b' },
  { ts: '10:12:47', tool: 'gitnexus_context', args: '{ name: "TaskBoard" }', color: '#7c3aed' },
  { ts: '10:12:48', type: 'result', text: '↳ 3 callers, 2 processes found', color: '#10b981' },
  { ts: '10:12:55', tool: 'gitnexus_detect_changes', args: '{ scope: "unstaged" }', color: '#7c3aed' },
  { ts: '10:12:56', type: 'debug', text: '↳ Diffing 4 modified files...', color: 'var(--color-text-muted)' },
  { ts: '10:12:58', type: 'result', text: '↳ No breaking changes detected in core flows', color: '#10b981' },
  { ts: '10:13:02', tool: 'mcp_browser-automation_puppeteer_navigate', args: '{ url: "http://localhost:3000" }', color: '#ec4899' },
  { ts: '10:13:05', type: 'debug', text: '↳ Page loaded, evaluating layout selectors...', color: 'var(--color-text-muted)' },
  { ts: '10:13:06', type: 'result', text: '↳ UI validation: 12/12 elements passed', color: '#10b981' },
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
      bg: 'rgba(255,255,255,0.05)',
      border: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.7)',
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
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Dark kanban board with 4 columns matching the design system', checked: true },
    { id: 2, text: 'Role badges rendered with appropriate accent colors', checked: true },
    { id: 3, text: '"In Review" column with purple glow for PM approval', checked: false },
    { id: 4, text: 'Task detail modal with action sidebar and Glassmorphism', checked: true },
    { id: 5, text: 'Real-time MCP activity terminal log at the bottom', checked: false },
    { id: 6, text: 'Performance optimization for SVG graph rendering', checked: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const checkedCount = checklist.filter(c => c.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(6,6,10,0.5)', backdropFilter: 'blur(12px)' }}
    >
      {/* Background Blobs for Glass Feel */}
      <div className="absolute top-[20%] right-[30%] w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-node-file/10 rounded-full blur-[100px] -z-10" />

      {/* Slide-in Panel */}
      <div
        className="w-full max-w-5xl h-full flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.5)] border-l"
        style={{
          background: 'rgba(10,10,18,0.85)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderColor: 'rgba(255,255,255,0.08)',
          fontFamily: 'var(--font-sans)',
          animation: 'slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── LEFT: Content ── */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-white/5 bg-void/30">
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                T-101
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
                Design Task Board & AI Hub
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-thin">
            {/* Description */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-accent rounded-full" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Description</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-text-secondary font-medium">
                Design the AI task collaboration hub for GitNexus Web. The UI must follow the existing dark design system
                (Outfit + JetBrains Mono), use the established color tokens, and render the Kanban view, task detail
                modal, and activity impact view.
              </p>
            </section>

            {/* Checklist */}
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3 bg-node-function rounded-full" />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Requirement Checklist</h3>
                </div>
                <div className="flex items-center gap-3">
                   <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-node-function transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                   </div>
                   <span className="text-[11px] font-mono text-node-function font-bold">{progressPercent}%</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {checklist.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${item.checked ? 'bg-node-function/5 border-node-function/20' : 'bg-white/2 border-white/5 hover:bg-white/5'}`}
                  >
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-node-function border-node-function' : 'border-white/10'}`}>
                      {item.checked && <CheckCircle2 className="w-3.5 h-3.5 text-void font-bold" />}
                    </div>
                    <span className={`text-sm ${item.checked ? 'text-text-primary line-through opacity-50' : 'text-text-secondary font-medium'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Code Context */}
            <section className="space-y-4">
               <div className="flex items-center gap-2">
                  <div className="w-1 h-3 bg-node-variable rounded-full" />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Implementation Reference</h3>
               </div>
               <div className="rounded-3xl bg-void border border-white/10 shadow-2xl overflow-hidden group">
                  <div className="px-5 py-3.5 bg-white/5 border-b border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Code2 className="w-4 h-4 text-accent" />
                        <span className="text-[12px] font-mono text-text-muted">src/hooks/useAppState.tsx</span>
                     </div>
                     <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">TSX</span>
                  </div>
                  <pre className="p-6 text-sm text-node-function font-mono leading-relaxed bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.05),transparent)]">
                     <code>{`export const useAppState = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('exploring');
  const [hubTab, setHubTab] = useState<HubTab>('dashboard');

  return { viewMode, setViewMode, hubTab, setHubTab };
};`}</code>
                  </pre>
               </div>
            </section>
          </div>
        </div>

        {/* ── RIGHT Side ── */}
        <div className="w-[340px] flex flex-col border-white/5">
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-void/20 scrollbar-thin">
            {/* Status Section */}
            <div>
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Status & Assignments
               </h4>
               <div className="space-y-4 bg-white/5 p-5 rounded-3xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Sparkles className="w-12 h-12 text-accent" />
                  </div>
                  <div className="relative">
                    <label className="text-[11px] text-text-muted mb-1.5 block">Pipeline Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:border-accent outline-none"
                    >
                      <option>To Do</option>
                      <option>In Progress</option>
                      <option>In Review</option>
                      <option>Done</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                     <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-pink-500 p-0.5 shadow-lg">
                        <div className="w-full h-full rounded-[14px] bg-void flex items-center justify-center text-xs font-bold text-white">CW</div>
                     </div>
                     <div>
                        <p className="text-sm font-bold text-white">Christian Wu</p>
                        <p className="text-[10px] text-text-muted">Lead UI/UX Architect</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Actions Grid */}
            <div className="space-y-3">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">Priority Actions</h4>
               <div className="grid grid-cols-1 gap-2.5">
                 <ACTION_BTN label="Execute Full Trace" icon={Play} variant="primary" />
                 <ACTION_BTN label="Sync Code State" icon={GitPullRequest} variant="success" />
                 <ACTION_BTN label="Security Audit" icon={Zap} variant="warning" />
                 <ACTION_BTN label="Discard Changes" icon={X} variant="secondary" />
               </div>
            </div>

            {/* Related Files (Flow A-02) */}
            <div className="space-y-3">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">Context Assets (6)</h4>
               <div className="space-y-1.5">
                  {[
                    { name: 'App.tsx', color: '#3b82f6', type: 'TSX' },
                    { name: 'DashboardView.tsx', color: '#3b82f6', type: 'TSX' },
                    { name: 'TaskBoard.tsx', color: '#3b82f6', type: 'TSX' },
                    { name: 'useAppState.tsx', color: '#3b82f6', type: 'HOOK' },
                    { name: 'index.css', color: '#ec4899', type: 'CSS' },
                    { name: 'GLOBAL_THEME.md', color: '#6b7280', type: 'DOC' },
                  ].map(file => (
                    <div key={file.name} className="flex items-center justify-between p-2.5 rounded-xl bg-white/2 hover:bg-white/5 border border-white/5 transition-all group cursor-pointer">
                       <div className="flex items-center gap-3">
                         <FileCode2 className="w-4 h-4" style={{ color: file.color }} />
                         <span className="text-[13px] text-text-secondary group-hover:text-white transition-colors">{file.name}</span>
                       </div>
                       <span className="text-[9px] font-mono font-bold text-text-muted bg-white/5 px-2 py-0.5 rounded">{file.type}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Terminal Console (Flow A-02) */}
          <div className="h-[240px] flex-shrink-0 flex flex-col border-t border-white/5 bg-[#05050a]">
            <div className="px-5 py-2.5 bg-white/2 border-b border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <Terminal className="w-3.5 h-3.5 text-accent animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Agent Lifecycle Logs</span>
               </div>
               <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-node-function shadow-[0_0_5px_#10b981]" />
                  <span className="text-[9px] font-mono text-node-function">SYNCED</span>
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-2.5 font-mono text-[10px] scrollbar-thin">
               {LOG_LINES.map((l, i) => (
                 <div key={i} className="flex gap-3 leading-relaxed">
                    <span className="text-text-muted/30 select-none w-10 flex-shrink-0">{l.ts}</span>
                    <div className="flex items-start gap-1.5 overflow-hidden">
                       <span style={{ color: l.color }} className="font-bold flex-shrink-0">
                          {l.tool ? 'λ' : '→'}
                       </span>
                       <div className="flex flex-col gap-0.5 overflow-hidden">
                          {l.tool ? (
                            <>
                              <span className="text-white font-bold">{l.tool}</span>
                              <span className="text-text-muted/70 truncate">{l.args}</span>
                            </>
                          ) : (
                            <span style={{ color: l.color }} className="italic">{l.text}</span>
                          )}
                       </div>
                    </div>
                 </div>
               ))}
               <div className="flex items-center gap-2">
                  <span className="text-text-muted/30 w-10 opacity-0 select-none">.</span>
                  <div className="w-1.5 h-4 bg-accent shadow-[0_0_10px_#7c3aed] animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
