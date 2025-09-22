export function Skeleton({ className }: { className?: string }) {
  return <div className={`shimmer rounded-md bg-slate-200 dark:bg-slate-700 ${className || 'h-4 w-full'}`} />;
}
