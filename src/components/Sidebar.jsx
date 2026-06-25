import { ChevronLeftIcon, MenuIcon, UsersIcon } from './icons';

const navItems = [
  { id: 'users', label: 'Users', icon: UsersIcon, active: true },
];

export default function Sidebar({ collapsed, onToggleSidebar }) {
  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 ${
        collapsed ? 'w-[72px]' : 'w-60 max-md:shadow-xl'
      }`}
    >
      <div
        className={`flex h-14 shrink-0 items-center border-b border-slate-200 dark:border-slate-700 sm:h-16 ${
          collapsed ? 'justify-center px-2' : 'px-5'
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          UM
        </div>
        {!collapsed && (
          <span className="ml-3 truncate text-lg font-semibold text-slate-900 dark:text-white">
            UserMgmt
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ id, label, icon: Icon, active }) => (
          <button
            key={id}
            type="button"
            title={collapsed ? label : undefined}
            className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              collapsed ? 'justify-center' : 'gap-3'
            } ${
              active
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </button>
        ))}
      </nav>

      <div className="flex shrink-0 justify-end border-t border-slate-200 p-3 dark:border-slate-700">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </button>
      </div>
    </aside>
  );
}
