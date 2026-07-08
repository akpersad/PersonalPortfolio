'use client';

/**
 * The site's one easter egg (Phase 6): click the portrait and he winks.
 * Pointer-only delight with no interactive semantics, so assistive tech
 * hears the same plain image; the global reduced-motion collapse zeroes
 * the animation for users who opted out.
 */
import { useRef, useState } from 'react';
import Avatar from '@/components/Avatar';

type WinkingAvatarProps = Parameters<typeof Avatar>[0];

export default function WinkingAvatar(props: WinkingAvatarProps) {
  const [winking, setWinking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wink = () => {
    if (timer.current) clearTimeout(timer.current);
    setWinking(true);
    timer.current = setTimeout(() => setWinking(false), 480);
  };

  return (
    <div className={winking ? 'avatar-wink' : undefined} onClick={wink}>
      <Avatar {...props} />
    </div>
  );
}
