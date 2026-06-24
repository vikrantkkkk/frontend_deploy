import { useTheme } from '../context/ThemeContext';
import { ChevronLeftIcon, MenuIcon, MoonIcon, SunIcon } from './icons';

export default function Header({ collapsed, onToggleSidebar, title, subtitle }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden truncate text-sm text-slate-500 dark:text-slate-400 sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
