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
        pb-16
      "
    >
      {/* Interactive background fills entire hero (including behind navbar)
          Make sure App.tsx DOES NOT add pt-24 to <main> */}
      <HeroGravityBG className="opacity-70" />

      {/* Content (pushed down so it clears navbar) */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-40 translate-y-20 text-center">
        {/* Name */}
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Varsha Viswanathan
        </h1>

        {/* Role */}
        <p className="mt-4 text-lg text-white/75 sm:text-xl">
          Software Engineer
        </p>

        {/* Tagline */}
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          I build highly efficient, functional systems — with a knack for AI.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col items-center pb-16">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Resume */}
            <NeonButton
              href="/src/assets/resume.pdf"
              download
              className="
                group bg-white/10 px-6 py-3
                text-sm font-semibold text-white/85
                hover:bg-white/12
              "
            >
              <Download className={iconClass} />
              <span className={textClass}>Download Resume</span>
            </NeonButton>

            {/* LinkedIn */}
            <NeonButton
              href="https://www.linkedin.com/in/vvarsha6/"
              target="_blank"
              rel="noreferrer"
              ariaLabel="LinkedIn"
              title="LinkedIn"
              className="
                group bg-white/5 px-4 py-3
                text-sm font-medium text-white/70
                hover:bg-white/10
              "
            >
              <Linkedin className={iconClass} />
              <span className={textClass}>LinkedIn</span>
            </NeonButton>

            {/* GitHub */}
            <NeonButton
              href="https://github.com/VVarsha6/"
              target="_blank"
              rel="noreferrer"
              ariaLabel="GitHub"
              title="GitHub"
              className="
                group bg-white/5 px-4 py-3
                text-sm font-medium text-white/70
                hover:bg-white/10
              "
            >
              <Github className={iconClass} />
              <span className={textClass}>GitHub</span>
            </NeonButton>

            {/* Email */}
            <NeonButton
              href="mailto:vvarsha1020@gmail.com"
              ariaLabel="Email"
              title="Email"
              className="
                group bg-white/5 px-4 py-3
                text-sm font-medium text-white/70
                hover:bg-white/10
              "
            >
              <Mail className={iconClass} />
              <span className={textClass}>Email</span>
            </NeonButton>
          </div>
        </div>

        {/* Scroll hint (below buttons, but still inside the centered container) */}
        <div className="mt-14">
          <div
            className="
              mx-auto h-0 w-0
              border-l-[6px] border-r-[6px] border-t-[8px]
              border-l-transparent border-r-transparent
              border-t-white/40
              animate-pulse
            "
          />
        </div>
      </div>
    </section>
  );
}
