import type { HTMLAttributes } from "react";

/** Light inner card used inside windows (no backdrop-filter for perf). */
export default function GlassPanel({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass-soft rounded-2xl ${className}`} {...props} />;
}
