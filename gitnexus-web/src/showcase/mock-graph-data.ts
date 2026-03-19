import { createKnowledgeGraph } from '../core/graph/graph';
import type { GraphNode, GraphRelationship, KnowledgeGraph } from '../core/graph/types';

export interface ShowcaseRiskMetadata {
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
  summary: string;
}

export interface ShowcaseNarrative {
  summary: string;
  tags: string[];
  provenance: string[];
  metadata: Array<{ label: string; value: string }>;
  risk: ShowcaseRiskMetadata;
}

export interface ShowcaseNodeInsight {
  node: GraphNode;
  narrative: ShowcaseNarrative;
  callers: GraphNode[];
  callees: GraphNode[];
  processes: Array<{ process: GraphNode; step: number }>;
  affectedNodeIds: string[];
}

export const SHOWCASE_DEFAULT_NODE_ID = 'function:runImpactAnalysis';

const nodes: GraphNode[] = [
  {
    id: 'project:gitnexus-web',
    label: 'Project',
    properties: { name: 'gitnexus-web', filePath: 'gitnexus-web' },
  },
  {
    id: 'folder:src/components',
    label: 'Folder',
    properties: { name: 'src/components', filePath: 'src/components' },
  },
  {
    id: 'file:GraphCanvas.tsx',
    label: 'File',
    properties: {
      name: 'GraphCanvas.tsx',
      filePath: 'src/components/GraphCanvas.tsx',
      language: 'TypeScript',
      startLine: 1,
      endLine: 329,
      description: 'Graph canvas shell for hover, click, and focus controls.',
    },
  },
  {
    id: 'file:NodeContextMenu.tsx',
    label: 'File',
    properties: {
      name: 'NodeContextMenu.tsx',
      filePath: 'src/components/NodeContextMenu.tsx',
      language: 'TypeScript',
      startLine: 1,
      endLine: 180,
      description: 'Context-menu surface for graph actions.',
    },
  },
  {
    id: 'file:NodeInspectorPanel.tsx',
    label: 'File',
    properties: {
      name: 'NodeInspectorPanel.tsx',
      filePath: 'src/components/NodeInspectorPanel.tsx',
      language: 'TypeScript',
      startLine: 1,
      endLine: 260,
      description: 'Inspector sidebar for node-level analysis metadata.',
    },
  },
  {
    id: 'function:handleNodeHover',
    label: 'Function',
    properties: {
      name: 'handleNodeHover',
      filePath: 'src/components/GraphCanvas.tsx',
      language: 'TypeScript',
      startLine: 63,
      endLine: 72,
      description: 'Updates preview state for the currently hovered node.',
    },
  },
  {
    id: 'function:handleNodeClick',
    label: 'Function',
    properties: {
      name: 'handleNodeClick',
      filePath: 'src/components/GraphCanvas.tsx',
      language: 'TypeScript',
      startLine: 54,
      endLine: 61,
      description: 'Selects a node and opens the inspector or code panel.',
    },
  },
  {
    id: 'function:runImpactAnalysis',
    label: 'Function',
    properties: {
      name: 'runImpactAnalysis',
      filePath: 'src/components/NodeContextMenu.tsx',
      language: 'TypeScript',
      startLine: 41,
      endLine: 96,
      description: 'Launches a focused impact-analysis workflow from the context menu.',
    },
  },
  {
    id: 'class:NodeInspectorPanel',
    label: 'Class',
    properties: {
      name: 'NodeInspectorPanel',
      filePath: 'src/components/NodeInspectorPanel.tsx',
      language: 'TypeScript',
      startLine: 1,
      endLine: 260,
      description: 'Sidebar model that groups node details, relations, and provenance.',
    },
  },
  {
    id: 'function:renderRelations',
    label: 'Function',
    properties: {
      name: 'renderRelations',
      filePath: 'src/components/NodeInspectorPanel.tsx',
      language: 'TypeScript',
      startLine: 122,
      endLine: 174,
      description: 'Renders caller, callee, and process sections inside the inspector.',
    },
  },
  {
    id: 'process:inspection-flow',
    label: 'Process',
    properties: {
      name: 'Inspection Flow',
      filePath: 'processes/inspection-flow',
      processType: 'cross_community',
      stepCount: 3,
      description: 'Node hover → select → inspect progression.',
    },
  },
  {
    id: 'process:impact-flow',
    label: 'Process',
    properties: {
      name: 'Impact Analysis Flow',
      filePath: 'processes/impact-analysis-flow',
      processType: 'cross_community',
      stepCount: 3,
      description: 'Context menu → impact analysis → blast radius review.',
    },
  },
];

const relationships: GraphRelationship[] = [
  { id: 'rel-1', sourceId: 'project:gitnexus-web', targetId: 'folder:src/components', type: 'CONTAINS', confidence: 1, reason: 'demo-hierarchy' },
  { id: 'rel-2', sourceId: 'folder:src/components', targetId: 'file:GraphCanvas.tsx', type: 'CONTAINS', confidence: 1, reason: 'demo-hierarchy' },
  { id: 'rel-3', sourceId: 'folder:src/components', targetId: 'file:NodeContextMenu.tsx', type: 'CONTAINS', confidence: 1, reason: 'demo-hierarchy' },
  { id: 'rel-4', sourceId: 'folder:src/components', targetId: 'file:NodeInspectorPanel.tsx', type: 'CONTAINS', confidence: 1, reason: 'demo-hierarchy' },
  { id: 'rel-5', sourceId: 'file:GraphCanvas.tsx', targetId: 'function:handleNodeHover', type: 'DEFINES', confidence: 1, reason: 'demo-defines' },
  { id: 'rel-6', sourceId: 'file:GraphCanvas.tsx', targetId: 'function:handleNodeClick', type: 'DEFINES', confidence: 1, reason: 'demo-defines' },
  { id: 'rel-7', sourceId: 'file:NodeContextMenu.tsx', targetId: 'function:runImpactAnalysis', type: 'DEFINES', confidence: 1, reason: 'demo-defines' },
  { id: 'rel-8', sourceId: 'file:NodeInspectorPanel.tsx', targetId: 'class:NodeInspectorPanel', type: 'DEFINES', confidence: 1, reason: 'demo-defines' },
  { id: 'rel-9', sourceId: 'file:NodeInspectorPanel.tsx', targetId: 'function:renderRelations', type: 'DEFINES', confidence: 1, reason: 'demo-defines' },
  { id: 'rel-10', sourceId: 'function:handleNodeClick', targetId: 'class:NodeInspectorPanel', type: 'CALLS', confidence: 0.93, reason: 'opens-inspector' },
  { id: 'rel-11', sourceId: 'function:runImpactAnalysis', targetId: 'function:renderRelations', type: 'CALLS', confidence: 0.91, reason: 'hydrates-relations' },
  { id: 'rel-12', sourceId: 'function:handleNodeHover', targetId: 'class:NodeInspectorPanel', type: 'CALLS', confidence: 0.82, reason: 'preview-metadata' },
  { id: 'rel-13', sourceId: 'function:handleNodeClick', targetId: 'process:inspection-flow', type: 'STEP_IN_PROCESS', confidence: 1, reason: 'demo-process', step: 2 },
  { id: 'rel-14', sourceId: 'function:handleNodeHover', targetId: 'process:inspection-flow', type: 'STEP_IN_PROCESS', confidence: 1, reason: 'demo-process', step: 1 },
  { id: 'rel-15', sourceId: 'function:renderRelations', targetId: 'process:inspection-flow', type: 'STEP_IN_PROCESS', confidence: 1, reason: 'demo-process', step: 3 },
  { id: 'rel-16', sourceId: 'function:runImpactAnalysis', targetId: 'process:impact-flow', type: 'STEP_IN_PROCESS', confidence: 1, reason: 'demo-process', step: 2 },
  { id: 'rel-17', sourceId: 'function:handleNodeClick', targetId: 'process:impact-flow', type: 'STEP_IN_PROCESS', confidence: 1, reason: 'demo-process', step: 1 },
  { id: 'rel-18', sourceId: 'function:renderRelations', targetId: 'process:impact-flow', type: 'STEP_IN_PROCESS', confidence: 1, reason: 'demo-process', step: 3 },
];

const narratives: Record<string, ShowcaseNarrative> = {
  'function:handleNodeHover': {
    summary: 'Lightweight preview logic used to keep hover information fast and non-disruptive.',
    tags: ['hover-preview', 'progressive-disclosure', 'ux'],
    provenance: ['Mocked from the GitNexus Web interaction spec.', 'Used to explain preview-first onboarding behavior.'],
    metadata: [
      { label: 'Surface', value: 'Graph canvas hover card' },
      { label: 'Intent', value: 'Preview only, not full inspection' },
    ],
    risk: { level: 'LOW', score: 0.22, summary: 'Hover preview reads metadata but does not mutate graph state.' },
  },
  'function:handleNodeClick': {
    summary: 'Primary click action that opens the inspector sidebar and establishes inspection context.',
    tags: ['selection', 'sidebar-open', 'inspection'],
    provenance: ['Mapped from the click-to-inspector UX flow.', 'Represents the main node selection entrypoint.'],
    metadata: [
      { label: 'Surface', value: 'Primary click interaction' },
      { label: 'Output', value: 'Inspector sidebar and focus state' },
    ],
    risk: { level: 'MEDIUM', score: 0.48, summary: 'Selection affects downstream context, panel content, and highlight scope.' },
  },
  'function:runImpactAnalysis': {
    summary: 'Context-menu action that simulates impact analysis and highlights a blast radius around the target node.',
    tags: ['impact-analysis', 'context-menu', 'blast-radius'],
    provenance: ['Derived from the requested second-layer GitNexus integration pattern.', 'Configured as demo-only analysis with curated relationships.'],
    metadata: [
      { label: 'Surface', value: 'Right-click context menu' },
      { label: 'Output', value: 'Risk metadata + highlighted relations' },
    ],
    risk: { level: 'HIGH', score: 0.81, summary: 'Impact analysis exposes direct callers, callees, and process touchpoints.' },
  },
  'class:NodeInspectorPanel': {
    summary: 'Pinned sidebar pattern that holds node summary, risk, provenance, and relationship context.',
    tags: ['inspector', 'sidebar', 'pinning'],
    provenance: ['Aligned with the inspector-first graph workflow.', 'Used for onboarding empty-state and persistent review.'],
    metadata: [
      { label: 'Surface', value: 'Inspector sidebar' },
      { label: 'Behavior', value: 'Supports pin / unpin' },
    ],
    risk: { level: 'LOW', score: 0.29, summary: 'Inspector is informational and remains bounded to selected node context.' },
  },
  'function:renderRelations': {
    summary: 'Displays callers, callees, and process steps to explain why a node matters in the graph.',
    tags: ['relations', 'callers', 'callees', 'processes'],
    provenance: ['Designed to visualize GitNexus relationship depth in a readable panel.', 'Carries mock process metadata for onboarding.'],
    metadata: [
      { label: 'Surface', value: 'Inspector relation sections' },
      { label: 'Focus', value: 'Call graph + process context' },
    ],
    risk: { level: 'MEDIUM', score: 0.53, summary: 'Relation rendering widens the visible blast radius for the inspected node.' },
  },
};

const getNodeById = (graph: KnowledgeGraph, nodeId: string): GraphNode | undefined => {
  return graph.nodes.find((node) => node.id === nodeId);
};

export const createShowcaseGraph = (): KnowledgeGraph => {
  const graph = createKnowledgeGraph();
  nodes.forEach((node) => graph.addNode(node));
  relationships.forEach((relationship) => graph.addRelationship(relationship));
  return graph;
};

export const getShowcaseInsight = (graph: KnowledgeGraph, nodeId: string): ShowcaseNodeInsight | null => {
  const node = getNodeById(graph, nodeId);
  if (!node) return null;

  const callers = graph.relationships
    .filter((relationship) => relationship.type === 'CALLS' && relationship.targetId === nodeId)
    .map((relationship) => getNodeById(graph, relationship.sourceId))
    .filter(Boolean) as GraphNode[];

  const callees = graph.relationships
    .filter((relationship) => relationship.type === 'CALLS' && relationship.sourceId === nodeId)
    .map((relationship) => getNodeById(graph, relationship.targetId))
    .filter(Boolean) as GraphNode[];

  const processes = graph.relationships
    .filter((relationship) => relationship.type === 'STEP_IN_PROCESS' && relationship.sourceId === nodeId)
    .map((relationship) => ({
      process: getNodeById(graph, relationship.targetId),
      step: relationship.step ?? 0,
    }))
    .filter((item): item is { process: GraphNode; step: number } => Boolean(item.process));

  const affectedNodeIds = Array.from(
    new Set<string>([
      nodeId,
      ...callers.map((item) => item.id),
      ...callees.map((item) => item.id),
      ...processes.map((item) => item.process.id),
    ]),
  );

  return {
    node,
    narrative: narratives[nodeId] ?? {
      summary: node.properties.description ?? 'Demo node used to explain the GitNexus interaction model.',
      tags: ['demo-node'],
      provenance: ['Generated from showcase graph metadata.'],
      metadata: [
        { label: 'Label', value: node.label },
        { label: 'Path', value: node.properties.filePath },
      ],
      risk: { level: 'LOW', score: 0.18, summary: 'No additional curated impact metadata is attached to this node.' },
    },
    callers,
    callees,
    processes,
    affectedNodeIds,
  };
};