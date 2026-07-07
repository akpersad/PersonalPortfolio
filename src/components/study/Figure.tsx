import Image from 'next/image';

interface FigureProps {
  /** 1-based figure number within the study. */
  n: number;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sizes?: string;
}

/**
 * Captioned figure with the direction's "fig. NN" annotation.
 * Screenshots sit on a surface tile with a hairline border so light
 * captures do not bleed into the dark theme's background.
 */
export default function Figure({
  n,
  src,
  alt,
  caption,
  width,
  height,
  sizes = '(min-width: 768px) 42rem, 100vw',
}: FigureProps) {
  return (
    <figure className="mt-12 max-w-2xl">
      <div className="overflow-hidden rounded-md border border-line bg-surface">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="annotation mt-3 flex items-baseline gap-3 before:h-px before:w-6 before:self-center before:bg-accent">
        fig. {String(n).padStart(2, '0')} &nbsp;{caption}
      </figcaption>
    </figure>
  );
}
