#!/usr/bin/env node

/**
 * Export GitNexus graph data to JSON for showcase demo
 * Reads directly from .gitnexus/kuzu database
 * Usage: node scripts/export-gitnexus-graph.mjs [output-path] [limit]
 */

import { Database } from 'kuzu';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = process.argv[2] || 'src/showcase/gitnexus-graph-data.json';
const limit = parseInt(process.argv[3] || '200');

console.log('🔍 Exporting GitNexus graph data from Kuzu...');

try {
  // Connect to Kuzu database
  const dbPath = path.resolve(__dirname, '../../.gitnexus/kuzu');
  const db = new Database(dbPath);
  const conn = db.connect();

  // Query nodes
  console.log(`  Querying nodes (limit: ${limit})...`);
  const nodesResult = conn.execute(`MATCH (n) RETURN n LIMIT ${limit}`);
  const nodes = [];

  while (nodesResult.hasNext()) {
    const row = nodesResult.getNext();
    if (row && row[0]) {
      nodes.push(row[0]);
    }
  }

  console.log(`✓ Found ${nodes.length} nodes`);

  // Query edges
  console.log(`  Querying edges...`);
  const edgesResult = conn.execute(`MATCH (a)-[r]->(b) RETURN a.id as source, b.id as target, type(r) as type LIMIT 500`);
  const edges = [];

  while (edgesResult.hasNext()) {
    const row = edgesResult.getNext();
    if (row && row[0] && row[1] && row[2]) {
      edges.push({
        source: row[0],
        target: row[1],
        type: row[2],
      });
    }
  }

  console.log(`✓ Found ${edges.length} edges`);

  // Build graph object
  const graph = {
    exportedAt: new Date().toISOString(),
    stats: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
    },
    nodes,
    edges,
  };

  // Write to file
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));
  console.log(`✓ Exported to ${outputPath}`);
  console.log(`  Size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

  conn.close();
  db.close();
} catch (error) {
  console.error('✗ Export failed:', error.message);
  process.exit(1);
}

