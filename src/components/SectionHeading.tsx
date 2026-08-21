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
          className={`text-[13px] font-bold uppercase tracking-[0.16em] ${
            dark ? "text-primary-foreground/70" : "text-primary"
          }`}
        >
          {meta}
        </span>
        <motion.span
          aria-hidden="true"
          className={`h-1.5 rounded-full flex-1 max-w-[2.5rem] origin-left ${dark ? "bg-primary-foreground/30" : "bg-accent"}`}
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
        className={`font-display font-extrabold tracking-[-0.035em] leading-[1.02] text-balance text-[clamp(2rem,3.6vw,3rem)] ${
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
          className={`mt-6 text-[19px] leading-relaxed ${
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
