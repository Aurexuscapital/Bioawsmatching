"use client";
import { cn } from '@/lib/format';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';

export function Button({ variant = 'primary', loading, className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; loading?: boolean }) {
  const base = 'btn-base';
  const styles: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    secondary: 'border bg-white dark:bg-slate-900',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',
    destructive: 'bg-danger text-white hover:bg-red-600',
  };
  return (
    <button className={cn(base, styles[variant], className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
