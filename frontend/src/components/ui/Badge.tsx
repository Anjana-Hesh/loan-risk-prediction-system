import React from 'react';

interface BadgeProps {
  variant: 'success' | 'danger' | 'warning' | 'info';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  };

  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${styles[variant]}`}>
      {children}
    </span>
  );
};