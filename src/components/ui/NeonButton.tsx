import type { PropsWithChildren } from "react";

type NeonButtonProps = PropsWithChildren<{
  href: string;
  download?: boolean;
  target?: "_blank";
  rel?: string;
  rounded?: "full" | "lg" | "xl" | "2xl";
  className?: string;
  ariaLabel?: string;
  title?: string;
}>;

const roundedMap = {
  full: "rounded-full before:rounded-full",
  lg: "rounded-lg before:rounded-lg",
  xl: "rounded-xl before:rounded-xl",
  "2xl": "rounded-2xl before:rounded-2xl",
};

export default function NeonButton({
  href,
  download,
  target,
  rel,
  rounded = "full",
  className = "",
  ariaLabel,
  title,
  children,
}: NeonButtonProps) {
  return (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      title={title}
      className={`
        group relative inline-flex items-center gap-2
        ${roundedMap[rounded]}

        ring-1 ring-white/10
        transform-gpu transition-all duration-200 ease-out
        hover:scale-[1.08] hover:-translate-y-[2px]

        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-sky-300/40

        /* OUTLINE (neon blue) */
        before:content-['']
        before:absolute before:inset-0
        before:opacity-0 before:transition-opacity before:duration-200
        hover:before:opacity-100
        before:pointer-events-none
        before:shadow-[0_0_0_1px_rgba(56,189,248,0.95)]

        /* SOFT BLEED OUTSIDE ONLY (small + even) */
        hover:before:shadow-[0_0_0_1px_rgba(56,189,248,0.95),_0_0_24px_6px_rgba(56,189,248,0.20)]

        ${className}
      `}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}
