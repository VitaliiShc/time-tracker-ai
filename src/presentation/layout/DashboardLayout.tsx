import type { ReactNode } from 'react';

export interface DashboardLayoutProps {
  title?: string;
  children: ReactNode;
}

// High-level layout shell for time tracking screens.
export function DashboardLayout({ title = 'Time Tracker', children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          <span className="text-xs text-slate-500">Time Tracking</span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}

