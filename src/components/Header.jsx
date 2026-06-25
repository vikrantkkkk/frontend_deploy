import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from './icons';

export default function Header({ title }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 sm:h-16 sm:px-6">
      <h1 className="min-w-0 truncate text-base font-semibold text-slate-900 dark:text-white sm:text-lg md:text-xl">
        {title}
      </h1>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="shrink-0 rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
