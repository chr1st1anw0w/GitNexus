# GitNexus Web Interactive Demo Guide

## Document Control
- Date: 2026-03-15 20:00:15 CST
- Author: Augment Agent (GPT-5.4)
- Summary: Define the interactive demo page for GitNexus Web so unauthenticated and no-data users can still experience graph interactions, information architecture, and UI intent.

## 1. Goal
The interactive demo page turns the previous static showcase into a product-preview surface for GitNexus Web. It allows users to understand the graph explorer interaction model before login, backend connection, repository import, or graph generation.

## 2. Target Scenarios
- **Onboarding preview**: first-time users learn hover, click, right-click, sidebar, and impact-analysis concepts.
- **External demo**: product walkthrough without a live GitNexus backend.
- **Design review**: PM, design, and engineering can review interaction flow with stable mock data.
- **Empty-state fallback**: users who have not imported a repository still have a guided functional demo.

## 3. Data Modes
### 3.1 Demo Mode
- Uses local mock graph data.
- Supports full interaction flow.
- Must be clearly labeled as a functional demonstration, not a real analysis result.

### 3.2 Live Data Mode
- Reserved for future real graph integration.
- If no login / backend / repository is available, the page shows an empty-state explanation instead of fake analysis.

## 4. Core Interaction Flow
1. User enters `showcase.html`.
2. Page explains that **Demo Mode** is active.
3. User hovers a node to see lightweight preview information.
4. User clicks a node to open the inspector sidebar.
5. User right-clicks a hovered node to open a context menu.
6. Context menu can directly trigger impact-analysis preview.
7. User can pin / unpin the sidebar.
8. User can toggle preview mode and field visibility.
9. User can switch to **Live Data Mode** to see the future empty-state path.

## 5. Component Inventory
- `ShowcaseApp`: standalone showcase shell and page framing.
- `InteractiveGraphDemo`: demo canvas, toolbar, empty-state copy, hover preview, context menu, inspector.
- `demo-state`: reducer for mode switching, sidebar behavior, preview toggle, context menu, and field toggles.
- `mock-graph-data`: sample nodes, edges, metadata, provenance, and impact-analysis helper data.
- Reused infrastructure:
  - `useSigma`
  - `knowledgeGraphToGraphology`
  - core GitNexus graph types

## 6. State Model
### 6.1 Primary UI State
- `dataMode`: `demo | live`
- `previewEnabled`: whether hover preview is visible
- `visibleFields`: `tags | risk | relations | metadata`
- `hoveredNodeId`: current hover target
- `selectedNodeId`: current inspected node
- `sidebarOpen`: inspector visibility
- `sidebarPinned`: whether inspector persists across canvas deselection
- `contextMenu`: position and target node
- `highlightedNodeIds` / `blastRadiusNodeIds`: demo highlight state for impact preview

### 6.2 Expected Transitions
- **Hover node** → update preview target only
- **Click node** → select node + open sidebar
- **Right-click hovered node** → open context menu at pointer position
- **Pin sidebar** → preserve inspector content even after stage click
- **Run impact analysis** → keep node selected + highlight affected relations
- **Switch to live mode without data** → show empty-state guidance

## 7. Display Copy Requirements
### 7.1 Demo Mode copy
- `Demo Mode · Mock graph loaded`
- `This page demonstrates interaction behavior, not repository-specific analysis.`

### 7.2 Live Mode empty-state copy
- `Live data mode requires sign-in, backend connectivity, and an imported repository.`
- `Switch back to Demo Mode to continue exploring the interaction model now.`

### 7.3 No selection copy
- `Click any node to open the inspector sidebar.`
- `Right-click a hovered node to preview actions such as impact analysis.`

### 7.4 Impact-analysis copy
- `Impact analysis in this page is simulated from curated demo relationships.`
- `Risk, provenance, callers, callees, and process steps are illustrative.`

## 8. Functional Scope Available Without Login or Import
Users can still experience:
- node hover preview
- node click → inspector open
- right-click context menu
- sidebar pin / unpin
- preview mode toggle
- field visibility toggles
- mock impact analysis
- process / caller / callee / provenance display
- mode distinction between demo and live-data-empty-state

Users cannot yet experience:
- real repository ingestion
- real GitNexus query execution
- live impact analysis against backend data
- authentication-aware personalization

## 9. Implementation Notes
- Prefer reuse of shared graph rendering infrastructure over a parallel canvas stack.
- Keep all demo-only content isolated under `gitnexus-web/src/showcase`.
- Keep page independently accessible through `showcase.html`.
- Avoid presenting demo output as production truth.

## 10. Recommended Next Steps
1. Connect the same interaction shell to real GitNexus graph payloads.
2. Add jsdom / Testing Library component interaction tests for hover / click / right-click.
3. Reuse the demo inspector model inside the main explorer when product alignment is confirmed.
4. Add screenshot / video capture for external onboarding and product marketing.