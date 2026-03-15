import { useState, useCallback, useRef, useEffect, DragEvent } from 'react';
import { Upload, FileArchive, Github, Loader2, ArrowRight, Key, Eye, EyeOff, Globe, X, Zap, Database, FolderOpen, Search, CheckSquare, Square } from 'lucide-react';
import { cloneRepository, parseGitHubUrl } from '../services/git-clone';
import { connectToServer, normalizeServerUrl, fetchRepoInfo, type ConnectToServerResult, type ServerRepoInfo } from '../services/server-connection';
import { FileEntry } from '../services/zip';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  onGitClone?: (files: FileEntry[]) => void;
  onServerConnect?: (result: ConnectToServerResult, serverUrl?: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const DropZone = ({ onFileSelect, onGitClone, onServerConnect }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'zip' | 'github' | 'server' | 'folder'>('zip');
  const [githubUrl, setGithubUrl] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  const [cloneProgress, setCloneProgress] = useState({ phase: '', percent: 0 });
  const [error, setError] = useState<string | null>(null);

  // Server tab state
  const [serverUrl, setServerUrl] = useState(() =>
    localStorage.getItem('gitnexus-server-url') || ''
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [serverProgress, setServerProgress] = useState<{
    phase: string;
    downloaded: number;
    total: number | null;
  }>({ phase: '', downloaded: 0, total: null });
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-detect local GitNexus server
  const [detectedServer, setDetectedServer] = useState<{
    url: string;
    repoInfo: ServerRepoInfo;
  } | null>(null);
  const [isAutoConnecting, setIsAutoConnecting] = useState(false);

  useEffect(() => {
    const LOCAL_URLS = ['http://localhost:4747', 'http://127.0.0.1:4747'];
    let cancelled = false;

    const detectServer = async () => {
      for (const url of LOCAL_URLS) {
        try {
          const baseUrl = normalizeServerUrl(url);
          const repoInfo = await fetchRepoInfo(baseUrl);
          if (!cancelled && repoInfo?.name) {
            setDetectedServer({ url, repoInfo });
            return;
          }
        } catch {
          // Server not running at this URL — continue
        }
      }
    };

    detectServer();
    return () => { cancelled = true; };
  }, []);

  const handleAutoConnect = async () => {
    if (!detectedServer || !onServerConnect) return;
    setIsAutoConnecting(true);
    setError(null);

    try {
      const result = await connectToServer(detectedServer.url);
      onServerConnect(result, detectedServer.url);
    } catch (err) {
      console.error('Auto-connect failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsAutoConnecting(false);
    }
  };

  // Folder picker state
  interface FolderEntry { path: string; size: number; selected: boolean; }
  const [folderEntries, setFolderEntries] = useState<FolderEntry[]>([]);
  const [folderSearch, setFolderSearch] = useState('');
  const [folderName, setFolderName] = useState('');
  const [isReadingFolder, setIsReadingFolder] = useState(false);

  const handleFolderPick = async () => {
    try {
      // @ts-expect-error — showDirectoryPicker is not in all TS libs
      const dirHandle: FileSystemDirectoryHandle = await window.showDirectoryPicker();
      setFolderName(dirHandle.name);
      setIsReadingFolder(true);
      setError(null);

      const entries: FolderEntry[] = [];
      const walk = async (handle: FileSystemDirectoryHandle, prefix: string) => {
        for await (const [name, entry] of (handle as any).entries()) {
          if (name.startsWith('.') || name === 'node_modules') continue;
          if (entry.kind === 'file') {
            const file = await (entry as FileSystemFileHandle).getFile();
            entries.push({ path: prefix + name, size: file.size, selected: true });
          } else if (entry.kind === 'directory') {
            await walk(entry as FileSystemDirectoryHandle, prefix + name + '/');
          }
        }
      };
      await walk(dirHandle, '');
      entries.sort((a, b) => a.path.localeCompare(b.path));
      setFolderEntries(entries);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError('Failed to read folder');
      }
    } finally {
      setIsReadingFolder(false);
    }
  };

  const toggleFolderEntry = (path: string) => {
    setFolderEntries(prev => prev.map(e => e.path === path ? { ...e, selected: !e.selected } : e));
  };

  const toggleAllFolderEntries = (selected: boolean) => {
    setFolderEntries(prev => prev.map(e => ({ ...e, selected })));
  };

  const filteredFolderEntries = folderEntries.filter(e =>
    !folderSearch || e.path.toLowerCase().includes(folderSearch.toLowerCase())
  );

  const selectedFolderStats = {
    count: folderEntries.filter(e => e.selected).length,
    totalSize: folderEntries.filter(e => e.selected).reduce((sum, e) => sum + e.size, 0),
  };

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.zip')) {
        onFileSelect(file);
      } else {
        setError('Please drop a .zip file');
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.zip')) {
        onFileSelect(file);
      } else {
        setError('Please select a .zip file');
      }
    }
  }, [onFileSelect]);

  const handleGitClone = async () => {
    if (!githubUrl.trim()) {
      setError('Please enter a GitHub URL');
      return;
    }

    const parsed = parseGitHubUrl(githubUrl);
    if (!parsed) {
      setError('Invalid GitHub URL. Use format: https://github.com/owner/repo');
      return;
    }

    setError(null);
    setIsCloning(true);
    setCloneProgress({ phase: 'starting', percent: 0 });

    try {
      const files = await cloneRepository(
        githubUrl,
        (phase, percent) => setCloneProgress({ phase, percent }),
        githubToken || undefined
      );

      setGithubToken('');

      if (onGitClone) {
        onGitClone(files);
      }
    } catch (err) {
      console.error('Clone failed:', err);
      const message = err instanceof Error ? err.message : 'Failed to clone repository';
      if (message.includes('401') || message.includes('403') || message.includes('Authentication')) {
        if (!githubToken) {
          setError('This looks like a private repo. Add a GitHub PAT (Personal Access Token) to access it.');
        } else {
          setError('Authentication failed. Check your token permissions (needs repo access).');
        }
      } else if (message.includes('404') || message.includes('not found')) {
        setError('Repository not found. Check the URL or it might be private (needs PAT).');
      } else {
        setError(message);
      }
    } finally {
      setIsCloning(false);
    }
  };

  const handleServerConnect = async () => {
    const urlToUse = serverUrl.trim() || window.location.origin;
    if (!urlToUse) {
      setError('Please enter a server URL');
      return;
    }

    // Persist URL to localStorage
    localStorage.setItem('gitnexus-server-url', serverUrl);

    setError(null);
    setIsConnecting(true);
    setServerProgress({ phase: 'validating', downloaded: 0, total: null });

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const result = await connectToServer(
        urlToUse,
        (phase, downloaded, total) => {
          setServerProgress({ phase, downloaded, total });
        },
        abortController.signal
      );

      if (onServerConnect) {
        onServerConnect(result, urlToUse);
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        // User cancelled
        return;
      }
      console.error('Server connect failed:', err);
      const message = err instanceof Error ? err.message : 'Failed to connect to server';
      if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
        setError('Cannot reach server. Check the URL and ensure the server is running.');
      } else {
        setError(message);
      }
    } finally {
      setIsConnecting(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelConnect = () => {
    abortControllerRef.current?.abort();
    setIsConnecting(false);
  };

  const serverProgressPercent = serverProgress.total
    ? Math.round((serverProgress.downloaded / serverProgress.total) * 100)
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-void">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-node-interface/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Auto-detected local server banner */}
        {detectedServer && (
          <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/20 rounded-lg">
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-300">
                  Local GitNexus Server Detected
                </p>
                <p className="text-xs text-emerald-400/70">
                  {detectedServer.repoInfo.name} — {detectedServer.repoInfo.stats?.nodes ?? '?'} nodes, {detectedServer.repoInfo.stats?.edges ?? '?'} edges
                </p>
              </div>
            </div>
            <button
              onClick={handleAutoConnect}
              disabled={isAutoConnecting}
              className="
                w-full flex items-center justify-center gap-2
                px-4 py-2.5
                bg-emerald-500 hover:bg-emerald-400
                text-white font-medium rounded-xl
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              {isAutoConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Connect to {detectedServer.repoInfo.name}
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex mb-4 bg-surface border border-border-default rounded-xl p-1">
          <button
            onClick={() => { setActiveTab('zip'); setError(null); }}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
              text-sm font-medium transition-all duration-200
              ${activeTab === 'zip'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-elevated'
              }
            `}
          >
            <FileArchive className="w-4 h-4" />
            ZIP Upload
          </button>
          <button
            onClick={() => { setActiveTab('github'); setError(null); }}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
              text-sm font-medium transition-all duration-200
              ${activeTab === 'github'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-elevated'
              }
            `}
          >
            <Github className="w-4 h-4" />
            GitHub URL
          </button>
          <button
            onClick={() => { setActiveTab('server'); setError(null); }}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
              text-sm font-medium transition-all duration-200
              ${activeTab === 'server'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-elevated'
              }
            `}
          >
            <Globe className="w-4 h-4" />
            Server
          </button>
          <button
            onClick={() => { setActiveTab('folder'); setError(null); }}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
              text-sm font-medium transition-all duration-200
              ${activeTab === 'folder'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-elevated'
              }
            `}
          >
            <FolderOpen className="w-4 h-4" />
            Folder
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* ZIP Upload Tab */}
        {activeTab === 'zip' && (
          <>
            <div
              className={`
                relative p-16
                bg-surface border-2 border-dashed rounded-3xl
                transition-all duration-300 cursor-pointer
                ${isDragging
                  ? 'border-accent bg-elevated scale-105 shadow-glow'
                  : 'border-border-default hover:border-accent/50 hover:bg-elevated/50 animate-breathe'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".zip"
                className="hidden"
                onChange={handleFileInput}
              />

              {/* Icon */}
              <div className={`
                mx-auto w-20 h-20 mb-6
                flex items-center justify-center
                bg-gradient-to-br from-accent to-node-interface
                rounded-2xl shadow-glow
                transition-transform duration-300
                ${isDragging ? 'scale-110' : ''}
              `}>
                {isDragging ? (
                  <Upload className="w-10 h-10 text-white" />
                ) : (
                  <FileArchive className="w-10 h-10 text-white" />
                )}
              </div>

              {/* Text */}
              <h2 className="text-xl font-semibold text-text-primary text-center mb-2">
                {isDragging ? 'Drop it here!' : 'Drop your codebase'}
              </h2>
              <p className="text-sm text-text-secondary text-center mb-6">
                Drag & drop a .zip file to generate a knowledge graph
              </p>

              {/* Hints */}
              <div className="flex items-center justify-center gap-3 text-xs text-text-muted">
                <span className="px-3 py-1.5 bg-elevated border border-border-subtle rounded-md">
                  .zip
                </span>
              </div>
            </div>

          </>
        )}

        {/* GitHub URL Tab */}
        {activeTab === 'github' && (
          <div className="p-8 bg-surface border border-border-default rounded-3xl">
            {/* Icon */}
            <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center bg-gradient-to-br from-[#333] to-[#24292e] rounded-2xl shadow-lg">
              <Github className="w-10 h-10 text-white" />
            </div>

            {/* Text */}
            <h2 className="text-xl font-semibold text-text-primary text-center mb-2">
              Clone from GitHub
            </h2>
            <p className="text-sm text-text-secondary text-center mb-6">
              Enter a repository URL to clone directly
            </p>

            {/* Inputs - wrapped in div to prevent form autofill */}
            <div className="space-y-3" data-form-type="other">
              <input
                type="url"
                name="github-repo-url-input"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isCloning && handleGitClone()}
                placeholder="https://github.com/owner/repo"
                disabled={isCloning}
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                className="
                  w-full px-4 py-3
                  bg-elevated border border-border-default rounded-xl
                  text-text-primary placeholder-text-muted
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              />

              {/* Token input for private repos */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showToken ? 'text' : 'password'}
                  name="github-pat-token-input"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="GitHub PAT (optional, for private repos)"
                  disabled={isCloning}
                  autoComplete="new-password"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  className="
                    w-full pl-10 pr-10 py-3
                    bg-elevated border border-border-default rounded-xl
                    text-text-primary placeholder-text-muted
                    focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={handleGitClone}
                disabled={isCloning || !githubUrl.trim()}
                className="
                  w-full flex items-center justify-center gap-2
                  px-4 py-3
                  bg-accent hover:bg-accent/90
                  text-white font-medium rounded-xl
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                {isCloning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {cloneProgress.phase === 'cloning'
                      ? `Cloning... ${cloneProgress.percent}%`
                      : cloneProgress.phase === 'reading'
                        ? 'Reading files...'
                        : 'Starting...'
                    }
                  </>
                ) : (
                  <>
                    Clone Repository
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Progress bar */}
            {isCloning && (
              <div className="mt-4">
                <div className="h-2 bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300 ease-out"
                    style={{ width: `${cloneProgress.percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Security note */}
            {githubToken && (
              <p className="mt-3 text-xs text-text-muted text-center">
                Token stays in your browser only, never sent to any server
              </p>
            )}

            {/* Hints */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-text-muted">
              <span className="px-3 py-1.5 bg-elevated border border-border-subtle rounded-md">
                {githubToken ? 'Private + Public' : 'Public repos'}
              </span>
              <span className="px-3 py-1.5 bg-elevated border border-border-subtle rounded-md">
                Shallow clone
              </span>
            </div>
          </div>
        )}

        {/* Server Tab */}
        {activeTab === 'server' && (
          <div className="p-8 bg-surface border border-border-default rounded-3xl">
            {/* Icon */}
            <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center bg-gradient-to-br from-accent to-emerald-600 rounded-2xl shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>

            {/* Text */}
            <h2 className="text-xl font-semibold text-text-primary text-center mb-2">
              Connect to Server
            </h2>
            <p className="text-sm text-text-secondary text-center mb-6">
              Load a pre-built knowledge graph from a running GitNexus server
            </p>

            {/* Inputs */}
            <div className="space-y-3" data-form-type="other">
              <input
                type="url"
                name="server-url-input"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isConnecting && handleServerConnect()}
                placeholder={window.location.origin}
                disabled={isConnecting}
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                className="
                  w-full px-4 py-3
                  bg-elevated border border-border-default rounded-xl
                  text-text-primary placeholder-text-muted
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              />

              <div className="flex gap-2">
                <button
                  onClick={handleServerConnect}
                  disabled={isConnecting}
                  className="
                    flex-1 flex items-center justify-center gap-2
                    px-4 py-3
                    bg-accent hover:bg-accent/90
                    text-white font-medium rounded-xl
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {serverProgress.phase === 'validating'
                        ? 'Validating...'
                        : serverProgress.phase === 'downloading'
                          ? serverProgressPercent !== null
                            ? `Downloading... ${serverProgressPercent}%`
                            : `Downloading... ${formatBytes(serverProgress.downloaded)}`
                          : serverProgress.phase === 'extracting'
                            ? 'Processing...'
                            : 'Connecting...'
                      }
                    </>
                  ) : (
                    <>
                      Connect
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {isConnecting && (
                  <button
                    onClick={handleCancelConnect}
                    className="
                      flex items-center justify-center
                      px-4 py-3
                      bg-red-500/20 hover:bg-red-500/30
                      text-red-400 font-medium rounded-xl
                      transition-all duration-200
                    "
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {isConnecting && serverProgress.phase === 'downloading' && (
              <div className="mt-4">
                <div className="h-2 bg-elevated rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-accent transition-all duration-300 ease-out ${
                      serverProgressPercent === null ? 'animate-pulse' : ''
                    }`}
                    style={{
                      width: serverProgressPercent !== null
                        ? `${serverProgressPercent}%`
                        : '100%',
                    }}
                  />
                </div>
                {serverProgress.total && (
                  <p className="mt-1 text-xs text-text-muted text-center">
                    {formatBytes(serverProgress.downloaded)} / {formatBytes(serverProgress.total)}
                  </p>
                )}
              </div>
            )}

            {/* Hints */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-text-muted">
              <span className="px-3 py-1.5 bg-elevated border border-border-subtle rounded-md">
                Pre-indexed
              </span>
              <span className="px-3 py-1.5 bg-elevated border border-border-subtle rounded-md">
                No WASM needed
              </span>
            </div>
          </div>
        )}

        {/* Folder Tab */}
        {activeTab === 'folder' && (
          <div className="p-8 bg-surface border border-border-default rounded-3xl">
            <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
              <FolderOpen className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-xl font-semibold text-text-primary text-center mb-2">
              Open Local Folder
            </h2>
            <p className="text-sm text-text-secondary text-center mb-6">
              Select a folder to scan and analyze its file structure
            </p>

            <button
              onClick={handleFolderPick}
              disabled={isReadingFolder}
              className="
                w-full flex items-center justify-center gap-2
                px-4 py-3 mb-4
                bg-accent hover:bg-accent/90
                text-white font-medium rounded-xl
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              {isReadingFolder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Reading folder...
                </>
              ) : (
                <>
                  <FolderOpen className="w-5 h-5" />
                  Choose Folder
                </>
              )}
            </button>

            {folderEntries.length > 0 && (
              <div className="space-y-3">
                {/* Search + Select All */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      value={folderSearch}
                      onChange={(e) => setFolderSearch(e.target.value)}
                      placeholder="Filter files..."
                      className="w-full pl-9 pr-3 py-2 bg-elevated border border-border-default rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
                    />
                  </div>
                  <button
                    onClick={() => toggleAllFolderEntries(selectedFolderStats.count < folderEntries.length)}
                    className="p-2 bg-elevated border border-border-default rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                    title={selectedFolderStats.count < folderEntries.length ? 'Select all' : 'Deselect all'}
                  >
                    {selectedFolderStats.count < folderEntries.length
                      ? <CheckSquare className="w-4 h-4" />
                      : <Square className="w-4 h-4" />
                    }
                  </button>
                </div>

                {/* File list */}
                <div className="max-h-48 overflow-y-auto rounded-xl border border-border-default bg-elevated">
                  {filteredFolderEntries.map((entry) => (
                    <button
                      key={entry.path}
                      onClick={() => toggleFolderEntry(entry.path)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-hover transition-colors border-b border-border-subtle last:border-b-0"
                    >
                      <span className={`w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center text-[10px] ${entry.selected ? 'bg-accent border-accent text-white' : 'border-border-default'}`}>
                        {entry.selected && '✓'}
                      </span>
                      <span className="flex-1 truncate text-xs font-mono text-text-secondary">{entry.path}</span>
                      <span className="text-[10px] text-text-muted flex-shrink-0">{formatBytes(entry.size)}</span>
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-text-muted px-1">
                  <span>{selectedFolderStats.count} / {folderEntries.length} files selected</span>
                  <span>{formatBytes(selectedFolderStats.totalSize)}</span>
                </div>

                {/* Hints */}
                <div className="flex items-center justify-center gap-3 text-xs text-text-muted">
                  <span className="px-3 py-1.5 bg-elevated border border-border-subtle rounded-md">
                    {folderName}
                  </span>
                  <span className="px-3 py-1.5 bg-elevated border border-border-subtle rounded-md">
                    File System API
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
