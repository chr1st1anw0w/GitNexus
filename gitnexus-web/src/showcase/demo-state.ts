export type DemoMode = 'demo' | 'live' | 'gitnexus';
export type DemoFieldKey = 'tags' | 'risk' | 'relations' | 'metadata';
export type NodeSize = 'small' | 'medium' | 'large';
export type EdgeThickness = 'thin' | 'medium' | 'thick';

export interface DemoEvent {
  id: string;
  message: string;
}

export interface DemoContextMenuState {
  nodeId: string;
  x: number;
  y: number;
}

export interface CanvasDisplaySettings {
  showNodeLabels: boolean;
  showEdgeLabels: boolean;
  showNodeIcons: boolean;
  highlightNeighbors: boolean;
  showMinimap: boolean;
  nodeSize: NodeSize;
  edgeThickness: EdgeThickness;
}

export interface DemoState {
  dataMode: DemoMode;
  showSelectionPage: boolean;
  previewEnabled: boolean;
  visibleFields: Record<DemoFieldKey, boolean>;
  canvasDisplay: CanvasDisplaySettings;
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  sidebarOpen: boolean;
  sidebarPinned: boolean;
  contextMenu: DemoContextMenuState | null;
  highlightedNodeIds: Set<string>;
  blastRadiusNodeIds: Set<string>;
  eventLog: DemoEvent[];
  lastImpactNodeId: string | null;
}

export type DemoAction =
  | { type: 'SET_MODE'; mode: DemoMode }
  | { type: 'SHOW_SELECTION_PAGE' }
  | { type: 'START_ANALYSIS' }
  | { type: 'HOVER_NODE'; nodeId: string | null; label?: string }
  | { type: 'SELECT_NODE'; nodeId: string; label?: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'TOGGLE_FIELD'; field: DemoFieldKey }
  | { type: 'TOGGLE_CANVAS_SETTING'; setting: keyof CanvasDisplaySettings }
  | { type: 'SET_NODE_SIZE'; size: NodeSize }
  | { type: 'SET_EDGE_THICKNESS'; thickness: EdgeThickness }
  | { type: 'TOGGLE_PIN' }
  | { type: 'OPEN_CONTEXT_MENU'; nodeId: string; x: number; y: number; label?: string }
  | { type: 'CLOSE_CONTEXT_MENU' }
  | { type: 'RUN_IMPACT'; nodeId: string; highlightedNodeIds: string[]; blastRadiusNodeIds: string[]; label?: string }
  | { type: 'CLEAR_HIGHLIGHTS' };

const MAX_EVENTS = 8;

const createEvent = (message: string): DemoEvent => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  message,
});

const prependEvent = (state: DemoState, message?: string): DemoEvent[] => {
  if (!message) return state.eventLog;
  return [createEvent(message), ...state.eventLog].slice(0, MAX_EVENTS);
};

export const initialDemoState: DemoState = {
  dataMode: 'demo',
  showSelectionPage: false, // Demo 模式預設直接進入分析展示
  previewEnabled: true,
  visibleFields: {
    tags: true,
    risk: true,
    relations: true,
    metadata: true,
  },
  canvasDisplay: {
    showNodeLabels: true,
    showEdgeLabels: false,
    showNodeIcons: true,
    highlightNeighbors: true,
    showMinimap: false,
    nodeSize: 'medium',
    edgeThickness: 'medium',
  },
  hoveredNodeId: null,
  selectedNodeId: null,
  sidebarOpen: false,
  sidebarPinned: false,
  contextMenu: null,
  highlightedNodeIds: new Set<string>(),
  blastRadiusNodeIds: new Set<string>(),
  eventLog: [
    createEvent('Demo Mode loaded with mock GitNexus graph data.'),
    createEvent('Hover a node to preview it, then click to open the inspector.'),
  ],
  lastImpactNodeId: null,
};

export const demoReducer = (state: DemoState, action: DemoAction): DemoState => {
  switch (action.type) {
    case 'SET_MODE': {
      const message = action.mode === 'demo'
        ? 'Switched to Demo Mode with interactive mock data.'
        : action.mode === 'gitnexus'
        ? 'Switched to GitNexus Data Mode with real repository graph.'
        : 'Switched to Live Data Mode placeholder. Real data is not connected yet.';
      // Demo 模式直接進入分析，其他模式顯示選擇頁面
      const showSelectionPage = action.mode !== 'demo';
      return {
        ...state,
        dataMode: action.mode,
        showSelectionPage,
        hoveredNodeId: null,
        contextMenu: null,
        highlightedNodeIds: action.mode === 'demo' ? state.highlightedNodeIds : new Set<string>(),
        blastRadiusNodeIds: action.mode === 'demo' ? state.blastRadiusNodeIds : new Set<string>(),
        eventLog: prependEvent(state, message),
      };
    }
    case 'SHOW_SELECTION_PAGE': {
      return {
        ...state,
        showSelectionPage: true,
        eventLog: prependEvent(state, 'Returned to analysis target selection page.'),
      };
    }
    case 'START_ANALYSIS': {
      return {
        ...state,
        showSelectionPage: false,
        eventLog: prependEvent(state, 'Started analysis display.'),
      };
    }
    case 'HOVER_NODE': {
      if (action.nodeId === state.hoveredNodeId) return state;
      const message = action.nodeId && action.label ? `Hovered ${action.label}.` : undefined;
      return {
        ...state,
        hoveredNodeId: action.nodeId,
        eventLog: prependEvent(state, message),
      };
    }
    case 'SELECT_NODE': {
      const message = action.label ? `Opened inspector for ${action.label}.` : 'Opened node inspector.';
      return {
        ...state,
        selectedNodeId: action.nodeId,
        sidebarOpen: true,
        contextMenu: null,
        eventLog: prependEvent(state, message),
      };
    }
    case 'CLEAR_SELECTION': {
      if (state.sidebarPinned && state.selectedNodeId) {
        return {
          ...state,
          hoveredNodeId: null,
          contextMenu: null,
          eventLog: prependEvent(state, 'Canvas deselected while inspector stayed pinned.'),
        };
      }
      return {
        ...state,
        hoveredNodeId: null,
        selectedNodeId: null,
        sidebarOpen: false,
        contextMenu: null,
        eventLog: prependEvent(state, 'Cleared current node selection.'),
      };
    }
    case 'TOGGLE_PREVIEW': {
      const next = !state.previewEnabled;
      return {
        ...state,
        previewEnabled: next,
        eventLog: prependEvent(state, next ? 'Enabled hover preview mode.' : 'Disabled hover preview mode.'),
      };
    }
    case 'TOGGLE_FIELD': {
      const nextVisibleFields = {
        ...state.visibleFields,
        [action.field]: !state.visibleFields[action.field],
      };
      return {
        ...state,
        visibleFields: nextVisibleFields,
        eventLog: prependEvent(
          state,
          `${nextVisibleFields[action.field] ? 'Showed' : 'Hid'} ${action.field} fields.`,
        ),
      };
    }
    case 'TOGGLE_CANVAS_SETTING': {
      const setting = action.setting;
      const currentValue = state.canvasDisplay[setting];

      // 只處理 boolean 設定值
      if (typeof currentValue !== 'boolean') {
        return state;
      }

      const nextCanvasDisplay = {
        ...state.canvasDisplay,
        [setting]: !currentValue,
      };

      const settingLabels: Record<keyof CanvasDisplaySettings, string> = {
        showNodeLabels: 'node labels',
        showEdgeLabels: 'edge labels',
        showNodeIcons: 'node icons',
        highlightNeighbors: 'neighbor highlighting',
        showMinimap: 'minimap',
        nodeSize: 'node size',
        edgeThickness: 'edge thickness',
      };

      return {
        ...state,
        canvasDisplay: nextCanvasDisplay,
        eventLog: prependEvent(
          state,
          `${nextCanvasDisplay[setting] ? 'Enabled' : 'Disabled'} ${settingLabels[setting]}.`,
        ),
      };
    }
    case 'SET_NODE_SIZE': {
      return {
        ...state,
        canvasDisplay: {
          ...state.canvasDisplay,
          nodeSize: action.size,
        },
        eventLog: prependEvent(state, `Set node size to ${action.size}.`),
      };
    }
    case 'SET_EDGE_THICKNESS': {
      return {
        ...state,
        canvasDisplay: {
          ...state.canvasDisplay,
          edgeThickness: action.thickness,
        },
        eventLog: prependEvent(state, `Set edge thickness to ${action.thickness}.`),
      };
    }
    case 'TOGGLE_PIN': {
      const nextPinned = !state.sidebarPinned;
      return {
        ...state,
        sidebarPinned: nextPinned,
        sidebarOpen: nextPinned ? true : state.sidebarOpen,
        eventLog: prependEvent(state, nextPinned ? 'Pinned inspector sidebar.' : 'Unpinned inspector sidebar.'),
      };
    }
    case 'OPEN_CONTEXT_MENU': {
      const message = action.label ? `Opened context menu for ${action.label}.` : 'Opened context menu.';
      return {
        ...state,
        contextMenu: {
          nodeId: action.nodeId,
          x: action.x,
          y: action.y,
        },
        eventLog: prependEvent(state, message),
      };
    }
    case 'CLOSE_CONTEXT_MENU':
      return {
        ...state,
        contextMenu: null,
      };
    case 'RUN_IMPACT': {
      const message = action.label
        ? `Ran mock impact analysis for ${action.label}.`
        : 'Ran mock impact analysis.';
      return {
        ...state,
        selectedNodeId: action.nodeId,
        sidebarOpen: true,
        contextMenu: null,
        lastImpactNodeId: action.nodeId,
        highlightedNodeIds: new Set(action.highlightedNodeIds),
        blastRadiusNodeIds: new Set(action.blastRadiusNodeIds),
        eventLog: prependEvent(state, message),
      };
    }
    case 'CLEAR_HIGHLIGHTS':
      return {
        ...state,
        highlightedNodeIds: new Set<string>(),
        blastRadiusNodeIds: new Set<string>(),
        lastImpactNodeId: null,
        eventLog: prependEvent(state, 'Cleared demo highlights and impact overlay.'),
      };
    default:
      return state;
  }
};