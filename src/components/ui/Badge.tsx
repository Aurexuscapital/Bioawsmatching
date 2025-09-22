import { cn } from '@/lib/format';

type Variant = 'primary' | 'success' | 'warn' | 'danger' | 'neutral';

export function Badge({ children, variant = 'neutral' }: { children: React.ReactNode; variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/60',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/60',
    warn: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/60',
    danger: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/60',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800/60',
  };
  return <span className={cn('badge-pill', styles[variant])}>{children}</span>;
}
