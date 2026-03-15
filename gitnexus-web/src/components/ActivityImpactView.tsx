import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Activity, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2, 
  Terminal,
  Zap,
  Shield,
  Layout,
  Cpu
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: Zap, label: 'Impact Graph' },
  { icon: Activity, label: 'Execution Flows' },
  { icon: Shield, label: 'Risk Analysis' },
  { icon: Cpu, label: 'Dependency Map' },
  { icon: Layout, label: 'Module Clusters' },
];

const METRIC_CARDS = [
  { label: 'Total Affected', value: '42', sub: 'Nodes in blast radius', color: '#7c3aed' },
  { label: 'Risk Level', value: 'High', sub: 'Critical dependencies target', color: '#ef4444' },
  { label: 'Processes', value: '12', sub: 'Active execution chains', color: '#10b981', pulse: true },
];

const GRAPH_NODES = [
  { id: '1', x: 50, y: 50, r: 12, color: '#ef4444', label: 'AuthService', ring: true },
  { id: '2', x: 25, y: 30, r: 8, color: '#7c3aed', label: 'UserRoute' },
  { id: '3', x: 75, y: 30, r: 8, color: '#7c3aed', label: 'AdminPanel' },
  { id: '4', x: 20, y: 70, r: 7, color: '#3b82f6', label: 'Session' },
  { id: '5', x: 80, y: 70, r: 7, color: '#10b981', label: 'Logger' },
  { id: '6', x: 50, y: 85, r: 6, color: '#f59e0b', label: 'Database' },
];

const GRAPH_EDGES: [string, string][] = [
  ['1', '2'], ['1', '3'], ['1', '4'], ['1', '5'], ['1', '6'],
  ['2', '4'], ['3', '5']
];

const MCP_LOGS = [
  { ts: '10:24:01', type: 'call', tool: 'gitnexus_impact', args: '{ "target": "AuthService", "direction": "upstream" }' },
  { ts: '10:24:02', type: 'result', text: 'Impact analysis complete. 42 nodes identified.' },
  { ts: '10:24:05', type: 'call', tool: 'gitnexus_query', args: '{ "query": "auth validation flows" }' },
  { ts: '10:24:06', type: 'warn', text: 'Deep dependency cycle detected in Session module.' },
  { ts: '10:24:10', type: 'result', text: 'Execution flows mapped for UserLogin and TokenRefresh.' },
];

const DepthBarChart = () => {
  const data = [
    { depth: 'd=1', count: 4, color: '#ef4444' },
    { depth: 'd=2', count: 12, color: '#f59e0b' },
    { depth: 'd=3', count: 8, color: '#3b82f6' },
  ];
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Blast Radius Distribution</h3>
      <div className="flex items-end gap-2 h-20">
        {data.map((d) => (
          <div key={d.depth} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <div 
              className="w-full rounded-t-lg transition-all hover:brightness-125 relative group" 
              style={{ height: `${(d.count / 15) * 100}%`, background: d.color }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface border border-border-subtle px-1.5 py-0.5 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {d.count}
              </div>
            </div>
            <span className="text-[9px] font-mono text-text-muted">{d.depth}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProcessList = () => {
  const [expanded, setExpanded] = useState<string | null>('UserLogin');
  const processes = [
    { name: 'UserLogin', steps: 12, risk: 'High' },
    { name: 'TokenRefresh', steps: 8, risk: 'Medium' },
    { name: 'PasswordReset', steps: 15, risk: 'Critical' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Impacted Execution Flows</h3>
      <div className="space-y-2">
        {processes.map((p) => (
          <div 
            key={p.name} 
            className="rounded-xl border border-border-subtle bg-surface/30 overflow-hidden cursor-pointer group"
            onClick={() => setExpanded(expanded === p.name ? null : p.name)}
          >
            <div className={`px-3 py-2.5 flex items-center justify-between transition-colors ${expanded === p.name ? 'bg-accent/5' : 'hover:bg-hover'}`}>
              <div className="flex items-center gap-2">
                <Activity className={`w-3.5 h-3.5 ${expanded === p.name ? 'text-accent' : 'text-text-muted'}`} />
                <span className="text-xs font-semibold text-text-primary">{p.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${p.risk === 'Critical' ? 'bg-node-file/10 text-node-file' : 'bg-surface text-text-muted'}`}>{p.steps} steps</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded === p.name ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {expanded === p.name && (
              <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-border-subtle/30 animate-in slide-in-from-top-1 duration-200">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center gap-2 text-[10px] text-text-secondary">
                    <div className="w-1 h-1 rounded-full bg-border-default" />
                    <span>Step {step}: Analysis of {p.name} dependency node {step * 123}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ConicDonutChart = () => {
  return (
    <div className="relative w-12 h-12 rounded-full flex items-center justify-center p-1.5" style={{ background: 'conic-gradient(#ef4444 0% 65%, #f59e0b 65% 85%, #3b82f6 85% 100%)' }}>
      <div className="w-full h-full rounded-full bg-elevated flex items-center justify-center text-[9px] font-bold text-white shadow-inner">
        82%
      </div>
    </div>
  );
};

export const ActivityImpactView: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Impact Graph');

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden"
      style={{ background: 'var(--color-void)', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}
    >
      {/* ── Top: Search & Filters ── */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-deep flex-shrink-0"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl w-80 bg-surface border border-border-subtle">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search commit, task ID, or symbol..."
            className="flex-1 bg-transparent outline-none border-none text-sm placeholder-text-muted/50 text-text-primary"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-elevated border border-border-subtle text-text-muted">
            ⌘F
          </kbd>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 border-r border-border-subtle mr-2">
             <span className="text-[11px] font-mono text-node-function">+124</span>
             <span className="text-[11px] font-mono text-node-file">-42</span>
          </div>
          {['Last 7 days', 'Risk: HIGH'].map((tag) => (
            <button key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] bg-elevated border border-border-subtle text-text-secondary hover:bg-hover transition-all">
              <Filter className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* ── Left Sidebar ── */}
        <div className="w-64 border-r border-border-subtle bg-deep flex flex-col p-4 gap-6 flex-shrink-0 overflow-y-auto">
          <div className="space-y-1">
            {NAV_ITEMS.map(({ icon: Icon, label }) => {
              const isActive = activeNav === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveNav(label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${isActive ? 'bg-accent/10 border border-accent/20 text-accent shadow-sm' : 'text-text-muted hover:bg-hover'}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text-muted'}`} />
                  {label}
                </button>
              );
            })}
          </div>

          <DepthBarChart />
          
          <ProcessList />
        </div>

        {/* ── Main: Impact View ── */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-border-subtle bg-deep flex-shrink-0">
            {METRIC_CARDS.map((m) => (
              <div
                key={m.label}
                className="relative rounded-xl p-4 overflow-hidden bg-elevated border border-border-subtle group hover:border-accent/30 transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -translate-y-1/2 translate-x-1/2 opacity-5 scale-0 group-hover:scale-100 transition-transform duration-500" style={{ background: m.color }} />
                
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-1">
                      {m.label}
                    </p>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-bold tracking-tight text-text-primary font-mono">
                         {m.value}
                       </span>
                       {m.pulse && <span className="w-2 h-2 rounded-full bg-node-file animate-pulse mb-1.5" />}
                    </div>
                    <p className="text-[11px] mt-1 text-text-muted">{m.sub}</p>
                  </div>
                  {m.label === 'Risk Level' && <ConicDonutChart />}
                </div>
              </div>
            ))}
          </div>

          {/* Graph Area */}
          <div className="flex-1 relative overflow-hidden bg-void">
            <div className="absolute inset-0 bg-dot-grid opacity-[0.05]" />
            
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                {GRAPH_NODES.map((n) => (
                  <filter key={`glow-${n.id}`} id={`glow-${n.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
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
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.4"
                    strokeDasharray={fn.ring ? '1.5,1.5' : undefined}
                  />
                );
              })}

              {/* Nodes */}
              {GRAPH_NODES.map((n) => (
                <g key={n.id} filter={`url(#glow-${n.id})`} className="cursor-pointer group">
                  <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}15`} stroke={n.color} strokeWidth="0.6" className="transition-all group-hover:stroke-white" />
                  <text x={n.x} y={n.y + n.r / 3.5} textAnchor="middle" fill={n.color} fontSize="2.8" fontWeight="900" fontFamily="Inter, sans-serif">
                    {n.label.charAt(0)}
                  </text>
                  <text x={n.x} y={n.y + n.r + 4} textAnchor="middle" fill="#52526b" fontSize="2.2" fontFamily="JetBrains Mono, monospace">
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Context Card */}
            <div className="absolute top-6 right-6 w-64 rounded-2xl bg-void/80 backdrop-blur-xl border border-node-file/30 shadow-2xl p-4 transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-node-file" />
                <span className="text-sm font-bold text-node-file uppercase tracking-tight">Critical Blast Radius</span>
              </div>
              <p className="text-[12px] leading-relaxed text-text-secondary mb-3">
                Analysis of <code className="px-1.5 py-0.5 rounded bg-accent/10 text-accent font-mono">AuthService.validate()</code> shows critical breaks in <span className="text-white font-bold">3 core flows</span>.
              </p>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-node-function/5 border border-node-function/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-node-function" />
                <span className="text-[10px] text-node-function font-semibold">Ready for verification scan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: MCP Console (Flow A-04) ── */}
      <div className="h-48 border-t border-border-subtle flex flex-col flex-shrink-0 bg-void">
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-border-subtle bg-surface/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">MCP Protocol Activity</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-text-muted">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-node-function" />
              <span>STITCH_SRV: CONNECTED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>GITNEXUS_MCP: RUNNING</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 font-mono text-[11px] selection:bg-accent/30 scrollbar-thin">
          {MCP_LOGS.map((l, i) => {
            const isCall = l.type === 'call';
            return (
              <div key={i} className="flex gap-4 group">
                <span className="w-16 flex-shrink-0 text-text-muted/50 select-none">{l.ts}</span>
                <div className="flex items-start gap-2">
                  <span className={`font-bold ${l.type === 'call' ? 'text-accent' : l.type === 'result' ? 'text-node-function' : l.type === 'warn' ? 'text-node-variable' : 'text-text-muted'}`}>
                    {l.type === 'call' ? 'λ' : l.type === 'result' ? '✓' : l.type === 'warn' ? '!' : '·'}
                  </span>
                  {isCall ? (
                    <div className="flex gap-2">
                      <span className="text-white font-bold">{l.tool}</span>
                      <span className="text-text-muted/80">
                         {l.args?.replace(/"([^"]+)"/g, '<span style="color:#f59e0b">"$1"</span>').replace(/:(\s*)(\w+)/g, ':$1<span style="color:#3b82f6">$2</span>')}
                      </span>
                    </div>
                  ) : (
                    <span className={l.type === 'warn' ? 'text-node-variable' : 'text-text-secondary italic'}>{l.text}</span>
                  )}
                </div>
              </div>
            );
          })}
          <div className="flex gap-4">
             <span className="w-16 opacity-0">.</span>
             <span className="w-2 h-4 bg-accent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
