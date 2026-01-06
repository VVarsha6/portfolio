import { useEffect, useState } from "react";

type Props = {
  /** milliseconds the overlay stays before fading out */
  durationMs?: number;
};

export default function PageIntro({ durationMs = 650 }: Props) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setHide(true);
      return;
    }

    const t = window.setTimeout(() => setHide(true), durationMs);
    return () => window.clearTimeout(t);
  }, [durationMs]);

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed inset-0 z-[9999]",
        "bg-white dark:bg-zinc-950", // base
        "transition-opacity duration-500 ease-out",
        hide ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* Soft center glow sweep */}
      <div className="absolute inset-0">
        <div
          className={[
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "h-[480px] w-[480px] rounded-full",
            "bg-sky-400/20 dark:bg-sky-400/10 blur-3xl",
            "animate-[introGlow_900ms_ease-out_forwards]",
          ].join(" ")}
        />
      </div>

      {/* Tiny “scanline” shimmer (very subtle) */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
      <div className="absolute -top-24 left-0 h-24 w-full bg-gradient-to-b from-transparent via-black/10 to-transparent dark:via-white/10 animate-[introScan_850ms_ease-out_forwards]" />
      </div>

      {/* Blur the page behind during intro (feels premium) */}
      <div
        className={[
          "absolute inset-0 backdrop-blur-[10px]",
          "transition-all duration-500 ease-out",
          hide ? "backdrop-blur-0" : "backdrop-blur-[10px]",
        ].join(" ")}
      />
    </div>
  );
}
