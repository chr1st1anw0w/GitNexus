import { useEffect, useMemo, useReducer, useState } from 'react';
import {
  AlertTriangle,
  Database,
  Eye,
  EyeOff,
  Focus,
  Maximize2,
  MousePointerClick,
  PanelRight,
  Pin,
  PinOff,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Tags,
  Workflow,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useSigma } from '../hooks/useSigma';
import { knowledgeGraphToGraphology } from '../lib/graph-adapter';
import { createShowcaseGraph, getShowcaseInsight, SHOWCASE_DEFAULT_NODE_ID } from './mock-graph-data';
import { demoReducer, initialDemoState, type DemoFieldKey } from './demo-state';
import { createKnowledgeGraph } from '../core/graph/graph';
import type { KnowledgeGraph } from '../core/graph/types';

// Load GitNexus graph data
let gitnexusGraphData: any = null;
const loadGitNexusData = async () => {
  if (!gitnexusGraphData) {
    try {
      const response = await fetch('./gitnexus-graph-data.json');
      gitnexusGraphData = await response.json();
    } catch (e) {
      console.warn('Failed to load GitNexus graph data:', e);
      gitnexusGraphData = { nodes: [], edges: [] };
    }
  }
  return gitnexusGraphData;
};

const createGitNexusGraph = (data: any): KnowledgeGraph => {
  const kg = createKnowledgeGraph();

  data.nodes?.forEach((n: any) => {
    kg.addNode({
      id: n.id,
      label: n.label,
      properties: {
        name: n.name,
        filePath: n.filePath,
        description: n.description,
        risk: n.risk || 'LOW',
        confidence: n.confidence || 0.8,
        communities: n.communities || [],
      },
    });
  });

  data.edges?.forEach((e: any) => {
    kg.addRelationship({
      id: `${e.source}-${e.type}-${e.target}`,
      sourceId: e.source,
      targetId: e.target,
      type: e.type,
      properties: {
        confidence: e.confidence || 0.8,
        reason: e.reason || '',
      },
    });
  });

  return kg;
};

const FIELD_LABELS: Record<DemoFieldKey, string> = {
  tags: 'Tags',
  risk: 'Risk',
  relations: 'Relations',
  metadata: 'Metadata',
};

const riskTone = (level: 'LOW' | 'MEDIUM' | 'HIGH') => {
  if (level === 'HIGH') return 'text-rose-300 border-rose-500/30 bg-rose-500/10';
  if (level === 'MEDIUM') return 'text-amber-300 border-amber-500/30 bg-amber-500/10';
  return 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10';
};

export const InteractiveGraphDemo = () => {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);

  // Build graph based on data mode
  const [graph, setGraphData] = useState<KnowledgeGraph>(() => createShowcaseGraph());

  useEffect(() => {
    if (state.dataMode === 'gitnexus') {
      loadGitNexusData().then((data) => {
        const newGraph = createGitNexusGraph(data);
        setGraphData(newGraph);
      });
    } else {
      setGraphData(createShowcaseGraph());
    }
  }, [state.dataMode]);

  const sigmaGraph = useMemo(() => knowledgeGraphToGraphology(graph), [graph]);

  const {
    containerRef,
    setGraph: setSigmaGraph,
    zoomIn,
    zoomOut,
    resetZoom,
    focusNode,
    selectedNode: sigmaSelectedNodeId,
    setSelectedNode,
    isLayoutRunning,
    startLayout,
    stopLayout,
  } = useSigma({
    onNodeClick: (nodeId) => {
      const insight = getShowcaseInsight(graph, nodeId);
      dispatch({
        type: 'SELECT_NODE',
        nodeId,
        label: insight?.node.properties.name,
      });
    },
    onNodeHover: (nodeId) => {
      const insight = nodeId ? getShowcaseInsight(graph, nodeId) : null;
      dispatch({
        type: 'HOVER_NODE',
        nodeId,
        label: insight?.node.properties.name,
      });
    },
    onStageClick: () => {
      dispatch({ type: 'CLEAR_SELECTION' });
    },
    highlightedNodeIds: state.highlightedNodeIds,
    blastRadiusNodeIds: state.blastRadiusNodeIds,
  });

  useEffect(() => {
    setSigmaGraph(sigmaGraph);
  }, [setSigmaGraph, sigmaGraph]);

  useEffect(() => {
    const handleGlobalPointer = () => dispatch({ type: 'CLOSE_CONTEXT_MENU' });
    window.addEventListener('pointerdown', handleGlobalPointer);
    return () => window.removeEventListener('pointerdown', handleGlobalPointer);
  }, []);

  const hoveredInsight = useMemo(() => {
    if (!state.hoveredNodeId || !state.previewEnabled) return null;
    if (state.dataMode === 'live') return null; // No preview in live mode
    return getShowcaseInsight(graph, state.hoveredNodeId);
  }, [graph, state.hoveredNodeId, state.dataMode, state.previewEnabled]);

  const selectedInsight = useMemo(() => {
    if (!state.selectedNodeId) return null;
    return getShowcaseInsight(graph, state.selectedNodeId);
  }, [graph, state.selectedNodeId]);

  const openInspectorFor = (nodeId: string, focus = false) => {
    const insight = getShowcaseInsight(graph, nodeId);
    if (!insight) return;
    dispatch({ type: 'SELECT_NODE', nodeId, label: insight.node.properties.name });
    setSelectedNode(nodeId);
    if (focus) focusNode(nodeId);
  };

  const runImpactFor = (nodeId: string) => {
    const insight = getShowcaseInsight(graph, nodeId);
    if (!insight) return;
    dispatch({
      type: 'RUN_IMPACT',
      nodeId,
      highlightedNodeIds: insight.processes.map((item) => item.process.id),
      blastRadiusNodeIds: insight.affectedNodeIds,
      label: insight.node.properties.name,
    });
    setSelectedNode(nodeId);
    focusNode(nodeId);
  };

  // Select default node based on data mode
  const defaultNodeId = useMemo(() => {
    if (state.dataMode === 'gitnexus' && graph.nodes.length > 0) {
      return graph.nodes[0].id; // First node in GitNexus data
    }
    return SHOWCASE_DEFAULT_NODE_ID;
  }, [state.dataMode, graph.nodes]);

  const selectedOrDefaultInsight = selectedInsight ?? getShowcaseInsight(graph, defaultNodeId);
  const showSidebar = state.sidebarOpen || state.sidebarPinned || Boolean(state.selectedNodeId);

  return (
    <div className="min-h-screen bg-background-deep text-text-primary">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-6">
        <section className="rounded-3xl border border-border-subtle bg-deep/80 p-6 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                GitNexus Web Interactive Demo
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white">Graph interaction showcase for onboarding, demos, and empty-state exploration</h1>
              <p className="text-sm leading-6 text-text-secondary">
                This standalone page demonstrates the GitNexus Web interaction model even when no user is signed in,
                no backend is connected, and no repository graph has been imported yet.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => dispatch({ type: 'SET_MODE', mode: 'demo' })}
                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                  state.dataMode === 'demo'
                    ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100'
                    : 'border-border-subtle bg-surface/60 text-text-secondary hover:border-cyan-400/20 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wide">Demo Mode</div>
                <div className="mt-1 text-sm">Mock graph · all interactions enabled</div>
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_MODE', mode: 'gitnexus' })}
                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                  state.dataMode === 'gitnexus'
                    ? 'border-purple-400/40 bg-purple-500/10 text-purple-100'
                    : 'border-border-subtle bg-surface/60 text-text-secondary hover:border-purple-400/20 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wide">GitNexus Data</div>
                <div className="mt-1 text-sm">Real .gitnexus/ data · live graph</div>
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_MODE', mode: 'live' })}
                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                  state.dataMode === 'live'
                    ? 'border-amber-400/40 bg-amber-500/10 text-amber-100'
                    : 'border-border-subtle bg-surface/60 text-text-secondary hover:border-amber-400/20 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wide">Live Data Mode</div>
                <div className="mt-1 text-sm">Future backend · empty state</div>
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-3xl border border-border-subtle bg-deep/80 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">Demo scope</h2>
              <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                <li className="flex gap-3"><MousePointerClick className="mt-0.5 h-4 w-4 text-accent" />Hover nodes to preview curated metadata.</li>
                <li className="flex gap-3"><PanelRight className="mt-0.5 h-4 w-4 text-accent" />Click nodes to open the inspector sidebar.</li>
                <li className="flex gap-3"><ShieldAlert className="mt-0.5 h-4 w-4 text-accent" />Right-click hovered nodes to run mock impact analysis.</li>
                <li className="flex gap-3"><Pin className="mt-0.5 h-4 w-4 text-accent" />Pin the sidebar to preserve context across deselection.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border-subtle bg-deep/80 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">Display controls</h2>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_PREVIEW' })}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    state.previewEnabled
                      ? 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200'
                      : 'border-border-subtle bg-surface/50 text-text-muted'
                  }`}
                >
                  {state.previewEnabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  Preview {state.previewEnabled ? 'On' : 'Off'}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(Object.keys(FIELD_LABELS) as DemoFieldKey[]).map((field) => {
                  const enabled = state.visibleFields[field];
                  return (
                    <button
                      key={field}
                      onClick={() => dispatch({ type: 'TOGGLE_FIELD', field })}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        enabled
                          ? 'border-accent/30 bg-accent/10 text-accent'
                          : 'border-border-subtle bg-surface/50 text-text-muted'
                      }`}
                    >
                      {FIELD_LABELS[field]}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-border-subtle bg-surface/40 p-4 text-sm text-text-secondary">
                <div className="font-medium text-white">Status copy</div>
                <div className="mt-2">{state.dataMode === 'demo'
                  ? 'Demo Mode · Mock graph loaded. This page demonstrates interaction behavior, not repository-specific analysis.'
                  : 'Live Data Mode · Sign-in, backend connectivity, and imported repository data are required before real analysis can appear here.'}</div>
              </div>
            </div>

            <div className="rounded-3xl border border-border-subtle bg-deep/80 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">Interaction log</h2>
              <div className="mt-4 space-y-2">
                {state.eventLog.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-border-subtle bg-surface/40 px-3 py-2 text-sm text-text-secondary">
                    {event.message}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className={`grid gap-6 ${showSidebar ? '2xl:grid-cols-[minmax(0,1fr)_360px]' : 'grid-cols-1'}`}>
            <div className="rounded-3xl border border-border-subtle bg-deep/80 p-4">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">Explorer canvas</div>
                  <div className="mt-1 text-sm text-text-secondary">
                    Hover for preview, click to inspect, and right-click a hovered node to open the context menu.
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={zoomIn} className="rounded-xl border border-border-subtle bg-surface/50 p-2 text-text-secondary hover:text-white"><ZoomIn className="h-4 w-4" /></button>
                  <button onClick={zoomOut} className="rounded-xl border border-border-subtle bg-surface/50 p-2 text-text-secondary hover:text-white"><ZoomOut className="h-4 w-4" /></button>
                  <button onClick={resetZoom} className="rounded-xl border border-border-subtle bg-surface/50 p-2 text-text-secondary hover:text-white"><Maximize2 className="h-4 w-4" /></button>
                  <button
                    onClick={() => (isLayoutRunning ? stopLayout() : startLayout())}
                    className={`rounded-xl border p-2 ${isLayoutRunning ? 'border-accent/40 bg-accent/10 text-accent' : 'border-border-subtle bg-surface/50 text-text-secondary hover:text-white'}`}
                  >
                    <Play className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (selectedOrDefaultInsight) openInspectorFor(selectedOrDefaultInsight.node.id, true);
                    }}
                    className="rounded-xl border border-border-subtle bg-surface/50 p-2 text-text-secondary hover:text-white"
                  >
                    <Focus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'CLEAR_HIGHLIGHTS' })}
                    className="rounded-xl border border-border-subtle bg-surface/50 p-2 text-text-secondary hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative h-[720px] overflow-hidden rounded-3xl border border-border-subtle bg-void">
                {state.dataMode === 'demo' ? (
                  <div
                    className="absolute inset-0"
                    onContextMenu={(event) => {
                      if (!state.hoveredNodeId) return;
                      event.preventDefault();
                      const insight = getShowcaseInsight(graph, state.hoveredNodeId);
                      dispatch({
                        type: 'OPEN_CONTEXT_MENU',
                        nodeId: state.hoveredNodeId,
                        x: event.clientX,
                        y: event.clientY,
                        label: insight?.node.properties.name,
                      });
                    }}
                  >
                    <div ref={containerRef} className="h-full w-full" />

                    {!sigmaSelectedNodeId && !state.sidebarPinned && (
                      <div className="pointer-events-none absolute bottom-4 left-4 max-w-sm rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 backdrop-blur-sm">
                        Click any node to open the inspector sidebar. Right-click a hovered node to preview actions such as impact analysis.
                      </div>
                    )}

                    {hoveredInsight && hoveredInsight.node.id !== state.selectedNodeId && (
                      <div className="absolute left-4 top-4 z-20 w-80 rounded-2xl border border-cyan-400/20 bg-deep/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Hover preview</div>
                            <div className="mt-1 text-lg font-semibold text-white">{hoveredInsight.node.properties.name}</div>
                            <div className="text-xs text-text-muted">{hoveredInsight.node.label}</div>
                          </div>
                          <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase text-cyan-200">Preview</div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-text-secondary">{hoveredInsight.narrative.summary}</p>
                        {state.visibleFields.tags && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {hoveredInsight.narrative.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-border-subtle bg-surface/50 px-2.5 py-1 text-xs text-text-secondary">{tag}</span>
                            ))}
                          </div>
                        )}
                        {state.visibleFields.risk && (
                          <div className={`mt-3 rounded-2xl border px-3 py-2 text-xs ${riskTone(hoveredInsight.narrative.risk.level)}`}>
                            Risk {hoveredInsight.narrative.risk.level} · {Math.round(hoveredInsight.narrative.risk.score * 100)}%
                          </div>
                        )}
                      </div>
                    )}

                    {state.contextMenu && (
                      <div
                        className="fixed z-[60] w-64 rounded-2xl border border-border-subtle bg-deep/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-md"
                        style={{ left: state.contextMenu.x, top: state.contextMenu.y }}
                        onPointerDown={(event) => event.stopPropagation()}
                      >
                        <button
                          onClick={() => openInspectorFor(state.contextMenu!.nodeId)}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface/60 hover:text-white"
                        >
                          Open inspector
                          <PanelRight className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            openInspectorFor(state.contextMenu!.nodeId);
                            dispatch({ type: 'TOGGLE_PIN' });
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface/60 hover:text-white"
                        >
                          {state.sidebarPinned ? 'Unpin sidebar' : 'Pin sidebar'}
                          {state.sidebarPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => runImpactFor(state.contextMenu!.nodeId)}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface/60 hover:text-white"
                        >
                          Run impact analysis
                          <ShieldAlert className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            focusNode(state.contextMenu!.nodeId);
                            dispatch({ type: 'CLOSE_CONTEXT_MENU' });
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface/60 hover:text-white"
                        >
                          Focus node
                          <Focus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="max-w-lg rounded-3xl border border-amber-400/20 bg-amber-500/10 p-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10 text-amber-200">
                        <Database className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">Live data mode is ready for future integration</h3>
                      <p className="mt-3 text-sm leading-6 text-text-secondary">
                        Sign-in, backend connectivity, and an imported repository are required before real GitNexus graph
                        data can appear here. Switch back to Demo Mode to continue exploring the interaction model now.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showSidebar && selectedOrDefaultInsight && (
              <aside className="rounded-3xl border border-border-subtle bg-deep/80 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Inspector sidebar</div>
                    <div className="mt-1 text-xl font-semibold text-white">{selectedOrDefaultInsight.node.properties.name}</div>
                    <div className="text-sm text-text-secondary">{selectedOrDefaultInsight.node.label}</div>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_PIN' })}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                      state.sidebarPinned
                        ? 'border-accent/30 bg-accent/10 text-accent'
                        : 'border-border-subtle bg-surface/50 text-text-muted hover:text-white'
                    }`}
                  >
                    {state.sidebarPinned ? 'Pinned' : 'Pin sidebar'}
                  </button>
                </div>

                <div className="mt-4 rounded-2xl border border-border-subtle bg-surface/40 p-4 text-sm leading-6 text-text-secondary">
                  {selectedOrDefaultInsight.narrative.summary}
                </div>

                {state.visibleFields.tags && (
                  <section className="mt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted"><Tags className="h-3.5 w-3.5" />Tags</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedOrDefaultInsight.narrative.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border-subtle bg-surface/50 px-2.5 py-1 text-xs text-text-secondary">{tag}</span>
                      ))}
                    </div>
                  </section>
                )}

                {state.visibleFields.risk && (
                  <section className="mt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted"><AlertTriangle className="h-3.5 w-3.5" />Risk & provenance</div>
                    <div className={`mt-3 rounded-2xl border p-4 ${riskTone(selectedOrDefaultInsight.narrative.risk.level)}`}>
                      <div className="text-sm font-semibold">{selectedOrDefaultInsight.narrative.risk.level} risk · {Math.round(selectedOrDefaultInsight.narrative.risk.score * 100)}%</div>
                      <div className="mt-2 text-sm leading-6">{selectedOrDefaultInsight.narrative.risk.summary}</div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {selectedOrDefaultInsight.narrative.provenance.map((item) => (
                        <div key={item} className="rounded-2xl border border-border-subtle bg-surface/40 px-3 py-2 text-sm text-text-secondary">{item}</div>
                      ))}
                    </div>
                  </section>
                )}

                {state.visibleFields.relations && (
                  <section className="mt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted"><Workflow className="h-3.5 w-3.5" />Relations</div>
                    <div className="mt-3 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                      <div className="rounded-2xl border border-border-subtle bg-surface/40 p-3">
                        <div className="text-xs uppercase tracking-wide text-text-muted">Callers</div>
                        <div className="mt-2 space-y-2 text-sm text-text-secondary">
                          {selectedOrDefaultInsight.callers.length > 0 ? selectedOrDefaultInsight.callers.map((node) => (
                            <button key={node.id} onClick={() => openInspectorFor(node.id)} className="block w-full rounded-xl bg-surface/50 px-3 py-2 text-left hover:text-white">
                              {node.properties.name}
                            </button>
                          )) : <div>No direct callers in this demo graph.</div>}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border-subtle bg-surface/40 p-3">
                        <div className="text-xs uppercase tracking-wide text-text-muted">Callees</div>
                        <div className="mt-2 space-y-2 text-sm text-text-secondary">
                          {selectedOrDefaultInsight.callees.length > 0 ? selectedOrDefaultInsight.callees.map((node) => (
                            <button key={node.id} onClick={() => openInspectorFor(node.id)} className="block w-full rounded-xl bg-surface/50 px-3 py-2 text-left hover:text-white">
                              {node.properties.name}
                            </button>
                          )) : <div>No direct callees in this demo graph.</div>}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border-subtle bg-surface/40 p-3">
                        <div className="text-xs uppercase tracking-wide text-text-muted">Processes</div>
                        <div className="mt-2 space-y-2 text-sm text-text-secondary">
                          {selectedOrDefaultInsight.processes.length > 0 ? selectedOrDefaultInsight.processes.map(({ process, step }) => (
                            <div key={`${process.id}-${step}`} className="rounded-xl bg-surface/50 px-3 py-2">
                              Step {step} · {process.properties.name}
                            </div>
                          )) : <div>No process metadata for this node.</div>}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {state.visibleFields.metadata && (
                  <section className="mt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted"><Database className="h-3.5 w-3.5" />Metadata</div>
                    <div className="mt-3 space-y-2">
                      <div className="rounded-2xl border border-border-subtle bg-surface/40 px-3 py-2 text-sm text-text-secondary">
                        Path · {selectedOrDefaultInsight.node.properties.filePath}
                      </div>
                      {selectedOrDefaultInsight.narrative.metadata.map((item) => (
                        <div key={`${item.label}-${item.value}`} className="rounded-2xl border border-border-subtle bg-surface/40 px-3 py-2 text-sm text-text-secondary">
                          {item.label} · {item.value}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                  <div className="font-semibold">Demo note</div>
                  <div className="mt-2 leading-6">
                    Impact analysis in this page is simulated from curated demo relationships. Risk, provenance,
                    callers, callees, and process steps are illustrative and not tied to a live repository.
                  </div>
                  <button
                    onClick={() => runImpactFor(selectedOrDefaultInsight.node.id)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-100"
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Run impact analysis
                  </button>
                </section>
              </aside>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};