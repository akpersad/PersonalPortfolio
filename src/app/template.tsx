/**
 * Route-entrance choreography (Phase 6 craft layer). A template remounts on
 * every navigation, so the page-enter animation runs per route change.
 * Motion rules: transform only (a fade would exclude the content from LCP,
 * see page-enter in globals.css), ease-out enter, ~300ms macro tier;
 * the global reduced-motion collapse zeroes it for users who opted out.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
