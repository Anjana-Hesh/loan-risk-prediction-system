import React from 'react';
import { LayoutDashboard, History, Cpu, FileSpreadsheet } from 'lucide-react';

interface SidebarProps {
  currentTab: 'assessment' | 'history' | 'metrics';
  setCurrentTab: (tab: 'assessment' | 'history' | 'metrics') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'assessment' as const, label: 'Run Assessment', icon: LayoutDashboard },
    { id: 'history' as const, label: 'Audit Log & History', icon: History },
    { id: 'metrics' as const, label: 'ML Model Insights', icon: Cpu }
  ];

  return (
    <nav className="flex lg:flex-col gap-2 p-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-xl mb-6 lg:mb-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              active
                ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};