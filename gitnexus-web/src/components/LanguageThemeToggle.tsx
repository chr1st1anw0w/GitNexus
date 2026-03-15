import { useState, useEffect } from 'react';
import { Globe, Moon, Sun, X } from 'lucide-react';

type Language = 'zh-TW' | 'en';
type Theme = 'light' | 'dark';

/**
 * Language and Theme toggle control panel
 * Positioned in top-right corner with expand/collapse functionality
 */
export const LanguageThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('gitnexus-language');
    return (saved as Language) || 'zh-TW';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('gitnexus-theme');
    return (saved as Theme) || 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    }
    localStorage.setItem('gitnexus-theme', theme);
  }, [theme]);

  // Apply language
  useEffect(() => {
    localStorage.setItem('gitnexus-language', language);
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }));
  }, [language]);

  const languageLabels: Record<Language, string> = {
    'zh-TW': '繁體中文',
    'en': 'English',
  };

  return (
    <div className="fixed top-6 right-6 z-40">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center bg-surface border border-border-subtle rounded-lg hover:bg-elevated transition-colors"
        title="Language & Theme Settings"
      >
        <Globe className="w-5 h-5 text-text-primary" />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-56 bg-deep border border-border-subtle rounded-lg shadow-2xl p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Settings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-text-muted hover:text-text-primary hover:bg-hover rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Language Section */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
              Language
            </label>
            <div className="flex gap-2">
              {(['zh-TW', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    language === lang
                      ? 'bg-accent/20 text-accent border border-accent/40'
                      : 'bg-surface border border-border-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Section */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
              Theme
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  theme === 'light'
                    ? 'bg-accent/20 text-accent border border-accent/40'
                    : 'bg-surface border border-border-subtle text-text-secondary hover:text-text-primary'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-accent/20 text-accent border border-accent/40'
                    : 'bg-surface border border-border-subtle text-text-secondary hover:text-text-primary'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                Dark
              </button>
            </div>
          </div>

          {/* Info text */}
          <p className="text-[11px] text-text-muted">
            Your preferences are saved automatically.
          </p>
        </div>
      )}
    </div>
  );
};

