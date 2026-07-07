import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import { EASE } from "../lib/motion";

export default function SystemBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
      className="fixed inset-x-0 top-4 z-30 px-4 sm:top-5 sm:px-6"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="glass relative flex h-12 items-center justify-between rounded-[18px] px-4 backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-2.5">
            <Gem size={14} strokeWidth={1.8} className="text-diamond" />
            <span className="font-mono text-[12px] font-semibold tracking-[0.2em] text-frost">
              IVAN OS
            </span>
          </div>

          <span className="absolute left-1/2 hidden -translate-x-1/2 text-[12px] text-ash lg:block">
            Product Manager Profile
          </span>

          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.12em] text-ash">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-mint" />
              <span className="hidden sm:inline">STATUS:&nbsp;</span>AVAILABLE
            </span>
            <span className="hidden items-center gap-4 xl:flex">
              <span className="text-white/15">·</span>
              <span>DOMAIN: iGAMING</span>
            </span>
            <span className="hidden items-center gap-4 2xl:flex">
              <span className="text-white/15">·</span>
              <span>REMOTE / CYPRUS / SERBIA</span>
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
