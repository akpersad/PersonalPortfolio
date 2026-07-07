import type { ReactNode } from 'react';

interface DecisionProps {
  /** 1-based position in the study's decision sequence. */
  n: number;
  /** Total decisions in the study, for the "01 / 05" annotation. */
  of: number;
  title: string;
  /** The tradeoff taken, stated honestly. Rendered after the body. */
  tradeoff: ReactNode;
  children: ReactNode;
}

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * A named decision with its tradeoff: the spine of every case study.
 * Accent left rule per the Annotated comp; the tradeoff line is the part
 * reviewers actually read, so it is visually distinct and always present.
 */
export default function Decision({
  n,
  of,
  title,
  tradeoff,
  children,
}: DecisionProps) {
  return (
    <section
      id={`decision-${pad(n)}`}
      className="mt-12 max-w-[62ch] border-l-2 border-accent pl-6"
    >
      <p className="annotation">
        decision {pad(n)} / {pad(of)}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-fg">{title}</h3>
      {/* Paragraph styling comes from the global MDX element map. */}
      <div>{children}</div>
      <p className="mt-3 text-sm text-fg-muted">
        <strong className="font-semibold text-accent-ink">
          Tradeoff taken:
        </strong>{' '}
        {tradeoff}
      </p>
    </section>
  );
}
