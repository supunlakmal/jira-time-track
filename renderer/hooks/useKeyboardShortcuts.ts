import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement ||
      (event.target as any)?.contentEditable === 'true'
    ) {
      return;
    }

    shortcuts.forEach(shortcut => {
      const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatches = !!shortcut.ctrlKey === event.ctrlKey;
      const altMatches = !!shortcut.altKey === event.altKey;
      const shiftMatches = !!shortcut.shiftKey === event.shiftKey;

      if (keyMatches && ctrlMatches && altMatches && shiftMatches) {
        event.preventDefault();
        event.stopPropagation();
        shortcut.action();
      }
    });
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return shortcuts;
};

// Common shortcuts for the floating window
export const useFloatingWindowShortcuts = ({
  onToggleFloating,
  onStartTimer,
  onPauseTimer,
  onShowBreakSettings
}: {
  onToggleFloating?: () => void;
  onStartTimer?: () => void;
  onPauseTimer?: () => void;
  onShowBreakSettings?: () => void;
}) => {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'f',
      ctrlKey: true,
      action: onToggleFloating || (() => {}),
      description: 'Toggle floating window'
    },
    {
      key: ' ', // spacebar
      action: onStartTimer || (() => {}),
      description: 'Start/pause current timer'
    },
    {
      key: 's',
      ctrlKey: true,
      action: onPauseTimer || (() => {}),
      description: 'Pause current timer'
    },
    {
      key: 'b',
      ctrlKey: true,
      action: onShowBreakSettings || (() => {}),
      description: 'Show break settings'
    }
  ].filter(shortcut => shortcut.action !== (() => {}));

  return useKeyboardShortcuts(shortcuts);
};

// Common shortcuts for the main window
export const useMainWindowShortcuts = ({
  onToggleFloating,
  onShowExport,
  onRefreshData
}: {
  onToggleFloating?: () => void;
  onShowExport?: () => void;
  onRefreshData?: () => void;
}) => {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'f',
      ctrlKey: true,
      action: onToggleFloating || (() => {}),
      description: 'Toggle floating timer'
    },
    {
      key: 'e',
      ctrlKey: true,
      action: onShowExport || (() => {}),
      description: 'Export data'
    },
    {
      key: 'r',
      ctrlKey: true,
      action: onRefreshData || (() => {}),
      description: 'Refresh data'
    },
    {
      key: '?',
      shiftKey: true,
      action: () => {
        const helpText = shortcuts.map(s => {
          const keys = [];
          if (s.ctrlKey) keys.push('Ctrl');
          if (s.altKey) keys.push('Alt');
          if (s.shiftKey) keys.push('Shift');
          keys.push(s.key === ' ' ? 'Space' : s.key.toUpperCase());
          return `${keys.join('+')} - ${s.description}`;
        }).join('\n');
        
        alert(`Keyboard Shortcuts:\n\n${helpText}`);
      },
      description: 'Show this help'
    }
  ].filter(shortcut => shortcut.action !== (() => {}));

  return useKeyboardShortcuts(shortcuts);
};