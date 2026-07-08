/* Avatar, Flat treatment, likeness v5.4. LOCKED per owner approval 2026-07-06
   (see promptFiles/revamp-handoff.md, decisions #8-9). Do not edit the path
   geometry; theming happens only through the --av-* component tokens in
   globals.css. Source comp: design/comps/avatar-final.html (#g-bust-v5). */

type AvatarProps = {
  className?: string;
  /** Accessible name. Pass decorative to hide from assistive tech instead. */
  title?: string;
  decorative?: boolean;
  /** Unique per page if the avatar renders more than once. */
  clipId?: string;
};

const Avatar = ({
  className,
  title = 'Illustrated portrait of Andrew Persad',
  decorative = false,
  clipId = 'avatar-flat-clip',
}: AvatarProps) => {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
    >
      <clipPath id={clipId}>
        <rect x="16" y="16" width="480" height="480" rx="96" />
      </clipPath>
      <rect
        x="16"
        y="16"
        width="480"
        height="480"
        rx="96"
        fill="var(--av-bg, #e8e4dc)"
      />
      <g clipPath={`url(#${clipId})`}>
        {/* shirt */}
        <path
          fill="var(--av-shirt, #3c4763)"
          d="M 92,512 C 96,462 130,436 190,424 C 216,418 240,416 256,416 C 272,416 296,418 322,424 C 382,436 416,462 420,512 Z"
        />
        <path
          fill="rgb(0 0 0 / 0.22)"
          d="M 210,420 C 220,436 292,436 302,420 L 302,429 C 292,445 220,445 210,437 Z"
        />
        {/* neck */}
        <path
          fill="var(--av-skin, #e9a868)"
          d="M 222,370 L 222,432 C 238,440 274,440 290,432 L 290,370 Z"
        />
        <path
          fill="var(--av-skin-2, #c87e3f)"
          d="M 222,370 L 222,404 C 234,416 278,416 290,404 L 290,370 Z"
        />
        {/* face */}
        <path
          fill="var(--av-skin, #e9a868)"
          d="M 256,116 C 184,116 154,168 154,240 C 154,312 196,356 256,356 C 316,356 358,312 358,240 C 358,168 328,116 256,116 Z"
        />
        {/* hair: separate cap with curl crown, fade gap at the temples */}
        <path
          fill="var(--av-hair, #17130e)"
          d="M 158,234 C 152,196 156,156 172,128 C 164,100 186,84 204,92 C 208,72 234,68 242,84 C 250,66 276,68 280,86 C 292,70 314,76 314,94 C 330,84 346,96 340,128 C 356,156 360,196 354,234 L 338,236 C 336,204 334,170 328,148 C 306,142 206,142 184,148 C 178,170 176,204 174,236 Z"
        />
        {/* beard: separate mass around jaw and chin */}
        <path
          fill="var(--av-hair, #17130e)"
          d="M 256,404 C 200,404 168,376 158,330 C 153,312 151,292 156,276 C 160,266 170,270 182,280 C 194,290 206,297 216,301 C 230,306 244,301 250,297 C 254,294 258,294 262,297 C 268,301 282,306 296,301 C 306,297 318,290 330,280 C 342,270 352,266 356,276 C 361,292 359,312 354,330 C 344,376 312,404 256,404 Z"
        />
        {/* nose */}
        <path
          fill="var(--av-skin-2, #c87e3f)"
          d="M 236,278 C 242,290 270,290 276,278 C 268,286 244,286 236,278 Z"
        />
        {/* eyes (classes are interaction hooks only; geometry stays locked) */}
        <ellipse
          className="av-eye"
          fill="var(--av-hair, #17130e)"
          cx="204"
          cy="250"
          rx="11"
          ry="13"
        />
        <ellipse
          className="av-eye av-eye-wink"
          fill="var(--av-hair, #17130e)"
          cx="308"
          cy="250"
          rx="11"
          ry="13"
        />
        {/* brows */}
        <path
          fill="var(--av-hair, #17130e)"
          d="M 176,231 C 180,216 196,207 214,207 C 228,207 237,213 238,221 C 238,227 232,230 225,228 C 210,224 194,227 184,234 C 179,236 175,235 176,231 Z"
        />
        <path
          fill="var(--av-hair, #17130e)"
          d="M 336,231 C 332,216 316,207 298,207 C 284,207 275,213 274,221 C 274,227 280,230 287,228 C 302,224 318,227 328,234 C 333,236 337,235 336,231 Z"
        />
        {/* mouth: closed warm smile on a skin patch, no teeth */}
        <path
          fill="var(--av-skin, #e9a868)"
          d="M 220,318 C 214,336 218,348 234,353 C 242,356 250,354 256,352 C 262,354 270,356 278,353 C 294,348 298,336 292,318 C 278,312 234,312 220,318 Z"
        />
        <path
          fill="var(--av-hair, #17130e)"
          d="M 230,326 C 242,333 270,333 282,326 C 274,342 238,342 230,326 Z"
        />
      </g>
    </svg>
  );
};

export default Avatar;
