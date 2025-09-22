export function Table<T>({ columns, rows, empty }: { columns: { key: keyof T; label: string; render?: (v: any, row: T) => React.ReactNode }[]; rows: T[]; empty?: React.ReactNode }) {
  if (!rows.length) return <div className="text-sm text-slate-500">{empty || 'No data'}</div>;
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            {columns.map((c) => (
              <th key={String(c.key)} className="px-3 py-2 font-medium">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-brd-light dark:border-brd-dark">
              {columns.map((c) => (
                <td key={String(c.key)} className="px-3 py-2">
                  {c.render ? c.render((r as any)[c.key], r) : String((r as any)[c.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
