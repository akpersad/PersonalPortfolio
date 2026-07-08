'use client';

/**
 * The site's one live widget (Phase 6): the most recent public push from
 * the GitHub events API, fetched client-side at render time. Degrades to
 * nothing: no key, no retry, no skeleton; if the API is unreachable or
 * rate-limited the line simply does not appear.
 */
import { useEffect, useState } from 'react';

interface Commit {
  repo: string;
  when: string;
}

const relative = (iso: string): string => {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
  return `${Math.round(hours / 24)} days ago`;
};

export default function LastCommit() {
  const [commit, setCommit] = useState<Commit | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/akpersad/events/public', {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then((events: Array<{ type: string; repo?: { name: string }; created_at: string }>) => {
        const push = events.find(e => e.type === 'PushEvent' && e.repo);
        if (push?.repo) {
          setCommit({ repo: push.repo.name, when: relative(push.created_at) });
        }
      })
      .catch(() => {
        /* stay empty: a live widget that cannot be live says nothing */
      });
    return () => controller.abort();
  }, []);

  if (!commit) return null;

  return (
    <p className="annotation mt-8 flex items-center gap-3">
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
      />
      live from the github api / last public push: {commit.when}, to{' '}
      <a
        href={`https://github.com/${commit.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-accent/40 underline-offset-4 hover:text-accent-ink"
      >
        {commit.repo}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </p>
  );
}
