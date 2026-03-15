import assert from 'node:assert/strict';
import test from 'node:test';
import { demoReducer, initialDemoState } from './demo-state.ts';

test('select node opens inspector sidebar', () => {
  const next = demoReducer(initialDemoState, {
    type: 'SELECT_NODE',
    nodeId: 'function:runImpactAnalysis',
    label: 'runImpactAnalysis',
  });

  assert.equal(next.selectedNodeId, 'function:runImpactAnalysis');
  assert.equal(next.sidebarOpen, true);
});

test('pinning preserves selection on clear', () => {
  const pinned = demoReducer(initialDemoState, {
    type: 'SELECT_NODE',
    nodeId: 'function:handleNodeClick',
    label: 'handleNodeClick',
  });
  const pinnedState = demoReducer(pinned, { type: 'TOGGLE_PIN' });
  const cleared = demoReducer(pinnedState, { type: 'CLEAR_SELECTION' });

  assert.equal(cleared.sidebarPinned, true);
  assert.equal(cleared.selectedNodeId, 'function:handleNodeClick');
});

test('impact action stores highlight and blast radius state', () => {
  const next = demoReducer(initialDemoState, {
    type: 'RUN_IMPACT',
    nodeId: 'function:runImpactAnalysis',
    highlightedNodeIds: ['process:impact-flow'],
    blastRadiusNodeIds: ['function:runImpactAnalysis', 'function:renderRelations'],
    label: 'runImpactAnalysis',
  });

  assert.deepEqual(Array.from(next.highlightedNodeIds), ['process:impact-flow']);
  assert.deepEqual(Array.from(next.blastRadiusNodeIds), ['function:runImpactAnalysis', 'function:renderRelations']);
  assert.equal(next.lastImpactNodeId, 'function:runImpactAnalysis');
});