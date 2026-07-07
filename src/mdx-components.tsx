import type { MDXComponents } from 'mdx/types';

/**
 * Global element map for imported MDX (the case-study bodies).
 * Typography follows the Annotated system: Bricolage headings, Geist prose
 * at a 62ch measure, Geist Mono for code, accent reserved for markup.
 * Structural pieces (decisions, numbers tables, figures) are dedicated
 * components in src/components/study/, imported by each study file.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2
        className="mt-16 max-w-[28ch] text-2xl font-semibold text-fg"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mt-10 max-w-[36ch] text-xl font-semibold text-fg" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mt-4 max-w-[62ch] text-fg-muted" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-fg" {...props}>
        {children}
      </strong>
    ),
    a: ({ children, href, ...props }) => {
      const external = typeof href === 'string' && href.startsWith('http');
      return (
        <a
          href={href}
          className="text-accent-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent motion-safe:transition-colors motion-safe:duration-150"
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          {...props}
        >
          {children}
          {external && (
            <span className="sr-only"> (opens in a new tab)</span>
          )}
        </a>
      );
    },
    ul: ({ children, ...props }) => (
      <ul
        className="mt-4 max-w-[62ch] list-disc space-y-2 pl-5 text-fg-muted marker:text-accent"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mt-4 max-w-[62ch] list-decimal space-y-2 pl-5 text-fg-muted marker:font-mono marker:text-sm marker:text-fg-muted"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    code: ({ children, ...props }) => (
      <code
        className="rounded-sm bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-fg"
        {...props}
      >
        {children}
      </code>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mt-6 max-w-[62ch] border-l-2 border-line-strong pl-6 text-fg-muted [&_p]:mt-2"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: props => <hr className="mt-16 border-line" {...props} />,
    ...components,
  };
}
