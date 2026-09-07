import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-6 shadow-xl shadow-black/40 ${className}`}>
      {children}
    </div>
  );
};