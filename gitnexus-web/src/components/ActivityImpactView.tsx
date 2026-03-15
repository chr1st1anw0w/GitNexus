import React, { useState } from 'react';
import { Search, Activity, GitMerge, Code2, Terminal, AlertTriangle, CheckCircle2, Filter, Clock } from 'lucide-react';

const MCP_LOGS = [
  { ts: '17:04:22', type: 'call', tool: 'gitnexus_impact', args: '{ target: "AuthService", direction: "upstream" }' },
  { ts: '17:04:23', type: 'debug', text: 'Traversal depth d=1: 4 symbols, d=2: 12 symbols' },
  { ts: '17:04:25', type: 'result', text: 'Impact computed: risk=HIGH, nodes=24' },
  { ts: '17:04:26', type: 'warn', text: '⚠ Blast radius threshold exceeded (severity: HIGH)' },
  { ts: '17:04:27', type: 'call', tool: 'gitnexus_context', args: '{ name: "validateUser", include_content: true }' },
  { ts: '17:04:28', type: 'result', text: 'Context: 6 callers, 2 callees, processes: [UserLogin, TokenRefresh]' },
];

const NAV_ITEMS = [
  { icon: GitMerge, label: 'Impact Graph', active: true },
  { icon: Activity, label: 'Activity Log', active: false },
  { icon: Code2, label: 'Code Diff', active: false },
  { icon: Terminal, label: 'Security Scan', active: false },
];

const METRIC_CARDS = [
  { label: 'Nodes Affected', value: '24', sub: '+3 indirect', color: 'var(--color-node-file)', glow: 'rgba(59,130,246,0.12)' },
  { label: 'Risk Level', value: 'HIGH', sub: 'Exceeds threshold', color: '#ef4444', glow: 'rgba(239,68,68,0.12)', pulse: true },
  { label: 'Processes', value: '3', sub: 'UserLogin, TokenRefresh, Auth', color: 'var(--color-node-function)', glow: 'rgba(16,185,129,0.08)' },
];

// Node graph positions (mock)
const GRAPH_NODES = [
  { id: 'auth',     x: 50,  y: 45, label: 'AuthService',      r: 26, color: '#ef4444', glow: 'rgba(239,68,68,0.5)', ring: true },
  { id: 'login',    x: 22,  y: 20, label: 'LoginController',   r: 17, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)' },
  { id: 'session',  x: 78,  y: 20, label: 'SessionManager',    r: 17, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)' },
  { id: 'db',       x: 50,  y: 78, label: 'DatabaseLayer',     r: 17, color: '#10b981', glow: 'rgba(16,185,129,0.35)' },
  { id: 'token',    x: 20,  y: 65, label: 'TokenRefresh',      r: 12, color: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
  { id: 'mw',       x: 80,  y: 65, label: 'AuthMiddleware',    r: 12, color: '#6366f1', glow: 'rgba(99,102,241,0.25)' },
];

const GRAPH_EDGES = [
  ['auth',     'login'],
  ['auth',     'session'],
  ['auth',     'db'],
  ['auth',     'token'],
  ['auth',     'mw'],
];

export const ActivityImpactView: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Impact Graph');

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden"
      style={{ background: 'var(--color-void)', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}
    >
      {/* ── Top: Search & Filters ── */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-dashed flex-shrink-0"
        style={{ background: 'var(--color-deep)', borderColor: 'var(--color-border-subtle)' }}
      >
        <div
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl w-80 transition-all"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search commit, task ID, or symbol..."
            className="flex-1 bg-transparent outline-none border-none text-sm placeholder-opacity-50"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <kbd
            className="px-1.5 py-0.5 rounded text-[10px] font-mono"
            style={{ background: 'var(--color-elevated)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-muted)' }}
          >
            ⌘F
          </kbd>
        </div>
        <div className="flex items-center gap-2">
          {['Last 7 days', 'Risk: HIGH', 'Branch: main'].map((tag) => (
            <button
              key={tag}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] transition-all"
              style={{
                background: 'var(--color-elevated)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <Filter className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* ── Left Sidebar ── */}
        <div
          className="w-52 border-r flex flex-col p-3 gap-1 flex-shrink-0"
          style={{ background: 'var(--color-deep)', borderColor: 'var(--color-border-subtle)' }}
        >
          {NAV_ITEMS.map(({ icon: Icon, label }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                style={{
                  background: isActive ? 'rgba(124,58,237,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(124,58,237,0.22)' : '1px solid transparent',
                  color: isActive ? '#a78bfa' : 'var(--color-text-muted)',
                  boxShadow: isActive ? '0 2px 12px rgba(124,58,237,0.08)' : 'none',
                }}
              >
                <Icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: isActive ? '#a78bfa' : 'var(--color-text-muted)' }}
                />
                {label}
              </button>
            );
          })}

          {/* Divider */}
          <div className="my-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }} />

          {/* Recent targets */}
          <p
            className="px-3 text-[10px] uppercase tracking-widest font-semibold mb-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Recent Targets
          </p>
          {['AuthService', 'validateUser', 'LoginController'].map((sym) => (
            <button
              key={sym}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors text-left"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <Clock className="w-3 h-3 flex-shrink-0 opacity-50" />
              <span className="font-mono truncate">{sym}</span>
            </button>
          ))}
        </div>

        {/* ── Main: Impact View ── */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* Metrics Row */}
          <div
            className="grid grid-cols-3 gap-4 px-6 py-4 border-b flex-shrink-0"
            style={{ background: 'var(--color-deep)', borderColor: 'var(--color-border-subtle)' }}
          >
            {METRIC_CARDS.map((m) => (
              <div
                key={m.label}
                className="relative rounded-xl p-4 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${m.glow}, var(--color-elevated))`,
                  border: `1px solid ${m.color}22`,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -translate-y-1/2 translate-x-1/2 opacity-10"
                  style={{ background: m.color }}
                />
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  {m.label}
                </p>
                <div className="flex items-end gap-2">
                  <span
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: m.pulse ? '#ef4444' : 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
                  >
                    {m.value}
                  </span>
                  {m.pulse && <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse mb-1" />}
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Graph Area */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              background: `
                radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.04) 0%, transparent 60%),
                var(--color-void)
              `,
            }}
          >
            {/* Dot grid overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* SVG Graph Viz */}
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                {GRAPH_NODES.map((n) => (
                  <filter key={`glow-${n.id}`} id={`glow-${n.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
              </defs>

              {/* Edges */}
              {GRAPH_EDGES.map(([from, to]) => {
                const fn = GRAPH_NODES.find((n) => n.id === from)!;
                const tn = GRAPH_NODES.find((n) => n.id === to)!;
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={fn.x}
                    y1={fn.y}
                    x2={tn.x}
                    y2={tn.y}
                    stroke="#2a2a3a"
                    strokeWidth="0.5"
                    strokeDasharray={fn.ring ? '2,2' : undefined}
                  />
                );
              })}

              {/* Nodes */}
              {GRAPH_NODES.map((n) => (
                <g key={n.id} filter={`url(#glow-${n.id})`}>
                  {n.ring && (
                    <circle cx={n.x} cy={n.y} r={n.r + 5} fill="none" stroke={n.color} strokeWidth="0.3" opacity="0.3" />
                  )}
                  <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}22`} stroke={n.color} strokeWidth="0.8" />
                  <text
                    x={n.x}
                    y={n.y + n.r / 4}
                    textAnchor="middle"
                    fill={n.color}
                    fontSize="2.8"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                  >
                    {n.label.split('').slice(0, 1)}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + n.r + 3.5}
                    textAnchor="middle"
                    fill="#8888a0"
                    fontSize="2.2"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Contextual Info Card (top-right) */}
            <div
              className="absolute top-6 right-6 w-64 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(16,16,31,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(239,68,68,0.25)',
                boxShadow: '0 8px 40px rgba(239,68,68,0.08)',
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: 'rgba(239,68,68,0.15)' }}
              >
                <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                <span className="text-sm font-semibold text-[#ef4444]">Critical Blast Radius</span>
              </div>
              <div className="px-4 py-3 space-y-2">
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Modifying{' '}
                  <code
                    className="px-1.5 py-0.5 rounded text-[11px]"
                    style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontFamily: 'var(--font-mono)' }}
                  >
                    AuthService.validate()
                  </code>{' '}
                  will break <strong className="text-white">3 execution flows</strong> at d=1.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span className="text-[11px] text-[#10b981]">Run tests before merging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Real-time MCP Console ── */}
      <div
        className="h-44 border-t flex flex-col flex-shrink-0"
        style={{ background: 'var(--color-void)', borderColor: 'var(--color-border-subtle)' }}
      >
        <div
          className="flex items-center justify-between px-5 py-2 border-b flex-shrink-0"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              Live MCP Execution Log
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
              tail -f mcp.log
            </span>
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-1.5 scrollbar-thin" style={{ fontFamily: 'var(--font-mono)' }}>
          {MCP_LOGS.map((l, i) => {
            const typeStyle = {
              call: { arrow: '→', color: '#7c3aed' },
              result: { arrow: '←', color: '#10b981' },
              warn: { arrow: '!', color: '#f59e0b' },
              debug: { arrow: '·', color: 'var(--color-text-muted)' },
            }[l.type] || { arrow: '·', color: 'var(--color-text-muted)' };

            return (
              <div key={i} className="flex items-start gap-2 text-[11px]">
                <span className="text-[var(--color-text-muted)] opacity-50 flex-shrink-0 select-none">{l.ts}</span>
                <span style={{ color: typeStyle.color }} className="font-bold flex-shrink-0">
                  {typeStyle.arrow}
                </span>
                {l.tool ? (
                  <>
                    <span style={{ color: '#a78bfa' }}>
                      {l.tool}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{l.args}</span>
                  </>
                ) : (
                  <span style={{ color: typeStyle.color }}>{l.text}</span>
                )}
              </div>
            );
          })}
          {/* Blinking cursor */}
          <span className="inline-block w-1.5 h-3.5 align-middle" style={{ background: 'var(--color-accent)', animation: 'var(--animate-breathe)' }} />
        </div>
      </div>
    </div>
  );
};
