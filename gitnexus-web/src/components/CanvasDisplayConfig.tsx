import { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';

export interface CanvasDisplaySettings {
  showNodeLabels: boolean;
  showRiskLevels: boolean;
  showConfidenceScores: boolean;
  showCommunities: boolean;
  showRelationshipTypes: boolean;
  showFilePaths: boolean;
  showMetadata: boolean;
}

const DEFAULT_SETTINGS: CanvasDisplaySettings = {
  showNodeLabels: true,
  showRiskLevels: true,
  showConfidenceScores: false,
  showCommunities: true,
  showRelationshipTypes: false,
  showFilePaths: false,
  showMetadata: false,
};

/**
 * Canvas information display configuration panel
 * Allows users to toggle visibility of different information categories
 */
export const CanvasDisplayConfig = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<CanvasDisplaySettings>(() => {
    const saved = localStorage.getItem('gitnexus-canvas-display');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('gitnexus-canvas-display', JSON.stringify(settings));
    // Dispatch custom event for settings change
    window.dispatchEvent(new CustomEvent('canvasDisplayChange', { detail: { settings } }));
  }, [settings]);

  const toggleSetting = (key: keyof CanvasDisplaySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const settingLabels: Record<keyof CanvasDisplaySettings, string> = {
    showNodeLabels: 'Node Labels',
    showRiskLevels: 'Risk Levels',
    showConfidenceScores: 'Confidence Scores',
    showCommunities: 'Communities',
    showRelationshipTypes: 'Relationship Types',
    showFilePaths: 'File Paths',
    showMetadata: 'Metadata',
  };

  return (
    <div className="fixed top-6 left-6 z-40">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center bg-surface border border-border-subtle rounded-lg hover:bg-elevated transition-colors"
        title="Canvas Display Settings"
      >
        <Settings className="w-5 h-5 text-text-primary" />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-64 bg-deep border border-border-subtle rounded-lg shadow-2xl p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">Display Settings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-text-muted hover:text-text-primary hover:bg-hover rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Settings List */}
          <div className="space-y-2">
            {(Object.keys(settings) as Array<keyof CanvasDisplaySettings>).map((key) => (
              <label
                key={key}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-hover cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={() => toggleSetting(key)}
                  className="w-4 h-4 rounded border-border-subtle bg-surface cursor-pointer accent-accent"
                />
                <span className="text-xs text-text-primary flex-1">
                  {settingLabels[key]}
                </span>
              </label>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-border-subtle" />

          {/* Reset Button */}
          <button
            onClick={resetToDefaults}
            className="w-full px-3 py-2 text-xs font-medium text-text-secondary hover:text-text-primary bg-surface hover:bg-hover rounded-lg transition-colors"
          >
            Reset to Defaults
          </button>

          {/* Info text */}
          <p className="text-[11px] text-text-muted">
            Changes apply to the canvas in real-time.
          </p>
        </div>
      )}
    </div>
  );
};

