"use client";
import { Moon, Sun } from 'lucide-react';
import { useThemeMode } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useThemeMode();
  return (
    <button aria-label="Toggle theme" className="btn-base border bg-white dark:bg-slate-900" onClick={toggle}>
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
