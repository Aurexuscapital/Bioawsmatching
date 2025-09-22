export function Timeline({ items }: { items: { id: string; name: string; at: string }[] }) {
  return (
    <ol className="relative border-l border-brd-light dark:border-brd-dark pl-4">
      {items.map((it) => (
        <li key={it.id} className="mb-4">
          <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-blue-500" />
          <div className="text-sm font-medium">{it.name}</div>
          <div className="text-xs text-slate-500">{new Date(it.at).toLocaleString()}</div>
        </li>
      ))}
    </ol>
  );
}
