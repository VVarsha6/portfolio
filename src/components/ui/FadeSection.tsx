import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FadeSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -20]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale, y }}
      className="will-change-transform"
    >
      {children}
    </motion.section>
  );
}
