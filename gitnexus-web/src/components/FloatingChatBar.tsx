import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, Square, Sparkles, User, X, ChevronUp, Loader2, AlertTriangle
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { ToolCallCard } from './ToolCallCard';
import { isProviderConfigured } from '../core/llm/settings-service';
import { MarkdownRenderer } from './MarkdownRenderer';

/**
 * Floating chat bar positioned at bottom-right corner
 * Supports expand/collapse toggle with smooth animations
 */
export const FloatingChatBar = () => {
  const {
    chatMessages,
    isChatLoading,
    currentToolCalls,
    agentError,
    isAgentReady,
    isAgentInitializing,
    sendChatMessage,
    stopChatResponse,
    clearChat,
    fileContents,
    graph,
    addCodeReference,
  } = useAppState();

  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current && isExpanded) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatLoading, isExpanded]);

  const handleSendMessage = useCallback(async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const message = chatInput.trim();
    setChatInput('');
    await sendChatMessage(message);
  }, [chatInput, isChatLoading, sendChatMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatSuggestions = [
    'Explain the project architecture',
    'What does this project do?',
    'Show me the most important files',
    'Find all API handlers',
  ];

  if (!isProviderConfigured()) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Floating Chat Bar */}
      <div
        className={`
          bg-deep border border-border-subtle rounded-2xl shadow-2xl
          transition-all duration-300 ease-out
          ${isExpanded
            ? 'w-96 h-[600px] flex flex-col'
            : 'w-14 h-14 flex items-center justify-center cursor-pointer hover:bg-elevated'
          }
        `}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {!isExpanded ? (
          // Collapsed state - show icon button
          <button
            className="w-full h-full flex items-center justify-center text-accent hover:text-accent/80 transition-colors"
            title="Open chat"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        ) : (
          // Expanded state - show full chat interface
          <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="font-semibold text-sm">Nexus AI</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-text-muted hover:text-text-primary hover:bg-hover rounded transition-colors"
                title="Collapse"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            {/* Status bar */}
            <div className="flex items-center gap-2.5 px-4 py-2 bg-elevated/50 border-b border-border-subtle text-xs">
              {!isAgentReady && (
                <span className="px-2 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Configure AI
                </span>
              )}
              {isAgentInitializing && (
                <span className="px-2 py-1 rounded-full bg-surface border border-border-subtle flex items-center gap-1 text-text-muted">
                  <Loader2 className="w-3 h-3 animate-spin" /> Connecting
                </span>
              )}
            </div>

            {/* Error message */}
            {agentError && (
              <div className="px-4 py-2 bg-rose-500/10 border-b border-rose-500/30 text-rose-100 text-xs flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" />
                <span>{agentError}</span>
              </div>
            )}

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-2">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center bg-gradient-to-br from-accent to-node-interface rounded-lg text-lg">
                    🧠
                  </div>
                  <h3 className="text-xs font-medium mb-1">Ask me anything</h3>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    I can help you understand the architecture and find functions.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${
                        msg.role === 'user'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-surface text-text-primary'
                      }`}>
                        <MarkdownRenderer content={msg.content} />
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex gap-2">
                      <div className="bg-surface rounded-lg px-3 py-2">
                        <Loader2 className="w-3 h-3 animate-spin text-accent" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="px-3 py-3 border-t border-border-subtle bg-surface rounded-b-2xl">
              <div className="flex gap-2">
                <textarea
                  ref={textareaRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something..."
                  className="flex-1 bg-elevated border border-border-subtle rounded px-2 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent resize-none max-h-20"
                  rows={2}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-2 py-1.5 bg-accent text-white rounded hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Send message"
                >
                  {isChatLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

