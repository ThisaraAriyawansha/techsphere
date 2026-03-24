"use client";
import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  style,
  once = true,
}) {
  const variants = {
    up:    { hidden: { opacity: 0, y: 40 },        visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -30 },       visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -40 },       visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 },        visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.88 },  visible: { opacity: 1, scale: 1 } },
    fade:  { hidden: { opacity: 0 },               visible: { opacity: 1 } },
  };

  const chosen = variants[direction] || variants.up;

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={chosen}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, staggerDelay = 0.1, style, className }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, style, className }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
