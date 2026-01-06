import { Download, Github, Linkedin, Mail } from "lucide-react";
import NeonButton from "../components/ui/NeonButton";
import HeroGravityBG from "../components/ui/HeroGravityBG";

const iconClass =
  "h-4 w-4 transition-colors duration-200 group-hover:text-sky-200";
const textClass = "transition-colors duration-200 group-hover:text-white";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative
        w-full
        min-h-screen
        pt-0
        pb-0
      "
    >
      <HeroGravityBG className="opacity-80" />

      <div
        className="
          relative z-10 mx-auto max-w-5xl px-6
          min-h-screen
          flex flex-col
          pt-24 sm:pt-28
        "
      >
        {/* Content block — LOWERED */}
        <div className="flex-1 flex flex-col items-center justify-start text-center">
          <div className="mt-20 sm:mt-28">
            {/* ⬆️ THIS controls how low the content is */}

            <h1 className="text-4xl font-semibold tracking-tight text-black/95 dark:text-white sm:text-6xl">
              Varsha Viswanathan
            </h1>

            <p className="mt-4 text-lg text-black/70 dark:text-white/75 sm:text-xl">
              Software Engineer
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/60 dark:text-white/65 sm:text-lg">
              Building high performance, accessible, and thoughtfully designed web
              systems with a strong focus on usability and scale.
            </p>

            <div className="mt-6 flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <NeonButton
                  href="/src/assets/resume.pdf"
                  download
                  className="
                    group bg-black/[0.04] px-6 py-3
                    text-sm font-semibold text-black/80
                    hover:bg-black/[0.07]
                    dark:bg-white/10 dark:text-white/85 dark:hover:bg-white/12
                  "
                >
                  <Download className={iconClass} />
                  <span className={textClass}>Download Resume</span>
                </NeonButton>

                <NeonButton
                  href="https://www.linkedin.com/in/vvarsha6/"
                  target="_blank"
                  rel="noreferrer"
                  ariaLabel="LinkedIn"
                  title="LinkedIn"
                  className="
                    group bg-black/[0.03] px-4 py-3
                    text-sm font-medium text-black/70
                    hover:bg-black/[0.06]
                    dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10
                  "
                >
                  <Linkedin className={iconClass} />
                  <span className={textClass}>LinkedIn</span>
                </NeonButton>

                <NeonButton
                  href="https://github.com/VVarsha6/"
                  target="_blank"
                  rel="noreferrer"
                  ariaLabel="GitHub"
                  title="GitHub"
                  className="
                    group bg-black/[0.03] px-4 py-3
                    text-sm font-medium text-black/70
                    hover:bg-black/[0.06]
                    dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10
                  "
                >
                  <Github className={iconClass} />
                  <span className={textClass}>GitHub</span>
                </NeonButton>

                <NeonButton
                  href="mailto:vvarsha1020@gmail.com"
                  ariaLabel="Email"
                  title="Email"
                  className="
                    group bg-black/[0.03] px-4 py-3
                    text-sm font-medium text-black/70
                    hover:bg-black/[0.06]
                    dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10
                  "
                >
                  <Mail className={iconClass} />
                  <span className={textClass}>Email</span>
                </NeonButton>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint pinned to bottom */}
        <div className="pb-8 sm:pb-10">
          <div
            className="
              mx-auto h-0 w-0
              border-l-[7px] border-r-[7px] border-t-[9px]
              border-l-transparent border-r-transparent
              border-t-black/60
              dark:border-t-white/70
              animate-pulse
              drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]
            "
          />
        </div>
      </div>
    </section>
  );
}
