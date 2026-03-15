import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  Search, 
  RefreshCw, 
  Activity, 
  Cpu, 
  Globe, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

const QUICK_ACTIONS = [
  { id: 'analyze', icon: Search, label: 'Analyze Codebase', desc: 'Identify patterns & bottlenecks', accent: '#7c3aed' },
  { id: 'security', icon: Shield, label: 'Security Scan', desc: 'Check for OWASP vulnerabilities', accent: '#ef4444' },
  { id: 'impact', icon: Zap, label: 'Impact Analysis', desc: 'Pre-check change blast radius', accent: '#f59e0b' },
  { id: 'sync', icon: RefreshCw, label: 'Sync Design', desc: 'Pull latest tokens from Figma', accent: '#10b981' },
];

const AGENT_STATUS = [
  { name: 'Gemini 1.5 Pro', role: 'UI Architect', status: 'Thinking', progress: 65, color: '#7c3aed' },
  { name: 'Claude 3.5 Sonnet', role: 'System Core', status: 'Idle', progress: 0, color: '#ec4899' },
  { name: 'Grok 4', role: 'Logic Validator', status: 'Analyzing', progress: 88, color: '#10b981' },
];

export const DashboardView: React.FC = () => {
  const { projectName, setHubTab } = useAppState();
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'reconnecting'>('connected');

  // Simulate progress for visual feedback
  const [progressVals, setProgressVals] = useState(AGENT_STATUS.map(a => a.progress));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressVals(prev => prev.map(v => (v > 0 ? (v + Math.random() * 2) % 100 : 0)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col p-8">
      {/* ── Background Elements (Flow B-05) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} />
        
        {/* Blur Blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px]" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-8 max-w-6xl mx-auto w-full">
        {/* ── Header Area ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              AI Hub <span className="text-text-muted font-normal">/ {projectName || 'Workspace'}</span>
            </h1>
            <p className="text-text-secondary text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              Everything is running smoothly. 5 active processes.
            </p>
          </div>

          {/* MCP Status Lamp (Flow B-06) */}
          <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-surface/50 border border-border-subtle backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-node-function animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-node-function blur-sm animate-ping" />
              </div>
              <span className="text-xs font-semibold text-text-primary tracking-wide">MCP CONNECTED</span>
            </div>
            <div className="h-4 w-px bg-border-subtle" />
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
              <Globe className="w-3 h-3" />
              us-west-2
            </div>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Actions (Flow B-06) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    if (action.id === 'impact') setHubTab('impact');
                    else if (action.id === 'analyze') setHubTab('tasks');
                  }}
                  className="group relative p-5 rounded-3xl border border-border-subtle bg-elevated/40 backdrop-blur-sm hover:bg-hover/60 transition-all duration-300 text-left overflow-hidden"
                >
                  {/* Hover Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: action.accent }} />
                  
                  <div className="mb-4 w-10 h-10 rounded-xl flex items-center justify-center bg-surface border border-border-subtle group-hover:border-white/20 transition-colors">
                    <action.icon className="w-5 h-5" style={{ color: action.accent }} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{action.label}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{action.desc}</p>
                  
                  <ArrowRight className="absolute bottom-5 right-5 w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* AI Agent Stream (Flow B-06) */}
            <div className="mt-4 flex flex-col gap-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                AI Agent Pipeline
              </h2>
              <div className="space-y-3">
                {AGENT_STATUS.map((agent, i) => (
                  <div 
                    key={agent.name} 
                    className="p-4 rounded-2xl bg-deep border border-border-subtle flex items-center gap-5"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center relative flex-shrink-0" style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}30` }}>
                       <Sparkles className="w-5 h-5" style={{ color: agent.color }} />
                       {agent.status === 'Thinking' && (
                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-node-function rounded-full border-2 border-deep animate-bounce" />
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-white truncate">{agent.name}</h4>
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{agent.role}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-1000 ease-out" 
                            style={{ 
                              width: `${progressVals[i]}%`, 
                              background: `linear-gradient(90deg, ${agent.color}80, ${agent.color})` 
                            }} 
                          />
                        </div>
                        <span className="text-[10px] font-mono text-text-muted min-w-[30px]">{Math.round(progressVals[i])}%</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full border border-border-default text-[10px] font-semibold text-text-secondary">
                      {agent.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Statistics & Status */}
          <div className="flex flex-col gap-8">
            <div className="p-6 rounded-3xl border border-border-subtle bg-deep bg-gradient-to-b from-surface/20 to-transparent">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-6">Execution Summary</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-node-function" />
                    <span className="text-sm text-text-secondary">Build Status</span>
                  </div>
                  <span className="text-xs font-mono text-node-function">PASSING</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-node-variable" />
                    <span className="text-sm text-text-secondary">Pending Issues</span>
                  </div>
                  <span className="text-xs font-mono text-node-variable">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-accent" />
                    <span className="text-sm text-text-secondary">Cycle Time</span>
                  </div>
                  <span className="text-xs font-mono text-white">4.2m</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/10">
                <p className="text-[11px] text-accent font-medium uppercase tracking-wider mb-2">Pro Tip</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Run <code className="text-accent font-mono">gitnexus analyze</code> to refresh your index after large refactors.
                </p>
              </div>
            </div>

            {/* System Health */}
            <div className="p-6 rounded-3xl border border-border-subtle bg-elevated/20">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-6">System Health</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Memory Usage</span>
                  <span className="text-text-primary">2.4 GB / 8 GB</span>
                </div>
                <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[30%]" />
                </div>
                
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-text-muted">Embedding Queue</span>
                  <span className="text-text-primary">0 pending</span>
                </div>
                <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-node-function w-[0%]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
