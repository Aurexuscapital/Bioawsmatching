import { SelectHTMLAttributes } from 'react';

export function Select({ label, description, error, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string; description?: string; error?: string; children?: React.ReactNode }) {
  const id = props.id || props.name || 'select';
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <select id={id} className="input-base" aria-invalid={!!error} aria-describedby={description ? `${id}-desc` : undefined} {...props}>
        {children}
      </select>
      {description && (
        <p id={`${id}-desc`} className="text-xs text-slate-500">
          {description}
        </p>
      )}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
