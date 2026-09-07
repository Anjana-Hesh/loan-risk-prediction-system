import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  accentColor: string; // e.g. "text-cyan-400"
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  accentColor
}) => {
  return (
    <GlassCard className="p-5 relative overflow-hidden group hover:border-slate-700 transition">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-xl bg-slate-950/60 border border-slate-800 ${accentColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <h4 className="text-2xl font-black text-slate-100">{value}</h4>
        {change && (
          <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {change}
          </span>
        )}
      </div>
    </GlassCard>
  );
};