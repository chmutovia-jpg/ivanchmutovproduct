import { motion, useReducedMotion } from "framer-motion";

/** Shared ambient scene: dark graphite, radial glows, faint grid, grain, vignette. */
export default function Background() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      {/* top diamond glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 620px at 50% -12%, rgba(123,231,255,0.055), transparent 65%)",
        }}
      />
      {/* slow ambient violet glow */}
      <motion.div
        className="absolute -right-48 -bottom-48 h-[620px] w-[620px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(139,124,255,0.05), transparent)",
        }}
        animate={prefersReducedMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="grain-layer absolute inset-0" />
      {/* vignette */}
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 240px rgba(0,0,0,0.55)" }} />
    </div>
  );
}
