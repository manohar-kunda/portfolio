import React from 'react';

export type BadgeVariant = 'default' | 'blue' | 'emerald' | 'amber' | 'purple' | 'slate' | 'outline' | 'tech';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700/60',
    blue: 'bg-blue-950/60 text-blue-300 border border-blue-800/60',
    emerald: 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60',
    amber: 'bg-amber-950/60 text-amber-300 border border-amber-800/60',
    purple: 'bg-purple-950/60 text-purple-300 border border-purple-800/60',
    slate: 'bg-slate-900/80 text-slate-400 border border-slate-800',
    outline: 'border border-slate-700 text-slate-300 bg-transparent',
    tech: 'bg-slate-900/90 text-blue-300/90 border border-slate-800 font-mono text-[11px]'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md transition-colors ${sizeClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
