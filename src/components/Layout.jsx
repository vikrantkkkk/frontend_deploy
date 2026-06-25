import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function getInitialCollapsed() {
  return localStorage.getItem('sidebar-collapsed') === 'true';
}

export default function Layout({ title, children }) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const sidebarExpandedOnMobile = isMobile && !collapsed;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {sidebarExpandedOnMobile && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <Sidebar
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed((prev) => !prev)}
      />

      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'ml-[72px]' : 'ml-0 md:ml-60'
        }`}
      >
        <Header title={title} />

        <main className="flex-1 p-3 sm:p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
