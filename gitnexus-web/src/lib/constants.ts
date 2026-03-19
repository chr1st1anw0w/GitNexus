import { NodeLabel } from '../core/graph/types';

// Node colors by type - slightly muted for less visual noise
export const NODE_COLORS: Record<NodeLabel, string> = {
  Project: '#a855f7',    // Purple - prominent
  Package: '#8b5cf6',    // Violet
  Module: '#7c3aed',     // Violet darker
  Folder: '#6366f1',     // Indigo
  File: '#3b82f6',       // Blue
  Class: '#f59e0b',      // Amber - stands out
  Function: '#10b981',   // Emerald
  Method: '#14b8a6',     // Teal
  Variable: '#64748b',   // Slate - muted (less important)
  Interface: '#ec4899',  // Pink
  Enum: '#f97316',       // Orange
  Decorator: '#eab308',  // Yellow
  Import: '#475569',     // Slate darker - very muted
  Type: '#a78bfa',       // Violet light
  CodeElement: '#64748b', // Slate - muted
  Community: '#818cf8',  // Indigo light - cluster indicator
  Process: '#f43f5e',    // Rose - execution flow indicator
};

// Node sizes by type - clear visual hierarchy with dramatic size differences
// Structural nodes are MUCH larger to make hierarchy obvious
export const NODE_SIZES: Record<NodeLabel, number> = {
  Project: 20,     // Largest - root of everything
  Package: 16,     // Major structural element
  Module: 13,      // Important container
  Folder: 10,      // Structural - clearly bigger than files
  File: 6,         // Common element - smaller than folders
  Class: 8,        // Important code structure
  Function: 4,     // Common code element - small
  Method: 3,       // Smaller than function
  Variable: 2,     // Tiny - leaf node
  Interface: 7,    // Important type definition
  Enum: 5,         // Type definition
  Decorator: 2,    // Tiny modifier
  Import: 1.5,     // Very small - usually hidden anyway
  Type: 3,         // Type alias - small
  CodeElement: 2,  // Generic small
  Community: 0,    // Hidden by default - metadata node
  Process: 0,      // Hidden by default - metadata node
};

// Community color palette for cluster-based coloring
export const COMMUNITY_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#d946ef', // fuchsia
  '#ec4899', // pink
  '#f43f5e', // rose
  '#14b8a6', // teal
  '#84cc16', // lime
];

export const getCommunityColor = (communityIndex: number): string => {
  return COMMUNITY_COLORS[communityIndex % COMMUNITY_COLORS.length];
};

// Labels to show by default (hide imports and variables by default as they clutter)
export const DEFAULT_VISIBLE_LABELS: NodeLabel[] = [
  'Project',
  'Package',
  'Module',
  'Folder',
  'File',
  'Class',
  'Function',
  'Method',
  'Interface',
  'Enum',
  'Type',
];

// All filterable labels
export const FILTERABLE_LABELS: NodeLabel[] = [
  'Folder',
  'File',
  'Class',
  'Function',
  'Method',
  'Variable',
  'Interface',
  'Import',
];

// Edge/Relation types — covers all RelationshipType from core/graph/types
export type EdgeType =
  | 'CONTAINS'
  | 'DEFINES'
  | 'IMPORTS'
  | 'CALLS'
  | 'EXTENDS'
  | 'IMPLEMENTS'
  | 'INHERITS'
  | 'OVERRIDES'
  | 'USES'
  | 'HAS_METHOD'
  | 'DECORATES'
  | 'REFERENCES'
  | 'MEMBER_OF'
  | 'STEP_IN_PROCESS';

export const ALL_EDGE_TYPES: EdgeType[] = [
  'CONTAINS',
  'DEFINES',
  'IMPORTS',
  'CALLS',
  'EXTENDS',
  'IMPLEMENTS',
  'INHERITS',
  'OVERRIDES',
  'USES',
  'HAS_METHOD',
  'DECORATES',
  'REFERENCES',
  'MEMBER_OF',
  'STEP_IN_PROCESS',
];

// Default visible edges — hide structural noise (MEMBER_OF, STEP_IN_PROCESS)
export const DEFAULT_VISIBLE_EDGES: EdgeType[] = [
  'CONTAINS',
  'DEFINES',
  'IMPORTS',
  'CALLS',
  'EXTENDS',
  'IMPLEMENTS',
  'INHERITS',
  'OVERRIDES',
  'USES',
  'HAS_METHOD',
  'DECORATES',
  'REFERENCES',
];

// Edge display info for UI — each type has a distinct color
export const EDGE_INFO: Record<EdgeType, { color: string; label: string }> = {
  // Structural
  CONTAINS:         { color: '#2d5a3d', label: 'Contains' },
  DEFINES:          { color: '#0e7490', label: 'Defines' },
  // Dependencies
  IMPORTS:          { color: '#22c55e', label: 'Imports' },
  // Call graph
  CALLS:            { color: '#6366f1', label: 'Calls' },
  // OOP / Type relationships
  EXTENDS:          { color: '#f59e0b', label: 'Extends' },
  IMPLEMENTS:       { color: '#06b6d4', label: 'Implements' },
  INHERITS:         { color: '#f59e0b', label: 'Inherits' },
  OVERRIDES:        { color: '#fb923c', label: 'Overrides' },
  // Usage
  USES:             { color: '#8b5cf6', label: 'Uses' },
  HAS_METHOD:       { color: '#0ea5e9', label: 'Has Method' },
  DECORATES:        { color: '#eab308', label: 'Decorates' },
  // Document cross-references
  REFERENCES:       { color: '#14b8a6', label: 'References' },
  // Graph structure
  MEMBER_OF:        { color: '#64748b', label: 'Member Of' },
  STEP_IN_PROCESS:  { color: '#ec4899', label: 'Step In Process' },
};
