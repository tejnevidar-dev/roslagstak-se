import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  meta: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
  className?: string;
}

/** Editorial section heading: small-caps meta row, hairline rule, oversized display title. */
const SectionHeading = ({
  meta,
  index,
  title,
  intro,
  tone = "light",
  align = "left",
  id,
  className = "",
}: SectionHeadingProps) => {
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  return (
    <div
      className={`${align === "center" ? "mx-auto text-center max-w-3xl" : "max-w-3xl"} ${className}`}
    >
      <div
        className={`flex items-center gap-4 mb-6 ${align === "center" ? "justify-center" : ""}`}
      >
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.28em] ${
            dark ? "text-seafoam-light" : "text-seafoam"
          }`}
        >
          {meta}
        </span>
        <motion.span
          aria-hidden="true"
          className={`h-px flex-1 max-w-[6rem] origin-left ${dark ? "bg-primary-foreground/25" : "bg-foreground/15"}`}
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        {index && (
          <span
            className={`text-[10px] font-semibold tabular-nums tracking-[0.2em] ${
              dark ? "text-primary-foreground/40" : "text-muted-foreground/70"
            }`}
          >
            {index}
          </span>
        )}
      </div>

      <motion.h2
        id={id}
        className={`font-display uppercase tracking-tight leading-[0.98] text-balance text-[clamp(2rem,3.8vw,3.25rem)] ${
          dark ? "text-primary-foreground" : "text-foreground"
        }`}
        initial={reduce ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {intro && (
        <motion.p
          className={`mt-6 text-lg leading-relaxed ${
            dark ? "text-primary-foreground/70" : "text-muted-foreground"
          } ${align === "center" ? "mx-auto" : ""} max-w-2xl`}
          initial={reduce ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
