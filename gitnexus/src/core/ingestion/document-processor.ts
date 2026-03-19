/**
 * Document Processor — F5: Multi-format file support
 * Parses Markdown, JSON, YAML, and other non-code files to extract
 * cross-references (links, $ref, anchors) and create REFERENCES edges.
 *
 * [2026-03-15 | Author: Augment Agent | F5 multi-format support]
 */

import { KnowledgeGraph } from '../graph/types.js';
import { generateId } from '../../lib/utils.js';
import path from 'node:path';

// ============================================================================
// Document type detection
// ============================================================================

export type DocumentFormat = 'markdown' | 'json' | 'yaml' | 'toml' | 'env' | null;

const DOCUMENT_EXTENSIONS: Record<string, DocumentFormat> = {
  '.md': 'markdown', '.mdx': 'markdown', '.markdown': 'markdown', '.rst': 'markdown',
  '.json': 'json', '.jsonc': 'json', '.json5': 'json',
  '.yaml': 'yaml', '.yml': 'yaml',
  '.toml': 'toml',
  '.env': 'env',
};

export const getDocumentFormat = (filePath: string): DocumentFormat => {
  const ext = path.extname(filePath).toLowerCase();
  return DOCUMENT_EXTENSIONS[ext] ?? null;
};

export const isDocumentFile = (filePath: string): boolean =>
  getDocumentFormat(filePath) !== null;

// ============================================================================
// Reference extraction — per format
// ============================================================================

export interface ExtractedReference {
  target: string;
  line: number;
  kind: 'link' | 'wikilink' | 'image' | '$ref' | 'anchor' | 'include' | 'source';
}

const extractMarkdownRefs = (content: string): ExtractedReference[] => {
  const refs: ExtractedReference[] = [];
  const lines = content.split('\n');
  const mdLinkRe = /\[([^\]]*)\]\(([^)]+)\)/g;
  const wikiRe = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  const imgRe = /!\[([^\]]*)\]\(([^)]+)\)/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const ln = i + 1;
    for (const m of line.matchAll(imgRe)) {
      const t = m[2].split('#')[0].split('?')[0].trim();
      if (t && !t.startsWith('http') && !t.startsWith('mailto:'))
        refs.push({ target: t, line: ln, kind: 'image' });
    }
    for (const m of line.matchAll(mdLinkRe)) {
      const t = m[2].split('#')[0].split('?')[0].trim();
      if (t && !t.startsWith('http') && !t.startsWith('mailto:'))
        refs.push({ target: t, line: ln, kind: 'link' });
    }
    for (const m of line.matchAll(wikiRe)) {
      const t = m[1].trim();
      if (t) refs.push({ target: t, line: ln, kind: 'wikilink' });
    }
  }
  return refs;
};

const extractJsonRefs = (content: string): ExtractedReference[] => {
  const refs: ExtractedReference[] = [];
  const lines = content.split('\n');
  const refRe = /"\$ref"\s*:\s*"([^"]+)"/g;
  const srcRe = /"(?:source|file|path|include|extends)\s*"\s*:\s*"([^"]+)"/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const ln = i + 1;
    for (const m of line.matchAll(refRe)) {
      const t = m[1].split('#')[0].trim();
      if (t && !t.startsWith('http')) refs.push({ target: t, line: ln, kind: '$ref' });
    }
    for (const m of line.matchAll(srcRe)) {
      const t = m[1].trim();
      if (t && !t.startsWith('http') && (t.includes('/') || t.includes('.')))
        refs.push({ target: t, line: ln, kind: 'source' });
    }
  }
  return refs;
};

const extractYamlRefs = (content: string): ExtractedReference[] => {
  const refs: ExtractedReference[] = [];
  const lines = content.split('\n');
  const inclRe = /!include\s+['"]?([^\s'"#]+)/g;
  const refRe = /\$ref:\s*['"]?([^\s'"#]+)/g;
  const fileRe = /(?:file|source|path|template|extends|include)\s*:\s*['"]?([^\s'"#]+)/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const ln = i + 1;
    if (line.trimStart().startsWith('#')) continue;
    for (const m of line.matchAll(inclRe))
      refs.push({ target: m[1], line: ln, kind: 'include' });
    for (const m of line.matchAll(refRe)) {
      const t = m[1].split('#')[0].trim();
      if (t && !t.startsWith('http')) refs.push({ target: t, line: ln, kind: '$ref' });
    }
    for (const m of line.matchAll(fileRe)) {
      const t = m[1].trim();
      if (t && !t.startsWith('http') && (t.includes('/') || t.includes('.')))
        refs.push({ target: t, line: ln, kind: 'source' });
    }
  }
  return refs;
};


// ============================================================================
// Reference resolution
// ============================================================================

const resolveReference = (
  sourceFilePath: string,
  target: string,
  allFilePaths: Set<string>,
): string | null => {
  const sourceDir = path.dirname(sourceFilePath);
  const resolved = path.posix.normalize(path.posix.join(sourceDir, target));
  if (allFilePaths.has(resolved)) return resolved;

  const exts = ['.md', '.mdx', '.json', '.yaml', '.yml', '.ts', '.tsx', '.js', '.jsx', '.py'];
  for (const ext of exts) {
    if (allFilePaths.has(resolved + ext)) return resolved + ext;
  }
  if (allFilePaths.has(target)) return target;
  for (const ext of exts) {
    if (allFilePaths.has(target + ext)) return target + ext;
  }

  // Fuzzy: match by basename
  const targetBase = target.split('/').pop() || target;
  for (const fp of allFilePaths) {
    const base = fp.split('/').pop() || fp;
    if (base === targetBase) return fp;
    if (base.replace(/\.[^.]+$/, '') === targetBase.replace(/\.[^.]+$/, '')) return fp;
  }
  return null;
};

// ============================================================================
// Main processor
// ============================================================================

export interface DocumentProcessingResult {
  filesProcessed: number;
  referencesFound: number;
  referencesResolved: number;
}

export const processDocuments = (
  graph: KnowledgeGraph,
  files: { path: string; content: string }[],
  allFilePaths: Set<string>,
  onProgress?: (current: number, total: number, filePath: string) => void,
): DocumentProcessingResult => {
  const result: DocumentProcessingResult = { filesProcessed: 0, referencesFound: 0, referencesResolved: 0 };
  const docFiles = files.filter(f => isDocumentFile(f.path));
  const total = docFiles.length;

  for (let i = 0; i < docFiles.length; i++) {
    const file = docFiles[i];
    const format = getDocumentFormat(file.path);
    onProgress?.(i + 1, total, file.path);
    if (!format) continue;

    let refs: ExtractedReference[];
    switch (format) {
      case 'markdown': refs = extractMarkdownRefs(file.content); break;
      case 'json': refs = extractJsonRefs(file.content); break;
      case 'yaml': refs = extractYamlRefs(file.content); break;
      default: continue;
    }

    result.filesProcessed++;
    result.referencesFound += refs.length;
    const sourceNodeId = generateId('File', file.path);
    const seenTargets = new Set<string>();

    for (const ref of refs) {
      const resolvedTarget = resolveReference(file.path, ref.target, allFilePaths);
      if (!resolvedTarget || seenTargets.has(resolvedTarget)) continue;
      seenTargets.add(resolvedTarget);

      const targetNodeId = generateId('File', resolvedTarget);
      if (sourceNodeId === targetNodeId) continue;
      if (!graph.getNode(sourceNodeId) || !graph.getNode(targetNodeId)) continue;

      graph.addRelationship({
        id: generateId('REFERENCES', `${file.path}->${resolvedTarget}`),
        type: 'REFERENCES',
        sourceId: sourceNodeId,
        targetId: targetNodeId,
        confidence: 0.9,
        reason: `${ref.kind}:line-${ref.line}`,
      });
      result.referencesResolved++;
    }
  }
  return result;
};
