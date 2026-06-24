import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function getInitialCollapsed() {
  return localStorage.getItem('sidebar-collapsed') === 'true';
}

export default function Layout({ title, subtitle, children }) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar collapsed={collapsed} />

      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'ml-[72px]' : 'ml-60'
        }`}
      >
        <Header
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
          title={title}
          subtitle={subtitle}
        />

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
