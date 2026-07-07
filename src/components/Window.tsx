import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { EASE } from "../lib/motion";

interface WindowProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export default function Window({ title, onClose, children, maxWidth = "max-w-[900px]" }: WindowProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6 md:p-10">
      {/* overlay — desktop stays visible behind */}
      <motion.div
        className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} window`}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.96, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.97, y: 12, filter: "blur(6px)" }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`glass relative flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-[20px] rounded-b-none backdrop-blur-2xl outline-none sm:max-h-[82vh] sm:rounded-3xl ${maxWidth}`}
      >
        {/* title bar */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/8 px-4 sm:px-5">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close window"
              className="size-3 rounded-full bg-[#ff5f57]/80 transition-colors hover:bg-[#ff5f57]"
            />
            <span className="size-3 rounded-full bg-[#febc2e]/50" />
            <span className="size-3 rounded-full bg-[#28c840]/50" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.18em] text-ash">
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close window"
            className="-mr-2 flex size-11 items-center justify-center rounded-xl text-ash transition-colors hover:bg-white/6 hover:text-frost"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>

        {/* content */}
        <div className="os-scroll overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">{children}</div>
      </motion.div>
    </div>
  );
}
