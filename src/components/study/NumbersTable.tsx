interface NumbersRow {
  label: string;
  before: string;
  after: string;
  /** e.g. "-82%". Accent-marked; omit when the change is not a number. */
  delta?: string;
}

interface NumbersTableProps {
  caption: string;
  /** Column headings for the two states, e.g. ["v1", "v2"]. */
  columns?: [string, string];
  rows: NumbersRow[];
}

/**
 * The before/after evidence table every study closes its argument with.
 * Mono headers and tabular numerals per the Annotated comp; the delta
 * column is the only accent on the table.
 */
export default function NumbersTable({
  caption,
  columns = ['before', 'after'],
  rows,
}: NumbersTableProps) {
  const hasDelta = rows.some(row => row.delta);
  return (
    <table className="mt-12 w-full max-w-2xl border-collapse">
      <caption className="annotation pb-3 text-left">{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className="annotation border-b border-line px-4 py-3 text-left font-medium first:pl-0">
            Measure
          </th>
          <th scope="col" className="annotation border-b border-line px-4 py-3 text-left font-medium">
            {columns[0]}
          </th>
          <th scope="col" className="annotation border-b border-line px-4 py-3 text-left font-medium">
            {columns[1]}
          </th>
          {hasDelta && (
            <th scope="col" className="annotation border-b border-line px-4 py-3 text-left font-medium">
              Delta
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.label}>
            <th
              scope="row"
              className="border-b border-line px-4 py-3 text-left text-sm font-normal text-fg first:pl-0"
            >
              {row.label}
            </th>
            <td className="border-b border-line px-4 py-3 font-mono text-sm tabular-nums text-fg-muted">
              {row.before}
            </td>
            <td className="border-b border-line px-4 py-3 font-mono text-sm tabular-nums text-fg">
              {row.after}
            </td>
            {hasDelta && (
              <td className="border-b border-line px-4 py-3 font-mono text-sm tabular-nums">
                {row.delta ? (
                  <span className="font-medium text-accent-ink">
                    {row.delta}
                  </span>
                ) : (
                  <span aria-hidden="true" className="text-fg-muted">
                    &ndash;
                  </span>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
