import { TextareaHTMLAttributes } from 'react';

export function TextArea({ label, description, error, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; description?: string; error?: string }) {
  const id = props.id || props.name || 'textarea';
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <textarea id={id} className="input-base min-h-[100px]" aria-invalid={!!error} aria-describedby={description ? `${id}-desc` : undefined} {...props} />
      {description && (
        <p id={`${id}-desc`} className="text-xs text-slate-500">
          {description}
        </p>
      )}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
