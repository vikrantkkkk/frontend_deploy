import { DashboardIcon, SettingsIcon, UsersIcon } from './icons';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, active: false },
  { id: 'users', label: 'Users', icon: UsersIcon, active: true },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, active: false },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 ${
        collapsed ? 'w-[72px]' : 'w-60'
      }`}
    >
      <div
        className={`flex h-16 shrink-0 items-center border-b border-slate-200 dark:border-slate-700 ${
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

      {!collapsed && (
        <div className="border-t border-slate-200 p-4 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">v1.0.0 · DevOps</p>
        </div>
      )}
    </aside>
  );
}
